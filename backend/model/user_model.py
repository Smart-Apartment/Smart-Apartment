from typing import Optional
from pydantic import BaseModel
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
    