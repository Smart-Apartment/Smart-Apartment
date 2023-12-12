
from fastapi import APIRouter, Depends, HTTPException
from model.user_model import User, ServiceUser  
from oauth import get_current_user  
import uuid
from model.visitor_model import Visitor
from db.mongodb import visitors,register,service,admin_db,session_model,budget,db,client,complaints_collection,invoice
from datetime import datetime,timedelta
from typing import Optional,List
from pydantic import BaseModel
from model.maintenance import Maintanence
import bcrypt
import gridfs
router=APIRouter()
class Complaints(BaseModel):
    id: str = str(uuid.uuid4())
    name: str
    date: str
    time: str
    phone_number:Optional[str]=None
    position: str
    description: str
    status: str = "Pending"
    severity:Optional[str]=None
    flat_no:Optional[str]=None
@router.post("/login")
def main(data:dict):
    print(data)
    dbData=admin_db.find_one({"admin":data["username"]})
    if(dbData["admin"]==data["username"] and bcrypt.checkpw(data["password"].encode("UTF-8"),dbData["password"])):
        return 200
    else:
        return 402

@router.post("/setToken")
def main(token:dict):
    session_model.insert_one({"token":token["token"],"expiry_time":datetime.utcnow() + timedelta(minutes=30)})
    return 200

@router.get("/getToken/{token}")
def main(token:str):
    data=session_model.find_one({"token":token})
    if data is None:
        return False,404
    else:
        return True,200
    
@router.get("/getBarData/{year}")
def main(year:str):
    data=budget.find({"year",year},{"_id":0})
    if(data):
        return data,200
    else:
        return "Data not Found",400
    
@router.post("/addProvider")
def main(provider: ServiceUser):
    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(provider.profile_image, filename=provider.aadhar_number)

    if (provider.password == provider.confirmpassword):

        hashed = bcrypt.hashpw(provider.password.encode("UTF-8"), bcrypt.gensalt())

        user_data = {
            "first_name": provider.first_name,
            "last_name": provider.last_name,
            "dob": provider.dob,
            "role": provider.role,
            "phone_number": provider.phone_number,
            "password": hashed,
            "aadhar_number": provider.aadhar_number,
            "image": image_id
        }
        db.service.insert_one(user_data)
        return (str(user_data), 200)


@router.get("/count")
def main():
    data=register.count_documents({})
    return data


@router.get("/users")
def main():
    data=list(register.find({},{"_id":0,"image":0,"password":0,'features':0}))
    return data 

@router.post("/user/remove/{user_name}")
def remove(user_name : str):
    if(register.delete_one({"user_name":user_name})):
        return ("deleted",200)
    else:
        return("no data found")
    
@router.get("/getComplaints", response_model=List[Complaints])
async def get_appointments():
    appointments = complaints_collection.find({},{"_id":0})
    print(appointments)
    return [Complaints(**appointment) for appointment in appointments]


    
@router.get("/getComplaintsCount")
async def main():
  with client.start_session() as session:
    pending=complaints_collection.count_documents({"status":"pending"},session=session)
    completed=complaints_collection.count_documents({"status":"completed"},session=session)
    reject=complaints_collection.count_documents({"status":"reject"},session=session)
  return [pending,completed,reject]

@router.post("/BudgetUpdate")
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
    
@router.get("/visitorsCount")
async def main():
    data=visitors.count_documents({"week":datetime.now().isocalendar()[1]-1})
    return data,200

@router.get("/visitorsChart")
async def main():
    days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","sunday"]
    daysData={}
    allData=[]
    week=datetime.now().isocalendar()[1]-1
    for i in days:
        daysData["day"]=i
        daysData["checkIn"]=visitors.count_documents({"week":week,"day":i})
        daysData["checkOut"]=visitors.count_documents({"week":week,"day":i,"check_out_time":{"$ne":"pending"}})
        allData.append(daysData)
        daysData={}
    return allData,200

@router.post("/removeServiceProvider/{aadhar_number}")
async def main(aadhar_number:str):
    service.delete_one({"aadhar_number":aadhar_number})
    return 200
    
@router.get("/getMaintainData/{year}")
async def main(year:str):
    data= budget.find_one({"year":year},{"_id":0})
    return data,200

@router.get("/getServiceProviders")
async def main():
    data=list(service.find({},{"_id":0,"password":0,"confirmPassword":0,"image":0}))
    return data,200

@router.get("/getBudgetData/{year}")
async def main(year:str):
    data=list(budget.find({},{"_id":0}))
    if(data):
        return data,200
    else:
        return 404

@router.get("/getInvoiceData/{year}")
async def main(year:str):
    data=list(invoice.find({"year":year},{"_id":0}))
    if(data):
        return data,200
    else:
        return 404

@router.get("/getVisitor")
async def main():
    data=visitors.find({},{"_id":0,})
    if(data):
        return list(data),200
    else:
        return 404

@router.get("/admin/userSearch/{query}")
async def search_items(query: str):
    regex_query = {"user_name": {"$regex": f".*{query}.*", "$options": "i"}}

    results = list(register.find(regex_query,{"_id":0,"password":0,"image":0}))
    
    return list(results),200

@router.get("/admin/serviceSearch/{query}")
async def search_items(query: str):
    regex_query = {"first_name": {"$regex": f".*{query}.*", "$options": "i"}}

    results = list(service.find(regex_query,{"_id":0,"password":0,"image":0}))
    
    return list(results),200