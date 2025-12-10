from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class InventoryLog(Base):
    """Inventory log model for tracking stock movements."""
    
    __tablename__ = "inventory_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity_change = Column(Integer, nullable=False)  # Positive for stock-in, negative for stock-out
    reason = Column(String, nullable=False)  # sale, purchase, adjustment, damage, return, etc.
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    product = relationship("Product", back_populates="inventory_logs")
    user = relationship("User", back_populates="inventory_logs")
    
    def __repr__(self) -> str:
        return f"<InventoryLog(id={self.id}, product_id={self.product_id}, quantity_change={self.quantity_change}, reason={self.reason})>"
