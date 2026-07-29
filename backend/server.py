from fastapi import datastructures
from h11._abnf import status_code
from typing import Dict
from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
# pyrefly: ignore [missing-import]
from argon2.exceptions import VerifyMismatchError
from dotenv import load_dotenv  
from datetime import datetime
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
    try:
        return {"message": "Google Cracker"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/registerinpage")
async def register(data: dict):
    try:
        print(data)
        user = await userdb.find_one({"email": data["email"]})
        if user:
            raise HTTPException(
                status_code=404,
                detail="User already exists"
            )
        else:
            ph = PasswordHasher()
            hashed = ph.hash(data["password"])
            await userdb.insert_one({
                "name": data["name"],
                "email": data["email"],
                "github": data["github"],
                "password": hashed,
                "role": "student"
            })

        return {"message": "User registered successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/logininpage")
async def login(data: dict):
    try:
        user = await userdb.find_one({"email": data["email"]})
        print(user)
        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User Not Found"
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
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/getrole")
async def get_role(email: str):
    try:
        user = await userdb.find_one({"email": email})
        if user:
            return {"role": user["role"]}
        else:
            raise HTTPException(
                status_code=404,
                detail="User Not Found"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

dailyques_db = db["dailyques"]
weeklyques_db = db["weeklyques"]

@app.post("/dailyques")
async def add_daily_ques(data: dict):
    try:
        title = data["title"].strip()
        link = data["link"].strip()
        await dailyques_db.update_one(
            {
                "date": datetime.now().strftime("%Y-%m-%d")
            },
            {
                "$push": {
                    "questions": {
                        "title": title,
                        "link": link
                    }
                }
            },
            upsert=True
        )
        return {"message": "Daily question added successfully", "data": data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/weeklyques")
async def add_weekly_ques(data: dict):
    try:
        title = data["title"].strip()
        link = data["link"].strip()
        await weeklyques_db.update_one(
            {
                "date": datetime.now().strftime("%Y-%m-%d")
            },
            {
                "$push": {
                    "questions": {
                        "title": title,
                        "link": link
                    }
                }
            },
            upsert=True
        )
        return {"message": "Weekly question added successfully", "data": data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/getdailyques")
async def get_daily_ques(date: str):
    try:
        ques = await dailyques_db.find_one(
            {
                "date": date
            }
        )
        if ques:
            questions = ques.get("questions", [])
            return {"data": questions}
        else:
            return {"data": []}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/getweeklyques")
async def get_weekly_ques(date: str):
    try:
        ques = await weeklyques_db.find_one(
            {
                "date": date
            }
        )
        if ques:
            questions = ques.get("questions", [])
            return {"data": questions}
        else:
            return {"data": []}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
