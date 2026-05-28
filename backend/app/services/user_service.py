from app.database.mongodb import db
from bson import ObjectId


users_collection = db["users"]


def save_user_profile(user_email, profile_data):
    
    result = users_collection.update_one(
        {"email": user_email},
        {
            "$set": {
                "profile": profile_data
            }
        }
    )

    return result.matched_count > 0


def get_user_profile(user_email):

    user = users_collection.find_one({"email": user_email})

    if user and "profile" in user:
        user["_id"] = str(user["_id"])
        return user["profile"]

    return None