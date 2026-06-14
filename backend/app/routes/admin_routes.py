from fastapi import APIRouter
from app.database.mongodb import db
from app.models.scheme import Scheme
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
def create_scheme(scheme: Scheme):

    new_scheme = {
        "scheme_name": scheme.scheme_name,
        "category": scheme.category,
        "min_income": scheme.min_income,
        "max_income": scheme.max_income,
        "eligibility": scheme.eligibility,
        "benefits": scheme.benefits,
        "official_link": scheme.official_link
    }

    return add_scheme(new_scheme)


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