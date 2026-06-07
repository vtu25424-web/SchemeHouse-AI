from pydantic import BaseModel
from typing import List

class Scheme(BaseModel):
    scheme_name: str
    category: str
    min_income: int
    max_income: int
    eligibility: List[str]
    benefits: List[str]