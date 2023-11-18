from pydantic import BaseModel

class LOGIN(BaseModel):
    flat_no:int
    user_name:str
    password:str