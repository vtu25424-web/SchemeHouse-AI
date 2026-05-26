from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db
from app.routes import auth_routes

app = FastAPI(
    title="SchemeHouse AI Backend",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Routes
app.include_router(
    auth_routes.router,
    prefix="/auth",
    tags=["Authentication"]
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "SchemeHouse AI Backend Running Successfully"
    }

# Database Test Route
@app.get("/test-db")
def test_database():
    return {
        "message": "MongoDB Atlas Connected Successfully"
    }