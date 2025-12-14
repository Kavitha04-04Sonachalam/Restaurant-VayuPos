"""Authentication and User service"""
from sqlalchemy.orm import Session
from app.models import User
from app.schemas import UserCreate, UserUpdate
from app.core.security import verify_password, hash_password, decode_token
from app.core.exceptions import (
    not_found_exception,
    bad_request_exception,
    conflict_exception,
)
from typing import Optional


class AuthService:
    """Service for authentication operations"""

    @staticmethod
    def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
        """Authenticate a user by username and password"""
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def create_user(db: Session, user_create: UserCreate) -> User:
        """Create a new user"""
        # Check if user already exists
        existing_user = db.query(User).filter(
            (User.username == user_create.username) | (User.email == user_create.email)
        ).first()

        if existing_user:
            raise conflict_exception("Username or email already exists")

        # Hash password
        hashed_password = hash_password(user_create.password)

        # Create user
        db_user = User(
            username=user_create.username,
            email=user_create.email,
            hashed_password=hashed_password,
            full_name=user_create.full_name,
            phone_number=user_create.phone_number,
            role=user_create.role,
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        """Get user by username"""
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def update_user(db: Session, user_id: int, user_update: UserUpdate) -> User:
        """Update user information"""
        user = AuthService.get_user_by_id(db, user_id)
        if not user:
            raise not_found_exception("User not found")

        update_data = user_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)

        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def change_password(db: Session, user_id: int, old_password: str, new_password: str) -> User:
        """Change user password"""
        user = AuthService.get_user_by_id(db, user_id)
        if not user:
            raise not_found_exception("User not found")

        # Verify old password
        if not verify_password(old_password, user.hashed_password):
            raise bad_request_exception("Old password is incorrect")

        # Hash and set new password
        user.hashed_password = hash_password(new_password)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def list_users(db: Session, skip: int = 0, limit: int = 100) -> tuple[list[User], int]:
        """List all users with pagination"""
        query = db.query(User)
        total = query.count()
        users = query.offset(skip).limit(limit).all()
        return users, total

    @staticmethod
    def deactivate_user(db: Session, user_id: int) -> User:
        """Deactivate a user account"""
        user = AuthService.get_user_by_id(db, user_id)
        if not user:
            raise not_found_exception("User not found")

        user.is_active = False
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def activate_user(db: Session, user_id: int) -> User:
        """Activate a user account"""
        user = AuthService.get_user_by_id(db, user_id)
        if not user:
            raise not_found_exception("User not found")

        user.is_active = True
        db.commit()
        db.refresh(user)
        return user
