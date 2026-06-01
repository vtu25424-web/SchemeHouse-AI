from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db
from app.routes import auth_routes, scheme_routes, recommendation_routes
from app.routes.user_routes import router as user_router


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

# Scheme Routes
app.include_router(
    scheme_routes.router,
    prefix="/api",
    tags=["Schemes"]
)

# User Routes
app.include_router(
    user_router,
    prefix="/user",
    tags=["User"]
)

# Recommendation Routes
app.include_router(
    recommendation_routes.router,
    tags=["Recommendations"]
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