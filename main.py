from fastapi import FastAPI
from routers.package import package_router
from routers.user import user_router

app = FastAPI()
app.title = "Pack Tracker"

app.include_router(package_router)
app.include_router(user_router)