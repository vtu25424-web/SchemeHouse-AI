from fastapi import APIRouter, HTTPException
from app.models.user import UserProfile
from app.services.user_service import (
    save_user_profile,
    get_user_profile
)

router = APIRouter()


@router.post("/profile/{email}")
def create_profile(email: str, profile: UserProfile):

    success = save_user_profile(email, profile.dict())

    if success:
        return {
            "message": "Profile saved successfully"
        }

    raise HTTPException(
        status_code=400,
        detail="Profile not saved"
    )


@router.get("/profile/{email}")
def fetch_profile(email: str):

    profile = get_user_profile(email)

    if profile:
        return profile

    raise HTTPException(
        status_code=404,
        detail="Profile not found"
    )