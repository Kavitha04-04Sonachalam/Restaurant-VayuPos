from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Payment(Base):
    """Payment model for order payments."""
    
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    amount = Column(Float, nullable=False)
    payment_method = Column(String, nullable=False)  # cash, card, upi, check, etc.
    transaction_id = Column(String, unique=True, nullable=True, index=True)
    status = Column(String, default="completed", nullable=False)  # completed, pending, failed, refunded
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Optional: Link payment to user who processed it
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Relationships
    order = relationship("Order", back_populates="payments")
    user = relationship("User", back_populates="payments")
    
    def __repr__(self) -> str:
        return f"<Payment(id={self.id}, order_id={self.order_id}, amount={self.amount}, status={self.status})>"
