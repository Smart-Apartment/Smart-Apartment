from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

client = MongoClient("mongodb+srv://saravana1:qwertyuioplkjhgfdsa@cluster0.gdr7v46.mongodb.net/?retryWrites=true&w=majority")
db = client["Smart-app"]
register = db["register"]
complaints_collection = db["complaints"]
service = db["service"]
visitors = db["visitors"]
invoice = db['invoice']
budget = db['maintenance']
uploads=db['uploads']
family=db['family_members']
admin_db=db['admin']
session_model=db['session']
flat_users=db['flat_users']
try:
    register.create_index([("user_name", 1)], unique=True, name="user_name")
    register.create_index([("phone_number", 1)], unique=True, name="phone_number")
except DuplicateKeyError as e:
    print(f"Error creating unique index on user_name: {e}")
