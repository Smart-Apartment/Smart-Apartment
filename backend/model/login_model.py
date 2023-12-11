from pydantic import BaseModel

class LOGIN(BaseModel):
    phone_number:str
    password:str