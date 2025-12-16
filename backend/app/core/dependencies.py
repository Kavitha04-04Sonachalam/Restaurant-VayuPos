from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import SessionLocal  # make sure you have this

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dummy current user dependency
def get_current_user():
    # Replace with real auth logic
    return {"id": 1, "username": "admin"}
