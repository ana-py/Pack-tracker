from pymongo import MongoClient
from dotenv import load_dotenv
import os

# load_dotenv()
# MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient("mongodb+srv://yamm:12345@cluster0.o4f8g6a.mongodb.net/?retryWrites=true&w=majority")
#client = MongoClient("mongodb://localhost:27017")
db = client["pack_tracker"]
