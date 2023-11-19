from pymongo import MongoClient 
import gridfs
import os

def connect():
    try:
        url="mongodb+srv://saravana1:qwertyuioplkjhgfdsa@cluster0.gdr7v46.mongodb.net/images?retryWrites=true&w=majority"
        conn=MongoClient(url)
        return conn['images']
    except:
        print("error")
db=connect()
collection=db['image']
fs=gridfs.GridFS(db,collection="images")
with open(os.path.join(os.getcwd()+"/database/img1.jpg"),"rb") as img:
    image=img.read()
fs.put(image,filename="images")