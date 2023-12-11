from pydantic import BaseModel
class ChangePassword(BaseModel):
    user_name: str
    current_password: str
    new_password: str