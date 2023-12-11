from pydantic import BaseModel
import uuid
class Visitor(BaseModel):
    id:str 
    flatno:str
    Time:str
    FullName:str
    Purpose:str
    Date:str
    week:int
    day:str
    check_in_time:str
    phoneNumber:str
    qrTime:str
    check_out_time: str= "Pending"
    