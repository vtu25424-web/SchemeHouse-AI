from pydantic import BaseModel
from typing import List


class RecommendedScheme(BaseModel):
    scheme_name: str
    category: str
    score: int
    benefits: List[str]
    reason: str