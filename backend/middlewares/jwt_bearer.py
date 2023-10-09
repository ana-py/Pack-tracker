from typing import Optional
from fastapi import Request, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from utils.jwt_manager import validate_token


class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request
        )-> Optional[HTTPAuthorizationCredentials]:
        auth = await super().__call__(request)
        data = validate_token(auth.credentials)
        if not data:
            raise HTTPException(status_code=403, detail="Invalid credentials")