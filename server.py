from fastapi import FastAPI
from model.registration_model import Registration
from model.login_model import LOGIN
import bcrypt
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import json
from io import BytesIO
import gridfs
import base64


app = FastAPI()
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["Smart-app"]
register = db["register"]


try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")
except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")


@app.post("/user/register")
def home(user: Registration):

    image = gridfs.GridFS(db, collection="image")
    image_id = image.put(user.image, filename=user.user_name)

    if (user.password == user.confirmpassword):

        hashed = bcrypt.hashpw(user.password.encode("UTF-8"), bcrypt.gensalt())

        user.password = hashed
        user_data = {
            "full_name": user.full_name,
            "flat_no": user.flat_no,
            "dob": user.dob,
            "aadhar_number": user.aadhar_number,
            "email": user.email,
            "password": user.password,
            "user_name": user.user_name,
            "image": image_id
        }
        db.register.insert_one(user_data)
        return (str(user_data), 200)


@app.get("/user/login/{flat_no}")
async def return_name(flat_no: int):
    user = register.find_one({"flat_no": flat_no}, {"_id": 0})
    return user


@app.post("/user/login/")
async def login(login: LOGIN):
    user = register.find_one({"flat_no": login.flat_no}, {"_id": 0})
    if (bcrypt.checkpw(login.password.encode("utf-8"), user["password"])):
        return user
    else:
        return False , 400