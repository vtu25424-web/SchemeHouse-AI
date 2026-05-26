from fastapi import APIRouter

router = APIRouter(
    prefix="/schemes",
    tags=["Schemes"]
)

@router.get("/")
def schemes_home():
    return {
        "message": "Scheme Route Working"
    }