from fastapi import FastAPI
from model.registration_model import Registration
from model.login_model import LOGIN
from model.change_password import ChangePassword
import bcrypt
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from fastapi.security import OAuth2PasswordBearer
from io import BytesIO
import gridfs
import uuid
from typing import List
from fastapi import Response
from jose import JWTError, jwt
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from datetime import datetime, timedelta
from model.visitor_model import Visitor
from pydantic import BaseModel
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://smartapartment-t27i.onrender.com/"], 
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"],
)
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["Smart-app"]
register = db["register"]
complaints_collection = db["complaints"]
service=db["service"]
if "visitor_checkins" not in db.list_collection_names():
    db.create_collection("visitor_checkins")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

class Token(BaseModel):
    access_token: str
    token_type: str
    
try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")
    db.visitor_checkins.create_index([("id", 1)], unique=True,name="id")

except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")

class User(BaseModel):
    full_name: str 
    flat_no: int 
    dob: str 
    email:str
    phone_number:str
    user_name: str
    access_token:str
class Service(BaseModel):
    full_name: str
    last_name:str 
    dob: str 
    role:str
    phone:str
    aadhar:str

@app.post("/user/register")
def home(user: Registration):

    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(user.image, filename=user.user_name)

    if (user.password == user.confirmpassword):

        hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

        user.password = hashed
        user_data = {
            "full_name": user.full_name,
            "flat_no": user.flat_no,
            "dob": user.dob,
            "aadhar_number": user.aadhar_number,
            "email": user.email,
            "password": user.password,
            "phone_number":user.phone_number,
            "user_name": user.user_name,
            "image": image_id
        }
        db.register.insert_one(user_data)
        return (str(user_data), 200)



def get_user(phone_number: str):
    return register.find_one({"phone_number": phone_number},{"_id":0})

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

@app.post("/login",response_model=User)
async def login(login: LOGIN):
    user = get_user(login.phone_number)
    if not user or not verify_password(login.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid phone number or password")
    
    access_token = create_access_token(data={"sub": user["user_name"] })
    user["access_token"]=access_token
    return user

@app.post("/login/serviceprovider",response_model=Service)
async def splogin(splogin: LOGIN):
    user =service.find_one({"phone": splogin.phone_number},{"_id":0})
    if not user or not verify_password(splogin.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid phone number or password")
    
    access_token = create_access_token(data={"sub": user["aadhar"] })
    user["access_token"]=access_token
    return user

@app.post("/api/change-password")
async def change_password(change_password_data: ChangePassword):
    user = register.find_one({"user_name": change_password_data.user_name}, {"_id": 0})

    if user and bcrypt.checkpw(
        change_password_data.current_password.encode("utf-8"), user["password"]
    ):
        hashed_new_password = bcrypt.hashpw(
            change_password_data.new_password.encode("utf-8"), bcrypt.gensalt()
        )

        register.update_one(
            {"user_name": change_password_data.user_name},
            {"$set": {"password": hashed_new_password}},
        )
        return {"message": "Password changed successfully"}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or current password")
    
@app.post("/visitor/check-in")
async def check_in(visitor_details: dict):
        existing_visitor = db.visitor_checkins.find_one({"id": visitor_details["id"]},{"_id":0})
        if existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor already checked in")
        else:
            check_in_time = datetime.utcnow()
            visitor_data = {
                "check_in_time": check_in_time,
                **visitor_details,
            }
            db.visitor_checkins.insert_one(visitor_data)
            return {"message": "Visitor check-in recorded successfully"}
        
@app.post("/visitor/check-out")
def check_out(visitor_details: Visitor):

        existing_visitor = db.visitor_checkins.find_one({
            "id": visitor_details.id,
            "check_out_time": {"$exists": False} 
        })

        if not existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor is not checked in or already checked out")
        else:
            check_out_time = datetime.utcnow()
            db.visitor_checkins.update_one(
                {"id": visitor_details.id, "check_out_time": {"$exists": False}},
                {"$set": {"check_out_time": check_out_time}}
            )

            return {"message": "Visitor checked out successfully"}





class Complaints(BaseModel):
    id: str = str(uuid.uuid4())  
    name: str
    date: str
    time: str
    position: str
    person: str
    description: str
    status: str = "Pending"




@app.post("/api/create-complaint", response_model=Complaints)
async def create_appointment(appointment: Complaints):
    appointment_dict = appointment.model_dump()
    result = complaints_collection.insert_one(appointment_dict)
    appointment.id = str(result.inserted_id)
    return appointment

@app.get("/api/appointments/{appointment_id}", response_model=Complaints)
async def get_appointment(appointment_id: str):
    appointment =  complaints_collection.find_one({"id": appointment_id})
    if appointment:
        return Complaints(**appointment)
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.get("/api/appointments", response_model=List[Complaints])
async def get_appointments():
    appointments = complaints_collection.find()
    return [Complaints(**appointment) for appointment in appointments]

@app.put("/api/appointments/accept/{id}")
async def accept_appointment(id: str):
    result =  complaints_collection.update_one(
        {"id": id},
        {"$set": {"status": "Accepted"}},
    )
    if result.modified_count == 1:
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.put("/api/appointments/decline/{appointment_id}")
async def decline_appointment(appointment_id: str):
    result =  complaints_collection.update_one(
        {"id": appointment_id},
        {"$set": {"status": "Declined"}},
    )
    if result.modified_count == 1:
        return {"status":"ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")


@app.post("/api/appointments/completed/{id}")
def getcomplaints(id :str):
    data=complaints_collection.update_one({"id":id},{"$set":{"status":"Completed"}})   
    
    if data.modified_count == 1:
        return {"status":"ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")