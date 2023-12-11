from fastapi import FastAPI
from model.registration_model import Registration
from model.login_model import LOGIN
from fastapi import FastAPI, HTTPException, Depends, Request,status,Query
from fastapi.security import OAuth2PasswordRequestForm
from model.change_password import ChangePassword
import bcrypt
from model.complaints import COMPLAINTS
from model.maintenance import Maintanence
from pymongo import MongoClient
from model.service_provider import Service
from pymongo.errors import DuplicateKeyError
from fastapi.security import OAuth2PasswordBearer
from io import BytesIO
import gridfs
import uuid
from typing import List
from fastapi import Response
from datetime import datetime
from oauth import get_current_user
from jose import JWTError, jwt
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from datetime import datetime, timedelta
from model.visitor_model import Visitor
from pydantic import BaseModel
from NLP.preprocess_text import preprocess_text as nlp
from faceRecognition.facial import genarate_feature

############################## CORS #######################################

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

########################### DATABASE ##########################################
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["Smart-app"]
register = db["register"]
service=db["service"]
complaints=db["complaints"]
visitor=db["visitor"]
invoice=db["invoice"]
budget=db["maintenance"]
invoice=db["invoice"]
session_model=db["session"]
admin_db=db["admin"]


try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")
except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")
    
try:
    budget.create_index([("year", 1)], unique=True, name="year")
except DuplicateKeyError as e:
    print(f"Error creating unique index on year: {e}")

try:
    service.create_index([("aadhar_number", 1)], unique=True, name="aadhar_number")
except DuplicateKeyError as e:
    print(f"Error creating unique index on aadhar: {e}")
    
try:
    session_model.create_index([("token", 1)], unique=True, name="token")
except DuplicateKeyError as e:
    print(f"Error creating unique index on token: {e}")
    
try:
    session_model.create_index("expiry_time", expireAfterSeconds=0)
except DuplicateKeyError as e:
    print(f"Error creating unique index on token: {e}")
    

############################ AUTHENTICATION ######################################

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


################################ USERS ###########################################

@app.get("/autologin")
async def autologin(current_user: str = Depends(get_current_user)):
    return {"message": "Auto-login successful", "user": current_user}

@app.post("/user/register")
def home(user: Registration):

    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(user.image, filename=user.user_name)

    if (user.password == user.confirmpassword):

        hashed = bcrypt.hashpw(user.password.encode("UTF-8"), bcrypt.gensalt())
        img_features=list(genarate_feature(user.image))
        user.password = hashed
        img_features="".join(img_features)
        user_data = {
            "full_name": user.full_name,
            "flat_no": user.flat_no,
            "dob": user.dob,
            "aadhar_number": user.aadhar_number,
            "email": user.email,
            "password": user.password,
            "phone_number":user.phone_number,
            "user_name": user.user_name,
            "image": image_id,
            "features":img_features
        }
        db.register.insert_one(user_data)
        return (str(user_data), 200)

@app.post("/user/login/")
async def login(login: LOGIN):
    user = register.find_one({"flat_no": login.flat_no}, {"_id": 0})
    if (bcrypt.checkpw(login.password.encode("utf-8"), user["password"])):
        return user
    else:
        return False , 400

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
    
@app.get("/getuser")
def read_root(current_user:register = Depends(get_current_user)):
    user_details =register.find_one({"phone_number": current_user.phone_number}, {"_id": 0, "password": 0})
    if user_details:
        return register(**user_details)
    raise HTTPException(status_code=404, detail="User not found")

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


################################## SERVICE PROVIDER ##############################

@app.get("/getservice")
def read_service(service_user:Service = Depends(get_current_user)):
    user_details =service.find_one({"phone": service_user.phone_number}, {"_id": 0, "password": 0})
    image = gridfs.GridFS(db, collection="image")
    profile_image=image.get(user_details["image"])
    if user_details:
        user_details=list(user_details)
        user_details.append(profile_image)
        return user_details
    else:
        raise HTTPException(status_code=404, detail="User not found")

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


############################### VISITORS ######################################

@app.get("/allvisitors",response_model=List[Visitor])
async def all_visitor(user:register=Depends(get_current_user)):
        user_details =service.find_one({"phone": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitor.find({},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")

@app.get("/getvisitors",response_model=List[Visitor])
async def get_visitor(user:register=Depends(get_current_user)):
        user_details =register.find_one({"phone_number": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitor.find({"flatno": user_details['flat_no']},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")

@app.post("/visitor/check-in")
async def check_in(visitor_details: dict):
        existing_visitor = visitor.find_one({"id": visitor_details["id"]},{"_id":0})
        if existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor already checked in")
        else:
            check_in_time = datetime.utcnow()
            visitor_data = {
                "day":{datetime.now().strftime("%A")},
                "week":{datetime.now().isocalendar()[1]},
                "check_in_time": (str)(check_in_time),
                **visitor_details,
            }
            visitor.insert_one(visitor_data)
            return {"message": "Visitor check-in recorded successfully"}
        
@app.post("/visitor/check-out")
def check_out(visitor_details: dict):

        existing_visitor = visitor.find_one({
            "id": visitor_details['id'],
            "check_out_time": {"$exists": False} 
        })

        if not existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor is not checked in or already checked out")
        else:
            check_out_time = datetime.utcnow()
            visitor.update_one(
                {"id": visitor_details['id'], "check_out_time": {"$exists": False}},
                {"$set": {"check_out_time": (str)(check_out_time)}}
            )

            return {"message": "Visitor checked out successfully"}

################################# COMPLAINTS ##################################

@app.post("/api/create-appointment", response_model=COMPLAINTS)
async def create_appointment(appointment: COMPLAINTS):
    appointment_dict = appointment.model_dump()
    appointment_dict["severity"]=nlp(appointment["description"])
    result = complaints.insert_one(appointment_dict)
    appointment.id = str(result.inserted_id)
    return appointment

@app.get("/api/appointments/{appointment_id}", response_model=COMPLAINTS)
async def get_appointment(appointment_id: str,current_user:register=Depends(get_current_user)):
    appointment =  complaints.find_one({"id": appointment_id})
    if appointment:
        return COMPLAINTS(**appointment)
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.get("/api/appointments", response_model=List[COMPLAINTS])
async def get_appointments():
    appointments = complaints.find()
    return [COMPLAINTS(**appointment) for appointment in appointments]

@app.put("/api/appointments/accept/{id}")
async def accept_appointment(id: str):
    result =  complaints.update_one(
        {"id": id},
        {"$set": {"status": "Accepted"}},
    )
    if result.modified_count == 1:
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.put("/api/appointments/decline/{appointment_id}")
async def decline_appointment(appointment_id: str):
    result =  complaints.update_one(
        {"id": appointment_id},
        {"$set": {"status": "Declined"}},
    )
    if result.modified_count == 1:
        return {"status":"ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")



@app.post("/api/appointments/completed/{id}")
def getcomplaints(id :str):
    data=complaints.update_one({"id":id},{"$set":{"status":"Completed"}})   
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
    
###################################### ADMIN ###################################

@app.post("/admin/login")
def main(data:dict):
    print(data)
    dbData=admin_db.find_one({"admin":data["username"]})
    if(dbData["admin"]==data["username"] and bcrypt.checkpw(data["password"].encode("UTF-8"),dbData["password"])):
        return 200
    else:
        return 402

@app.post("/admin/setToken")
def main(token:dict):
    session_model.insert_one({"token":token["token"],"expiry_time":datetime.utcnow() + timedelta(minutes=30)})
    return 200

@app.get("/admin/getToken/{token}")
def main(token:str):
    data=session_model.find_one({"token":token})
    if data is None:
        return False,404
    else:
        return True,200
    
@app.get("/admin/getBarData/{year}")
def main(year:str):
    data=budget.find({"year",year},{"_id":0})
    if(data):
        return data,200
    else:
        return "Data not Found",400
    
@app.post("/admin/addProvider")
def main(provider: Service):
    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(provider.image, filename=provider.aadhar_number)

    if (provider.password == provider.confirmpassword):

        hashed = bcrypt.hashpw(provider.password.encode("UTF-8"), bcrypt.gensalt())

        user_data = {
            "first_name": provider.first_name,
            "last_name": provider.last_name,
            "dob": provider.dob,
            "role": provider.role,
            "phone": provider.phone,
            "password": hashed,
            "confirmpassword":provider.confirmpassword,
            "aadhar_number": provider.aadhar_number,
            "image": image_id
        }
        db.service.insert_one(user_data)
        return (str(user_data), 200)


@app.get("/admin/count")
def main():
    data=register.count_documents({})
    return data


@app.get("/admin/users")
def main():
    data=list(register.find({},{"_id":0,"image":0,"password":0}))
    return data 

@app.get("/admin/userSearch/{query}")
async def search_items(query: str):
    regex_query = {"user_name": {"$regex": f".*{query}.*", "$options": "i"}}

    results = list(register.find(regex_query,{"_id":0,"password":0,"image":0}))
    
    return list(results),200

@app.get("/admin/serviceSearch/{query}")
async def search_items(query: str):
    regex_query = {"first_name": {"$regex": f".*{query}.*", "$options": "i"}}

    results = list(service.find(regex_query,{"_id":0,"password":0,"image":0}))
    
    return list(results),200

@app.post("/user/remove/{user_name}")
def remove(user_name : str):
    if(register.delete_one({"user_name":user_name})):
        return ("deleted",200)
    else:
        return("no data found")
    
@app.get("/admin/getComplaints", response_model=List[COMPLAINTS])
async def get_appointments():
    appointments = complaints.find({})
    return [COMPLAINTS(**appointment) for appointment in appointments]

@app.get("/login/serviceprovider")
async def main(phone:str,password:str):
    data=service.find_one({"phone":phone},{"_id":0})
    
    if(bcrypt.checkpw(password.encode("UTF-8"),data["password"])):
        return True,200
    else:
        return False,300
    
@app.get("/admin/getComplaintsCount")
async def main():
  with client.start_session() as session:
    pending=complaints.count_documents({"status":"pending"},session=session)
    completed=complaints.count_documents({"status":"completed"},session=session)
    reject=complaints.count_documents({"status":"reject"},session=session)
  return [pending,completed,reject]

@app.post("/admin/BudgetUpdate")
async def main(data:Maintanence):
    budgetData={
      "psqftQuaterly":data.psqftQuaterly,
      "psqftHalf":data.psqftHalf,
      "psqftYearly":data.psqftYearly,
      "sqft":data.sqft,
      "totalCostPerSquareFeet":data.totalCostPerSquareFeet ,
      "year":data.year,
      "quaterly":data.quaterly,
      "half":data.half ,
      "yearly":data.yearly,
      "otherExpenses":data.otherExpenses,   
    }
    budget.insert_one(budgetData)
    
@app.get("/admin/visitorsCount/")
async def main():
    data=visitor.count_documents({"week":datetime.now().isocalendar()[1]-1})
    return data,200

@app.get("/admin/visitorsChart/")
async def main():
    days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","sunday"]
    daysData={}
    allData=[]
    week=datetime.now().isocalendar()[1]-1
    for i in days:
        daysData["day"]=i
        daysData["checkIn"]=visitor.count_documents({"week":week,"day":i})
        daysData["checkOut"]=visitor.count_documents({"week":week,"day":i,"check_out_time":{"$ne":"pending"}})
        allData.append(daysData)
        daysData={}
    return allData,200

@app.post("/admin/removeServiceProvider/{aadhar_number}")
async def main(aadhar_number:str):
    service.delete_one({"aadhar_number":aadhar_number})
    return 200
    
@app.get("/admin/getMaintainData/{year}")
async def main(year:str):
    data= budget.find_one({"year":year},{"_id":0})
    return data,200

@app.get("/admin/getServiceProviders/")
async def main():
    data=list(service.find({},{"_id":0,"password":0,"confirmPassword":0,"image":0}))
    return data,200

@app.get("/admin/getBudgetData/{year}")
async def main(year:str):
    data=list(budget.find({"year":year},{"_id":0}))
    if(data):
        return data,200
    else:
        return 404

@app.get("/admin/getInvoiceData/{year}")
async def main(year:str):
    data=list(invoice.find({"year":year},{"_id":0}))
    if(data):
        return data,200
    else:
        return 404