from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

try:

    client = MongoClient(
        MONGODB_URL,
        tls=True,
        tlsAllowInvalidCertificates=True
    )

    db = client[DATABASE_NAME]

    # Test connection
    client.admin.command("ping")

    print("✅ MongoDB Connected Successfully")

except Exception as e:

    print("❌ MongoDB Connection Failed")
    print(e)