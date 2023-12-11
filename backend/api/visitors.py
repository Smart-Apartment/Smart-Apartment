
from fastapi import APIRouter, Depends, HTTPException
from model.user_model import User, ServiceUser  
from oauth import get_current_user  
import uuid
from model.visitor_model import Visitor
from db.mongodb import visitors,register,service
from datetime import datetime,timedelta
from typing import Optional,List
from pydantic import BaseModel

router=APIRouter()


@router.get("/getvisitors",response_model=List[Visitor])
async def get_visitor(user:User=Depends(get_current_user)):
        user_details =register.find_one({"phone_number": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitors.find({"flatno": user_details['flat_no']},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")

@router.get("/allvisitors",response_model=List[Visitor])
async def all_visitor(user:User=Depends(get_current_user)):
        user_details =service.find_one({"phone_number": user.phone_number}, {"_id": 0, "password":0,"image":0})
        if user_details:
            visitors_data = visitors.find({},{"_id":0})
            return [Visitor(**visitor) for visitor in visitors_data]
        else:
            raise HTTPException(status_code=400, detail="User not found")
        
@router.post("/check-in")
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
        
@router.post("/check-out")
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
        

@router.get("/last_week")
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