from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request,status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from jwttoken import create_access_token
from oauth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from model.registration_model import Registration
from model.login_model import LOGIN
from model.change_password import ChangePassword
import bcrypt
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from fastapi.security import OAuth2PasswordBearer
import gridfs
import uuid
from typing import List
from fastapi import Response
from jose import JWTError, jwt
from fastapi import HTTPException
from datetime import datetime, timedelta
from model.visitor_model import Visitor



    
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"],
)
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["Smart-app"]
register = db["register"]
complaints_collection = db["complaints"]
service=db["service"]
visitors=db["visitors"]
invoice=db['invoice']
try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")

except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")
    
class User(BaseModel):
    full_name: str 
    flat_no: int 
    dob: str 
    email:str
    phone_number:str
    user_name: str
    
    
class Service(BaseModel):
    full_name: str
    last_name:str 
    dob: str 
    role:str
    phone:str
    aadhar:str

class Complaints(BaseModel):
    id: str = str(uuid.uuid4())  
    name: str
    date: str
    time: str
    position: str
    person: str
    description: str
    status: str = "Pending"
    
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



def get_flat_user(phone_number: str):
    return register.find_one({"phone_number": phone_number},{"_id":0})



def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

@app.post("/login")
async def login(login: OAuth2PasswordRequestForm=Depends()):
    normal_user = get_flat_user(login.username)
    if normal_user and verify_password(login.password, normal_user["password"]):
        access_token = create_access_token(data={"sub": normal_user["phone_number"]})
        return {"access_token": access_token, "token_type": "bearer","role":"user"}


    raise HTTPException(status_code=401, detail="Invalid phone number or password")

@app.post("/login/serviceprovider")
async def splogin(splogin: OAuth2PasswordRequestForm=Depends()):
    user =service.find_one({"phone": splogin.username},{"_id":0})
    if not user or not verify_password(splogin.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid phone number or password")
    
    access_token = create_access_token(data={"sub": user["phone"] })
    return {"access_token": access_token, "token_type": "bearer","role":user['role']}



@app.get("/api/appointments/{appointment_id}", response_model=Complaints)
async def get_appointment(appointment_id: str,current_user:User=Depends(get_current_user)):
    appointment =  complaints_collection.find_one({"id": appointment_id})
    if appointment:
        return Complaints(**appointment)
        
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.get("/getuser")
def read_root(current_user:User = Depends(get_current_user)):
    user_details =register.find_one({"phone_number": current_user.phone_number}, {"_id": 0, "password": 0})
    if user_details:
        return User(**user_details)
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/getservice")
def read_service(service_user:Service = Depends(get_current_user)):
    user_details =service.find_one({"phone": service_user.phone_number}, {"_id": 0, "password": 0})
    if user_details:
        return Service(**user_details)
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get("/api/appointments", response_model=List[Complaints])
async def get_appointments():
    appointments = complaints_collection.find()
    return [Complaints(**appointment) for appointment in appointments]

@app.get("/getmembercount/{userid}")
async def get_member_count(userid: str):
    try:
        existing_user = await register.find_one({"userid": userid})
        if existing_user:
            member_count = len(existing_user.get("processed_members", []))
            return {"count": member_count}
        else:
            return {"count": 1}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error:{str(e)}")

@app.get("/getvisitors",response_model=List[Visitor])
async def get_visitor(user:User=Depends(get_current_user)):
        user_details =register.find_one({"phone_number": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitors.find({"flatno": user_details['flat_no']},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")

@app.get("/allvisitors",response_model=List[Visitor])
async def all_visitor(user:User=Depends(get_current_user)):
        user_details =service.find_one({"phone": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitors.find({},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")
        
@app.post("/visitor/check-in")
async def check_in(visitor_details: dict):
        existing_visitor = visitors.find_one({"id": visitor_details["id"]},{"_id":0})
        if existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor already checked in")
        else:
            check_in_time = datetime.utcnow()
            visitor_data = {
                
                "check_in_time": (str)(check_in_time),
                **visitor_details,
            }
            visitors.insert_one(visitor_data)
            return {"message": "Visitor check-in recorded successfully"}
        
@app.post("/visitor/check-out")
def check_out(visitor_details: dict):

        existing_visitor = visitors.find_one({
            "id": visitor_details['id'],
            "check_out_time": {"$exists": False} 
        })

        if not existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor is not checked in or already checked out")
        else:
            check_out_time = datetime.utcnow()
            visitors.update_one(
                {"id": visitor_details['id'], "check_out_time": {"$exists": False}},
                {"$set": {"check_out_time": (str)(check_out_time)}}
            )

            return {"message": "Visitor checked out successfully"}
        
@app.get("/autologin")
async def autologin(current_user: str = Depends(get_current_user)):
    return {"message": "Auto-login successful", "user": current_user}

@app.post("/api/appointments/completed/{id}")
def getcomplaints(id :str):
    data=complaints_collection.update_one({"id":id},{"$set":{"status":"Completed"}})   
    invoicedata={
        "complait_id":id,
        "user_id":str(uuid.uuid4()),
        "serviceProvider_id":str(uuid.uuid4()),
        "cost":"2200",
        "year":"2023",
        
    }
   
    
    if data.modified_count == 1:
        result=invoice.insert_one(invoicedata)
        if result.inserted_id:
            return {"status":"ok"}
        raise HTTPException(status_code=400,detail="Error Inserting Data")
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")