from h11._abnf import status_code
from typing import Dict
from fastapi import FastAPI,Body
from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from argon2.exceptions import VerifyMismatchError
from dotenv import load_dotenv  
import os
# pyrefly: ignore [missing-import]
from argon2 import PasswordHasher


load_dotenv()
app = FastAPI()

connectdb = AsyncIOMotorClient(os.getenv("MONGO_URL"))

db = connectdb["googlecracker"]

userdb = db["user"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],     
)

@app.get("/")
def home():
    return {"message": "Google Cracker"}

@app.post("/registerinpage")
async def register(data: dict):
    print(data)
    user = await userdb.find_one({"email": data["email"]})
    if user:
         raise HTTPException(
            status_code = 404,
            detail = "User already exists"
    )
    else:
        ph = PasswordHasher()
        hashed = ph.hash(data["password"])
        await userdb.insert_one({
            "name":data["name"],
            "email":data["email"],
        "github":data["github"],
        "password":hashed
    })

    return {"message": "User registered successfully"}

@app.post("/logininpage")
async def login(data: dict):
    user = await userdb.find_one({"email": data["email"]})
    print(user)
    if user is None:
    
        raise HTTPException(
            status_code = 404,
            detail = "User Not Found"
    )
    else:
        print(user["password"])
        try:
            ph = PasswordHasher()
            ph.verify(user["password"], data["password"])
            return {"message": "Login successful"}

        except VerifyMismatchError:
            
            raise HTTPException(
                status_code=401,
                detail="Invalid password"
            )




