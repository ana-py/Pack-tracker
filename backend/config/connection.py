from pymongo import MongoClient
from dotenv import load_dotenv
import os

# load_dotenv()
# MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_URI = "mongodb+srv://yamm:12345@cluster0.o4f8g6a.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGODB_URI)

db = client["pack_tracker"]
