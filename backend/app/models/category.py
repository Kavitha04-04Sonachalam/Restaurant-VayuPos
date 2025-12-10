from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Category(Base):
    """Product category model."""
    
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")
    
    def __repr__(self) -> str:
        return f"<Category(id={self.id}, name={self.name})>"
