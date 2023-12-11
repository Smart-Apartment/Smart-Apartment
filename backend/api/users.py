from fastapi import APIRouter, Depends, HTTPException
from model.user_model import User, ServiceUser  
from oauth import get_current_user  
from pymongo import MongoClient
from datetime import datetime,timedelta
from db.mongodb import db,uploads,service,register,flat_users,visitors,family,complaints_collection
router = APIRouter()



@router.post('/upload-image')
async def upload_image(image:dict,current_user:User=Depends(get_current_user)):
    
    db.uploads.update_one({"phone_number":current_user.phone_number},
                           {"$set":{"profile_image":image['image']}},upsert=True)
    return ("Image Uploaded Successfully", 200)

@router.get("/getuser")
def read_root(current_user:User = Depends(get_current_user)):
    user_details =register.find_one({"phone_number": current_user.phone_number}, {"_id": 0, "password": 0})
    if user_details:
        image=db['uploads'].find_one({"phone_number":current_user.phone_number},{'profile_image':1})
        user_details['features'] = str(user_details['features'])
        if image:
            user_details['profile_image'] = image['profile_image']
        return User(**user_details)
    raise HTTPException(status_code=404, detail="User not found")

@router.get("/getservice",response_model=ServiceUser)
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
    
@router.post("/auto-check-in")
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

@router.post("/auto-check-out")
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

@router.get("/getmembercount")
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