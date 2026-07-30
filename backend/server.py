from requests import request
import requests
from fastapi.responses import RedirectResponse
from fastapi import datastructures
from h11._abnf import status_code
from typing import Dict
from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone, timedelta
# pyrefly: ignore [missing-import]
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
                "github_username": data["github_name"],
                "password": hashed,
                "role": "student",
                "last_login": datetime.now(timezone.utc)
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
        last_login_date = user.get("last_login")
        if last_login_date is None:
            await userdb.update_one(
                {"email": data["email"]},
                {"$set": {"last_solved_question": 0, "last_login": datetime.now(timezone.utc)}}
            )
        else:
            if last_login_date.date() != datetime.now(timezone.utc).date():
                last_solved_question = 0
                await userdb.update_one(
                    {"email": data["email"]},
                    {"$set": {"last_solved_question": last_solved_question, "last_login": datetime.now(timezone.utc)}}
                )
            else:
                await userdb.update_one(
                    {"email": data["email"]},
                    {"$set": {"last_login": datetime.now(timezone.utc)}}
                )  
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


@app.get("/login/github")
async def github_login():
    github_client_id = os.getenv("github_client_id")
    github_client_secret = os.getenv("github_client_secret")
    CALLBACK_URL = "http://localhost:8000/auth/github/callback"
    github_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={github_client_id}"
        f"&redirect_uri={CALLBACK_URL}"
        "&scope=repo"
    )
    return RedirectResponse(github_url)

@app.get("/auth/github/callback")
async def github_callback(code: str):
    response = requests.post(
        "https://github.com/login/oauth/access_token",
    data = {
            "client_id": os.getenv("github_client_id"),
            "client_secret": os.getenv("github_client_secret"),
            "code": code
        },
        headers={
            "Accept": "application/json"
        }
    )
    token = response.json()["access_token"]
    user_details = requests.get(
        "https://api.github.com/user",
        headers={
            "Authorization": f"token {token}",
            "Accept": "application/json"
        }
    )
    data = user_details.json()
    github_user = data.get("login",None)
    await userdb.update_one(
        {"github_username": github_user},
        {"$set": {"github_token": token}}
    )
    return RedirectResponse(url="http://localhost:5173/sprint")

@app.get("/get/commits")
async def get_commits(email :str):
    try:
        user = await userdb.find_one({"email": email})
        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User Not Found"
            )
        else:
            user_name = user["github_username"]
            token = user["github_token"]
            url = f"https://api.github.com/repos/{user_name}/google_cracker/commits"
            print(url,token)
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/check/github/access")
async def check_github_access(email: str):
    try:
        user = await userdb.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")      
        else:
            token = user.get("github_token", None) 
            if not token:
                return {"authorize": False}
            else:
                return {"authorize": True}        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/check/commit/github")
async def check_commit_github(email: str):
    user = await userdb.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        user_name = user["github_username"]
        token = user["github_token"]
        url = f"https://api.github.com/users/{user_name}/repos"
        response = requests.get(
            url,
            headers={
                "Accept" : "application/vnd.github+json",
                "Authorization" : f"token {token}"
            },
            params={"sort" : "pushed","direction" : "desc", "per_page": 1}
        )
        data = response.json()
        if not data:
            return {"solved": False}
        top_repo = data[0]["name"]
        commit_url = f"https://api.github.com/repos/{user_name}/{top_repo}/commits"
        commit_response = requests.get(
            commit_url,
            headers={
                "Accept" : "application/vnd.github+json",
                "Authorization" : f"token {token}"
            },
            params={"per_page" : 1}
        )
        commit_data = commit_response.json()
        if not commit_data:
            return {
                "solved" : False
            }
        user = await userdb.find_one({"github_username" : user_name})
        last_solved_question = user.get("last_solved_question", 0)
        commit_date = commit_data[0]["commit"]["author"]["date"]    
        if datetime.fromisoformat(commit_date.replace("Z", "+00:00")).date() == datetime.now(timezone.utc).date() and abs(datetime.now(timezone.utc) - datetime.fromisoformat(commit_date.replace("Z", "+00:00"))) <= timedelta(minutes=1.5):
            await userdb.update_one(
                {"github_username" : user_name},
                {
                    "$set" : {
                        "last_solved_question" : last_solved_question + 1
                    }
                }
                
            )
            return {
                "solved" : True,
                "last_solved_question" : last_solved_question + 1
            }
        else:
            return {
                "solved" : False
            }
    
        
@app.get("/get/last/solved/ques")
async def get_last_solved_ques(email: str):
    try:
        user = await userdb.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        else:
            return {
                "last_solved_question" : user.get("last_solved_question", 0)
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
