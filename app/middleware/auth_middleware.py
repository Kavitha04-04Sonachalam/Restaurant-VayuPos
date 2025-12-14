"""Authentication middleware"""
from fastapi import HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from app.core.security import decode_token

security = HTTPBearer()


def verify_token(credentials: HTTPAuthCredentials):
    """Verify JWT token"""
    token = credentials.credentials
    payload = decode_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload
