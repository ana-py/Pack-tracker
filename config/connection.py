from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)
MONGOBD_URI = os.getenv("MONGOBD_URI")
#client = MongoClient(MONGOBD_URI)
client = MongoClient("mongodb://localhost:27017")
db = client["pack_tracker"]
