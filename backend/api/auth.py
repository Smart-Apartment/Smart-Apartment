from fastapi import APIRouter, Depends, HTTPException,status,Request
from model.user_model import User, ServiceUser  
from oauth import get_current_user  
from pymongo import MongoClient
import gridfs
from model.registration_model import Registration
import bcrypt
from jose import JWTError, jwt
from model.change_password import ChangePassword

from fastapi.security import OAuth2PasswordRequestForm
from jwttoken import create_access_token,create_refresh_token
from fastapi.responses import JSONResponse
from db.mongodb import db,uploads,service,register
router = APIRouter()

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
@router.post("/refresh")
async def refresh_token(req:Request):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        refresh_token=req.cookies.get('refresh_token')
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        access_token = create_access_token(data={"sub": username})
        return {"access_token": access_token, "token_type": "bearer", "role": "user"}
    except jwt.ExpiredSignatureError:
        raise credentials_exception
    except JWTError:
        raise credentials_exception
@router.post("/register")
def home(user: Registration):
    if db.register.find_one({"phone_number": user.phone_number}):
        raise HTTPException(status_code=400, detail="Phone number already registered")
    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(user.image, filename=user.user_name)

    if (user.password == user.confirmpassword):

        hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

        user.password = hashed
        user_data = {
            "full_name": user.full_name,
            "flat_no": user.flat_no,
            "dob": user.dob,
            "aadhar_number": user.aadhar_number,
            "email": user.email,
            "password": user.password,
            "phone_number":user.phone_number,
            "user_name": user.user_name,
            "image": image_id
        }
        db.register.insert_one(user_data)
        return (str(user_data), 200)
    
    
def get_flat_user(phone_number: str):
    return register.find_one({"phone_number": phone_number},{"_id":0})



def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)



@router.post("/login")
async def login(login: OAuth2PasswordRequestForm = Depends()):
    normal_user = get_flat_user(login.username)
    if normal_user and verify_password(login.password, normal_user["password"]):
        access_token = create_access_token(data={"sub": normal_user["phone_number"]})
        refresh_token = create_refresh_token(data={"sub": normal_user["phone_number"]})
        print(refresh_token)
        response = JSONResponse(content={"access_token": access_token, "token_type": "bearer", "role": "user"})
        response.set_cookie("refresh_token", refresh_token, httponly=True, expires=2 * 24 * 60 * 60,samesite='none',secure=True)
        # response.set_cookie('token',access_token,httponly=True)
        return response

    raise HTTPException(status_code=401, detail="Invalid phone number or password")

@router.post("/login/serviceprovider")
async def splogin(splogin: OAuth2PasswordRequestForm=Depends()):
    user =service.find_one({"phone_number": splogin.username},{"_id":0})
    if not user or not verify_password(splogin.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid phone number or password")
    
    access_token = create_access_token(data={"sub": user["phone_number"] })
    return {"access_token": access_token, "token_type": "bearer","role":user['role']}

@router.post("/change-password")
async def change_password(change_password_data: ChangePassword,current_user:User=Depends(get_current_user)):
    user = service.find_one({"phone_number": current_user.phone_number}, {"_id": 0})

    if user and bcrypt.checkpw(
        change_password_data.current_password.encode("utf-8"), user["password"]
    ):
        hashed_new_password = bcrypt.hashpw(
            change_password_data.new_password.encode("utf-8"), bcrypt.gensalt()
        )

        service.update_one(
            {"phone_number": current_user.phone_number},
            {"$set": {"password": hashed_new_password}},
        )
        return {"message": "Password changed successfully"}
    else:
        raise HTTPException(status_code=401, detail="Current Password is Wrong")