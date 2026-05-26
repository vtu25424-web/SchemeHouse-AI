from app.database.mongodb import db
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

users_collection = db["users"]


# Register User
async def register_user(user):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        return {"error": "User already exists"}

    hashed_pw = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pw
    }

    users_collection.insert_one(new_user)

    return {"message": "User registered successfully"}


# Login User
async def login_user(user):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        return {"error": "Invalid email"}

    valid_password = verify_password(
        user.password,
        existing_user["password"]
    )

    if not valid_password:
        return {"error": "Invalid password"}

    token = create_access_token({
        "email": existing_user["email"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }