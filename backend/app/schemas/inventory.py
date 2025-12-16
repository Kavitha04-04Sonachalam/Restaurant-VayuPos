from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# -------- CREATE --------
class InventoryLogCreate(BaseModel):
    action: str              # stock_in | stock_out
    quantity_change: int
    reference_number: Optional[str] = None
    notes: Optional[str] = None

# -------- RESPONSE --------
class InventoryLogResponse(BaseModel):
    id: int
    product_id: int
    user_id: int
    action: str
    quantity_change: int
    quantity_before: int
    quantity_after: int
    reference_number: Optional[str]
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True   # Pydantic v2 FIX
