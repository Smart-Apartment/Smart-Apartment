from pydantic import BaseModel

class Service(BaseModel):
    first_name : str
    last_name:str
    dob:str
    aadhar_number:str
    phone:str
    password:str
    role:list
    confirmpassword:str
    image:bytes