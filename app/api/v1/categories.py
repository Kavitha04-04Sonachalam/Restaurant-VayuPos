from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.services import CategoryService

router = APIRouter(tags=["categories"], prefix="/categories")

# Helper function to convert ORM to dict
def category_to_dict(category):
    """Convert Category ORM to dict"""
    return {
        "id": category.id,
        "name": category.name,
        "description": category.description,
        "is_active": category.is_active,
        "created_at": category.created_at.isoformat() if category.created_at else None,
        "updated_at": category.updated_at.isoformat() if category.updated_at else None,
    }

# ----------------- GET categories -----------------
@router.get("/")
def list_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all categories with pagination"""
    categories, total = CategoryService.list_categories(db, skip, limit)
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": [category_to_dict(cat) for cat in categories]
    }
