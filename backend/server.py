from typing import Dict
from fastapi import FastAPI,Body
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

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
    return data

