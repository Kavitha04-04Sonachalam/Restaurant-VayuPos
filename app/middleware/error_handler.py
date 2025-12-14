"""Error handling middleware"""
from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.exceptions import PosException


async def error_handler(request: Request, exc: Exception):
    """Handle application errors"""
    if isinstance(exc, PosException):
        return JSONResponse(
            status_code=400,
            content={"detail": str(exc)},
        )

    # Log unexpected errors
    print(f"Unexpected error: {str(exc)}")

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )
