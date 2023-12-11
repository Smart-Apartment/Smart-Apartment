from pydantic import BaseModel
import uuid
class Visitor(BaseModel):
    id:str 
    flatno:str
    Time:str
    FullName:str
    Purpose:str
    Date:str
    check_in_time:str
    phoneNumber:str
    qrTime:str
    check_out_time: str= "Pending"
    check_in_approver:str=None
    check_out_approver:str=None