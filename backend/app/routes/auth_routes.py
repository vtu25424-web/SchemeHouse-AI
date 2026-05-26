from fastapi import APIRouter
from app.models.user import UserRegister, UserLogin
from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter()


@router.post("/register")
async def register(user: UserRegister):

    result = await register_user(user)

    return result


@router.post("/login")
async def login(user: UserLogin):

    result = await login_user(user)

    return result