from pydantic import BaseModel

class Session(BaseModel):
    token:str
    expiry_time:int