
from fastapi import APIRouter, Depends, HTTPException
from model.user_model import User, ServiceUser  
from oauth import get_current_user  
import uuid
from db.mongodb import family
from typing import Optional,List
from pydantic import BaseModel

class Member(BaseModel):
    id:Optional[str]=None
    name: str
    age: str
    gender : str
    
class RequestData(BaseModel):
    member: List[Member]

router=APIRouter()
@router.post("/addfamily")
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
    
@router.get("/getfamily")
async def get_members(current_user: User = Depends(get_current_user)):
    try:
        result =  family.find_one({"phone_number": current_user.phone_number},{'_id':0})
        if result:
            return result
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@router.post("/removemember")
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