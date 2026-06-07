from fastapi import APIRouter
from app.database.mongodb import db
from app.services.scheme_service import (
    add_scheme,
    update_scheme,
    delete_scheme
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# =========================
# ADMIN HOME
# =========================
@router.get("/")
def admin_home():
    return {
        "message": "Admin Route Working"
    }


# =========================
# GET ALL MONGODB SCHEMES
# =========================
@router.get("/schemes")
def get_admin_schemes():
    return list(
        db["schemes"].find(
            {},
            {"_id": 0}
        )
    )


# =========================
# ADD SCHEME
# =========================
@router.post("/add-scheme")
def create_scheme(scheme: dict):
    return add_scheme(scheme)


# =========================
# UPDATE SCHEME
# =========================
@router.put("/update-scheme/{scheme_name}")
def edit_scheme(
    scheme_name: str,
    scheme: dict
):
    return update_scheme(
        scheme_name,
        scheme
    )


# =========================
# DELETE SCHEME
# =========================
@router.delete("/delete-scheme/{scheme_name}")
def remove_scheme(scheme_name: str):
    return delete_scheme(scheme_name)