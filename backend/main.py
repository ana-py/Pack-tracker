from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from routers.package import package_router
from routers.user import user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.title = "Pack Tracker"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(package_router)
app.include_router(user_router)

@app.get("/", tags=["home"])
def message():
    return HTMLResponse("<h1>Welcome to Pack Tracker App</h1>")