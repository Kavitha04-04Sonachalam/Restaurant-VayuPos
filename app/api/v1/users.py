"""Users API routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user, get_db
from app.services import AuthService
from app.schemas import UserResponse, UserUpdate
from typing import List

# FIXED PREFIX — REMOVE /api/v1
router = APIRouter(prefix="/users", tags=["Users"])


# Helper function to convert ORM to dict
def user_to_dict(user):
    """Convert User ORM to dict"""
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "role": user.role.value if hasattr(user.role, 'value') else user.role,
        "is_active": user.is_active,
        "is_verified": user.is_verified,
        "created_at": user.created_at.isoformat() if user.created_at else None,
        "updated_at": user.updated_at.isoformat() if user.updated_at else None,
    }


@router.get("/")
def list_users(
    skip: int = 0,
    limit: int = 100,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all users"""
    users, total = AuthService.list_users(db, skip, limit)
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": [user_to_dict(user) for user in users],
    }


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get user by ID"""
    user = AuthService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update user information"""
    user = AuthService.update_user(db, user_id, user_update)
    return user


@router.delete("/{user_id}")
def deactivate_user(
    user_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Deactivate a user"""
    AuthService.deactivate_user(db, user_id)
    return {"message": "User deactivated successfully"}


@router.post("/{user_id}/activate")
def activate_user(
    user_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Activate a user"""
    AuthService.activate_user(db, user_id)
    return {"message": "User activated successfully"}
