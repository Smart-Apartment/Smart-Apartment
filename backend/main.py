from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://smartapartment-t27i.onrender.com","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"],
)

from api import auth, complaints, family, users,visitors,admin

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(complaints.router, prefix="/complaints", tags=["Complaints"])
app.include_router(family.router, prefix="/family", tags=["Family"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(visitors.router, prefix="/visitor", tags=["Visitor"])

app.include_router(admin.router, prefix="/admin", tags=["Admin"])

# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="127.0.0.1", port=8000)
