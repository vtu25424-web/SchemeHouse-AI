from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db
from app.routes import (
    auth_routes,
    scheme_routes,
    admin_routes
)
from app.routes.user_routes import router as user_router
from app.routes.recommendation_routes import router as recommendation_router

app = FastAPI(
    title="SchemeHouse AI Backend",
    version="1.0.0"
)

# =========================
# CORS Configuration
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# AUTHENTICATION ROUTES
# =========================
app.include_router(
    auth_routes.router,
    prefix="/auth",
    tags=["Authentication"]
)

# =========================
# SCHEME ROUTES
# =========================
app.include_router(
    scheme_routes.router,
    prefix="/api",
    tags=["Schemes"]
)

# =========================
# USER ROUTES
# =========================
app.include_router(
    user_router,
    prefix="/user",
    tags=["User"]
)

# =========================
# RECOMMENDATION ROUTES
# =========================
app.include_router(
    recommendation_router,
    tags=["Recommendations"]
)

# =========================
# ADMIN ROUTES
# =========================
app.include_router(
    admin_routes.router
)

# =========================
# HOME ROUTE
# =========================
@app.get("/")
def home():
    return {
        "message": "SchemeHouse AI Backend Running Successfully"
    }


# =========================
# DATABASE TEST ROUTE
# =========================
@app.get("/test-db")
def test_database():
    return {
        "message": "MongoDB Atlas Connected Successfully"
    }