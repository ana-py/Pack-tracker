from fastapi import FastAPI
from routers.package import package_router

app = FastAPI()
app.title = "Pack Tracker"

app.include_router(package_router)