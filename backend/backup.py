from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request,status,Cookie
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from jwttoken import create_access_token,create_refresh_token
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
from NLP.train_model import preprocess_text as preprocess
from NLP.train_model import getpredict_priority as nlp
from model.maintenance import Maintanence 
from faceRecognition.facial import generate_feature
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"],
    
)
client = MongoClient("mongodb+srv://saravana1:qwertyuioplkjhgfdsa@cluster0.gdr7v46.mongodb.net/?retryWrites=true&w=majority")
db = client["Smart-app"]
register = db["register"]
complaints_collection = db["complaints"]
service=db["service"]
visitors=db["visitors"]
invoice=db['invoice']
budget=db['maintenance']
flat_users=db['flat_users']
try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")
    register.create_index([("phone_number",1)],unique=True,name="phone_number")

except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")
    
class User(BaseModel):
    full_name: str 
    flat_no: int 
    dob: str 
    email:str
    phone_number:str
    user_name: str
    profile_image:Optional[bytes]=None
    features:str
    
class ServiceUser(BaseModel):
    first_name: str
    last_name:str 
    full_name:Optional[str]=None
    dob: str 
    role:list
    phone_number:str
    aadhar_number:str
    profile_image:Optional[bytes]=None
    password:str
    confirmpassword:str
    
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
@app.post("/user/register")
def home(user: Registration):

    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(user.image, filename=user.user_name)

    if (user.password == user.confirmpassword):

        hashed = bcrypt.hashpw(user.password.encode("UTF-8"), bcrypt.gensalt())
        img_features=generate_feature(user.image)
        print(img_features)
        user.password = hashed
        # img_features="".join(img_features)
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

@app.post('/upload-image')
async def upload_image(image:dict,current_user:User=Depends(get_current_user)):
    
    db.uploads.update_one({"phone_number":current_user.phone_number},
                           {"$set":{"profile_image":image['image']}},upsert=True)
    return ("Image Uploaded Successfully", 200)
    
        

def get_flat_user(phone_number: str):
    return register.find_one({"phone_number": phone_number},{"_id":0})



def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)



@app.post("/login")
async def login(login: OAuth2PasswordRequestForm = Depends()):
    normal_user = get_flat_user(login.username)
    if normal_user and verify_password(login.password, normal_user["password"]):
        access_token = create_access_token(data={"sub": normal_user["phone_number"]})
        refresh_token = create_refresh_token(data={"sub": normal_user["phone_number"]})
        print(refresh_token)
        response = JSONResponse(content={"access_token": access_token, "token_type": "bearer", "role": "user"})
        response.set_cookie("refresh_token", refresh_token, httponly=True, expires=2 * 24 * 60 * 60,samesite='none',secure=True)
        # response.set_cookie('token',access_token,httponly=True)
        return response

    raise HTTPException(status_code=401, detail="Invalid phone number or password")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
@app.post("/refresh")
async def refresh_token(req:Request):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        refresh_token=req.cookies.get('refresh_token')
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        access_token = create_access_token(data={"sub": username})
        return {"access_token": access_token, "token_type": "bearer", "role": "user"}
    except jwt.ExpiredSignatureError:
        raise credentials_exception
    except JWTError:
        raise credentials_exception
@app.post("/api/change-password")
async def change_password(change_password_data: ChangePassword,current_user:User=Depends(get_current_user)):
    user = service.find_one({"phone_number": current_user.phone_number}, {"_id": 0})

    if user and bcrypt.checkpw(
        change_password_data.current_password.encode("utf-8"), user["password"]
    ):
        hashed_new_password = bcrypt.hashpw(
            change_password_data.new_password.encode("utf-8"), bcrypt.gensalt()
        )

        service.update_one(
            {"phone_number": current_user.phone_number},
            {"$set": {"password": hashed_new_password}},
        )
        return {"message": "Password changed successfully"}
    else:
        raise HTTPException(status_code=401, detail="Current Password is Wrong")
@app.post("/login/serviceprovider")
async def splogin(splogin: OAuth2PasswordRequestForm=Depends()):
    user =service.find_one({"phone_number": splogin.username},{"_id":0})
    if not user or not verify_password(splogin.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid phone number or password")
    
    access_token = create_access_token(data={"sub": user["phone_number"] })
    return {"access_token": access_token, "token_type": "bearer","role":user['role']}

@app.post("/api/create-complaint")
async def create_appointment(appointment: Complaints):
    appointment_dict = appointment.model_dump()
    appointment_dict["severity"]=nlp(appointment.description)
    result = complaints_collection.insert_one(appointment_dict)
    
    print(appointment_dict)

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
        image=db['uploads'].find_one({"phone_number":current_user.phone_number},{'profile_image':1})
        user_details['features'] = str(user_details['features'])
        if image:
            user_details['profile_image'] = image['profile_image']
        return User(**user_details)
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/getservice",response_model=ServiceUser)
def read_service(current_user:User=Depends(get_current_user)):
    user_details =service.find_one({"phone_number": current_user.phone_number}, {"_id": 0})
    if user_details:
        user_details['full_name']=user_details["first_name"]+" "+user_details['last_name']
        image=db['uploads'].find_one({"phone_number":current_user.phone_number},{'profile_image':1})
        if image:
            user_details['profile_image'] = image['profile_image']
        
        return ServiceUser(**user_details)
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get("/api/appointments")
async def get_appointments(user: ServiceUser = Depends(get_current_user)):
    role = service.find_one({"phone_number": user.phone_number}, {'_id': 0, 'role': 1})

    if role is None:
        raise HTTPException(status_code=404, detail="Role not found for the user")

    role_values = [item for sublist in role.values() for item in sublist]
    data = complaints_collection.find({"position": {"$in": role_values}}, {'_id': 0, 'password': 0, 'image': 0})
    
    return [dict(appointment) for appointment in data]

@app.get("/user/appointments")
async def get_appointments(current_user: User = Depends(get_current_user)):
    user = register.find_one({"phone_number": current_user.phone_number}, {'_id': 0,'password':0})
    complaints = complaints_collection.find({'phone_number':current_user.phone_number},{'_id':0})
    return [Complaints(**complaint) for complaint in complaints]
@app.get("/getmembercount")
async def get_member_count(current_user: User=Depends(get_current_user)):
    try:
        flat_no=register.find_one({"phone_number":current_user.phone_number},{'_id':0,'flat_no':1})
        print(flat_no)
        visitor_count=visitors.count_documents({"flatno":flat_no['flat_no']})
        print(visitor_count)
        last_week_date = datetime.utcnow() - timedelta(days=7)
        query = {
            "flatno":flat_no['flat_no'],
            "check_in_time": {
                "$gte": last_week_date.strftime("%Y-%m-%d %H:%M:%S")
            }
        }
        visitors_last_week = list(visitors.find(query, {"_id": 0}))
        daywise_counts = {}

        for visit in visitors_last_week:
            day = visit.get("day")
            print(day)
            if day:
                daywise_counts[day] = daywise_counts.get(str(day), 0) + 1

        existing_user =  family.find_one({"phone_number": current_user.phone_number})
        complaints=complaints_collection.count_documents({"phone_number":current_user.phone_number})
        if existing_user:
            member_count = len(existing_user.get("family_members", []))
            return {"member": member_count+1,"flat_no":flat_no['flat_no'],"complaints":complaints,"last_week":daywise_counts,"visitor_count":visitor_count}
        else:
            return {"member": 1,"flat_no":flat_no['flat_no'],"complaints":complaints,"last_week":daywise_counts,"visitor_count":visitor_count}
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
        user_details =service.find_one({"phone_number": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitors.find({},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")
        
@app.post("/user/auto-check-in")
async def check_in(data: dict,current_user:User=Depends(get_current_user)):
        print(data)
        user=register.find_one({"phone_number":data['phoneNumber']},{"password":0,"_id":0})
        if user:
            if data['features']==str(user['features']):
                result= flat_users.update_one({'phone_number':data['phoneNumber']},{"$set":{
                                        'flat_no':user['flat_no'],
                                        'full_name':user['full_name'],
                                        'email':user['email'],
                                       'last_check_in':datetime.utcnow(),
                                       }},upsert=True)
                if result.modified_count==1:
                    return {"message": "Flat User Checked-in successfully"}
            else: 
                raise HTTPException(status_code=400, detail="Features Mismatch")

        else:
            raise HTTPException(status_code=400, detail="User Not Found")

@app.post("/user/auto-check-out")
async def check_in(data: dict,current_user:User=Depends(get_current_user)):
        print(data)
        user=register.find_one({"phone_number":data['phoneNumber']},{"password":0,"_id":0})
        if user:
            if data['features']==str(user['features']):
                result= flat_users.update_one({'phone_number':data['phoneNumber']},{"$set":{
                                       'last_check_out':datetime.utcnow(),
                                       }})
                if result.modified_count==1:
                    return {"message": "Flat User Checked-Out successfully"}
            else: 
                raise HTTPException(status_code=400, detail="Features Mismatch")

        else:
            raise HTTPException(status_code=400, detail="User Not Found")
            
@app.post("/visitor/check-in")
async def check_in(visitor_details: dict,current_user:User=Depends(get_current_user)):
        security=service.find_one({"phone_number":current_user.phone_number},{"password":0,"_id":0})
        existing_visitor = visitors.find_one({"id": visitor_details["id"]},{"_id":0})
        print(security['first_name'])
        if existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor already checked in")
        else:
            day = [datetime.now().strftime("%A")]
            week = [datetime.now().isocalendar()[1]]
            check_in_time = datetime.utcnow()
            visitor_data = {
                "day":day,
                "week":week,
                "check_in_time": (str)(check_in_time),
                "check_in_approver":f"{security.get('first_name', '')} {security.get('last_name', '')}",
                **visitor_details,
            }
            visitors.insert_one(visitor_data)
            return {"message": "Visitor check-in recorded successfully"}
        
@app.post("/visitor/check-out")
def check_out(visitor_details: dict,current_user:User=Depends(get_current_user)):
        existing_visitor = visitors.find_one({
            "id": visitor_details['id'],
            "check_out_time": {"$eq": "Pending"} 
        })
        security=service.find_one({"phone_number":current_user.phone_number},{"first_name":1,"last_name":1,"_id":0})
        if not existing_visitor:
            raise HTTPException(status_code=400, detail="Visitor is not checked in or already checked out")
        else:
            check_out_time = str(datetime.utcnow())
            visitors.update_one(
                {"id": visitor_details['id'], "check_out_time": {"$eq": "Pending"}},
                {"$set": {"check_out_time": (str)(check_out_time),"check_out_approver":security['first_name']+" "+security['last_name']}}
            )

            return {"message": "Visitor checked out successfully"}
        

@app.get("/last_week")
def last_week(user:User=Depends(get_current_user)):
    
        last_week_date = datetime.utcnow() - timedelta(days=7)
        query = {
            "check_in_time": {
                "$gte": last_week_date.strftime("%Y-%m-%d %H:%M:%S")
            }
        }
        visitors_last_week = list(visitors.find(query, {"_id": 0}))
        daywise_counts = {}

        for visit in visitors_last_week:
            day = visit.get("day")
            print(day)
            if day:
                daywise_counts[day] = daywise_counts.get(day, 0) + 1

        return {"last_week": daywise_counts}

    


@app.post("/api/appointments/completed")
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
    
@app.put("/api/appointments/accept/{id}")
async def accept_appointment(id: str,user:User=Depends(get_current_user)):
    provider=service.find_one({'phone_number':user.phone_number},{'_id':0})
    result =  complaints_collection.update_one(
        {"id": id},
        {"$set": {"status": "Accepted",
                  "provider_name":provider['full_name'],
                  "provider_phone":provider['phone_number']}},
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
class Member(BaseModel):
    id:Optional[str]=None
    name: str
    age: str
    gender : str
    
class RequestData(BaseModel):
    member: List[Member]

@app.post("/api/appointments/completed/{id}")
def getcomplaints(id :str):
    data=complaints_collection.update_one({"id":id},{"$set":{"status":"Completed"}})   
    
    if data.modified_count == 1:
        return {"status":"ok"}
    else:
        raise HTTPException(status_code=404, detail="Appointment not found")
family=db['family_members']
@app.post("/addfamily")
async def add_family(data: RequestData,current_user: User = Depends(get_current_user)):
    try:
        existing_user = family.find_one({"phone_number": current_user.phone_number},{'_id':0})
        if existing_user:

            newData = existing_user["family_members"]
            processed_members = [{"id":str(uuid.uuid4()),"name": m.name, "age": m.age, "gender": m.gender } for m in data.member]
            newData.extend(processed_members)
            result =  family.update_one(
                {"phone_number": current_user.phone_number},
                {"$set": {"family_members" : processed_members} },
                upsert = True
            )
            print(result)
            if result.modified_count > 0:
                stored_data =  family.find_one({"phone_number": current_user.phone_number})
                stored_data = {**stored_data, "_id": str(stored_data["_id"])}
            else:
                raise HTTPException(status_code=500, detail="Insert operation failed")
        else:
            result =  family.insert_one({
                "phone_number": current_user.phone_number,
                "family_members": [{"id":str(uuid.uuid4()),"name": m.name, "age": m.age, "gender": m.gender} for m in data.member]
            })
            if result.inserted_id:
                stored_data =  family.find_one({"_id": result.inserted_id})
                stored_data = {**stored_data, "_id": str(stored_data["_id"])}
            else:
                raise HTTPException(status_code=500, detail="Insert operation failed")
       
        return stored_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@app.get("/getfamily")
async def get_members(current_user: User = Depends(get_current_user)):
    try:
        result =  family.find_one({"phone_number": current_user.phone_number},{'_id':0})
        if result:
            return result
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@app.post("/removemember")
async def remove_member(data: RequestData,current_user: User = Depends(get_current_user)):
    try:
        existing_user =  family.find_one({"phone_number": current_user.phone_number})
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        result =  family.update_one(
            {"phone_number": current_user.phone_number},
            {"$pull": {"family_members": {"id": data.member[0].id}}}
        )

        if result.modified_count > 0:
            stored_data =  family.find_one({"phone_number": current_user.phone_number})
            stored_data = {**stored_data, "_id": str(stored_data["_id"])}
            return stored_data
        else:
            raise HTTPException(status_code=400, detail="Member not found in the list")
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error") 
#admin
admin_db=db['admin']
session_model=db['session']

    
@app.post("/admin/addProvider")
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





    
@app.get("/admin/getComplaintsCount")
async def main():
  with client.start_session() as session:
    pending=complaints_collection.count_documents({"status":"pending"},session=session)
    completed=complaints_collection.count_documents({"status":"completed"},session=session)
    reject=complaints_collection.count_documents({"status":"reject"},session=session)
  return [pending,completed,reject]


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
    
@app.get("/admin/getComplaints", response_model=List[Complaints])
async def get_appointments():
    appointments = complaints_collection.find({})
    return [Complaints(**appointment) for appointment in appointments]

    
@app.get("/admin/getComplaintsCount")
async def main():
  with client.start_session() as session:
    pending=complaints_collection.count_documents({"status":"pending"},session=session)
    completed=complaints_collection.count_documents({"status":"completed"},session=session)
    reject=complaints_collection.count_documents({"status":"reject"},session=session)
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
    data=visitors.count_documents({"week":datetime.now().isocalendar()[1]-1})
    return data,200

@app.get("/admin/visitorsChart/")
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