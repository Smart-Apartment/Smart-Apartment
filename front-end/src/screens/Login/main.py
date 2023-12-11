from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import uuid
from fastapi import Response
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Complaints(BaseModel):
    id: str = str(uuid.uuid4())  
    name: str
    date: str
    time: str
    position: str
    person: str
    description: str
    status: str = "Pending"

client = MongoClient("mongodb://127.0.0.1:27017")
mongodb = client["Smart-app"]
complaints_collection = mongodb["complaints"]


@app.post("/api/create-appointment", response_model=Complaints)
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

@app.get("/api/appointments/{flat_no}", response_model=Complaints)
async def get_appointment(flat_no: str):
    appointments =  complaints_collection.find({"flat_no": flat_no})
    if appointments:
        return [Complaints(**appointment) for appointment in appointments]
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.get("/api/appointments", response_model=List[Complaints])
async def get_appointments():
    appointments = complaints_collection.find()
    return [Complaints(**appointment) for appointment in appointments]

@app.post("/api/appointments/accept/{appointment_id}")
async def accept_appointment(appointment_id: str):
    result =  complaints_collection.update_one(
        {"id": appointment_id},
        {"$set": {"status": "Accepted"}},
    )
    if result.modified_count == 1:
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")

@app.post("/api/appointments/decline/{appointment_id}")
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