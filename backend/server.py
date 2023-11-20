from fastapi import FastAPI
from model.registration_model import Registration
from model.login_model import LOGIN
import bcrypt
from ..faceRecognition.face import imageFeature
import gridfs

from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

app=FastAPI()
client = MongoClient("mongodb+srv://saravana1:qwertyuioplkjhgfdsa@cluster0.gdr7v46.mongodb.net/images?retryWrites=true&w=majority")
db=client["Smart-app"]
register=db["register"]

try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")
except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")

@app.post("/user/register")
def home(user:Registration):
    image=gridfs.GridFS(db,"register")
    features=imageFeature(user.image)
    with open(user.image,"rb") as imageData:
        data=imageData.read()
    imageId=image.put(data,collection="images")
    if(user.password == user.confirmpassword):
        try:
            hashed=bcrypt.hashpw(user.password.encode("UTF-8"),bcrypt.gensalt())
            user.password=hashed
            db.register.insert_one({
                "full_name": user.full_name,
                "flat_no": user.flat_no,
                "dob": user.dob,
                "aadhar_number": user.aadhar_number,
                "email": user.email,
                "password": user.password,
                "user_name":user.user_name,
                "image":imageId
            })
            return "Success" ,200
        except:
            return "User Name Already Exists",500
    
@app.get("/user/login/{flat_no}")
async def return_name(flat_no:int):
    user=register.find_one({"flat_no" : flat_no},{"_id":0})
    
    return user


@app.post("/user/login/")
async def login(login : LOGIN):
    user=register.find_one({"flat_no":login.flat_no},{"_id":0})
    if(bcrypt.checkpw(login.password.encode("utf-8"),user["password"])):
        return user
    else:
        return False ,400