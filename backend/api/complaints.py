from fastapi import APIRouter, Depends, HTTPException
from model.user_model import User, ServiceUser  
from oauth import get_current_user  
from pymongo import MongoClient
import uuid
from pydantic import BaseModel
from typing import Optional
from db.mongodb import complaints_collection,service,register,invoice
from typing import List
from model.registration_model import Registration
import bcrypt
from fastapi.security import OAuth2PasswordRequestForm
from jwttoken import create_access_token,create_refresh_token
from fastapi.responses import JSONResponse
from NLP.train_model import getpredict_priority as nlp

router = APIRouter()
class Complaints(BaseModel):
    id: str = str(uuid.uuid4())
    name: str
    date: str
    time: str
    phone_number:Optional[str]=None
    position: str
    description: str
    provider_name:Optional[str]=None
    provider_phone:Optional[str]=None
    status: str = "Pending"
    severity:Optional[str]=None
    flat_no:Optional[str]=None
@router.post("/create-complaint")
async def create_appointment(appointment: Complaints):
    appointment_dict = appointment.model_dump()
    appointment_dict["severity"]=nlp(appointment.description)
    result = complaints_collection.insert_one(appointment_dict)
    
    print(appointment_dict)

@router.get("/appointments/{appointment_id}", response_model=Complaints)
async def get_appointment(appointment_id: str,current_user:User=Depends(get_current_user)):
    appointment =  complaints_collection.find_one({"id": appointment_id})
    if appointment:
        return Complaints(**appointment)
        
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@router.get("/appointments")
async def get_appointments(user: ServiceUser = Depends(get_current_user)):
    role = service.find_one({"phone_number": user.phone_number}, {'_id': 0, 'role': 1})

    if role is None:
        raise HTTPException(status_code=404, detail="Role not found for the user")

    role_values = [item for sublist in role.values() for item in sublist]
    data = complaints_collection.find({"position": {"$in": role_values}}, {'_id': 0, 'password': 0, 'image': 0})
    
    return [dict(appointment) for appointment in data]

@router.get("/user/appointments")
async def get_appointments(current_user: User = Depends(get_current_user)):
    user = register.find_one({"phone_number": current_user.phone_number}, {'_id': 0,'password':0})
    complaints = complaints_collection.find({'phone_number':current_user.phone_number},{'_id':0})
    return [Complaints(**complaint) for complaint in complaints]

            


@router.post("/appointments/completed")
def completecomplaints(data:dict):
    data1=complaints_collection.update_one({"id":data['id']},{"$set":{"status":"Completed"}})   
    invoicedata={
        "complaint_id":data['id'],
        "phone_number":data['phone_number'],
        
        "serviceProvider_id":data['provider_phone'],
        "cost":"2200",
        "year":"2023",
        
    }
   
    
    if data1.modified_count == 1:
        result=invoice.insert_one(invoicedata)
        if result.inserted_id:
            return {"status":"ok"}
        raise HTTPException(status_code=400,detail="Error Inserting Data")
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    
@router.put("/appointments/accept/{id}")
async def accept_appointment(id: str,user:User=Depends(get_current_user)):
    provider=service.find_one({'phone_number':user.phone_number},{'_id':0})
    result =  complaints_collection.update_one(
        {"id": id},
        {"$set": {"status": "Accepted",
                  "provider_name":provider['first_name']+provider['last_name'],
                  "provider_phone":provider['phone_number']}},
    )
    if result.modified_count == 1:
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@router.put("/appointments/decline/{appointment_id}")
async def decline_appointment(appointment_id: str):
    result =  complaints_collection.update_one(
        {"id": appointment_id},
        {"$set": {"status": "Declined"}},
    )
    if result.modified_count == 1:
        return {"status":"ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")
class Member(BaseModel):
    id:Optional[str]=None
    name: str
    age: str
    gender : str
    
class RequestData(BaseModel):
    member: List[Member]

@router.post("/appointments/completed/{id}")
def getcomplaints(id :str):
    data=complaints_collection.update_one({"id":id},{"$set":{"status":"Completed"}})   
    
    if data.modified_count == 1:
        return {"status":"ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
