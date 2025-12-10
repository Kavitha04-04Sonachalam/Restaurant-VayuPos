from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Customer(Base):
    """Customer model for restaurant POS customers."""
    
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    email = Column(String, unique=True, index=True, nullable=True)
    phone = Column(String, unique=True, nullable=True, index=True)
    address = Column(String, nullable=True)
    loyalty_points = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    orders = relationship("Order", back_populates="customer", cascade="all, delete-orphan")
    
    def __repr__(self) -> str:
        return f"<Customer(id={self.id}, name={self.name}, phone={self.phone})>"
