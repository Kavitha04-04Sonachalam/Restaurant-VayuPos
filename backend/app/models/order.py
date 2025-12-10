from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Order(Base):
    """Order model for restaurant sales orders."""
    
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, nullable=False, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    subtotal = Column(Float, default=0.0)
    tax = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total = Column(Float, default=0.0)
    payment_method = Column(String, nullable=True)  # cash, card, upi, etc.
    status = Column(String, default="pending", nullable=False)  # pending, completed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")
    user = relationship("User", back_populates="orders")
    customer = relationship("Customer", back_populates="orders")
    
    def __repr__(self) -> str:
        return f"<Order(id={self.id}, order_number={self.order_number}, total={self.total})>"
