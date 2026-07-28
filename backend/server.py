from typing import Dict
from fastapi import FastAPI,Body
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

connectdb = AsyncIOMotorClient("mongodb+srv://subasanthosh2007_db_user:FxOVBcDJOEScnlCO@cluster0.onpnmda.mongodb.net/?appName=Cluster0")

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
    await userdb.insert_one({
        "name":data["name"],
        "email":data["email"],
        "github":data["github"],
        "discord":data["discord"],
    })
    return {"message": "User registered successfully"}

