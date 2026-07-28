from typing import Dict
from fastapi import FastAPI,Body
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv  
import os
from argon2 import PasswordHasher



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
    #password hashing
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
        return {"message": "User not found"}
    if PasswordHasher().verify(user["password"], data["password"]):
        
        return {"message": "Login successful"}




