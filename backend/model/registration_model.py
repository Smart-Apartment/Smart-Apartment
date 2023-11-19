from pydantic import BaseModel

class Registration(BaseModel):
    full_name : str
    flat_no:int
    dob:str
    aadhar_number:str
    email:str
    password:str
    user_name:str
    confirmpassword:str
    