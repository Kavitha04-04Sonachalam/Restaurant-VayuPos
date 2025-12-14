"""Inventory API routes"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user, get_db
from app.services import InventoryService
from app.schemas import InventoryLogCreate, InventoryLogResponse

router = APIRouter(prefix="/inventory", tags=["Inventory"])


@router.post("/logs", response_model=InventoryLogResponse)
def create_inventory_log(
    inventory_log_create: InventoryLogCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create inventory log"""
    log = InventoryService.create_inventory_log(db, inventory_log_create, int(current_user["sub"]))
    return log


@router.get("/logs", response_model=dict)
def list_inventory_logs(
    skip: int = 0,
    limit: int = 100,
    product_id: int = None,
    action: str = None,
    days: int = None,
    db: Session = Depends(get_db),
):
    """List inventory logs"""
    logs, total = InventoryService.list_inventory_logs(db, skip, limit, product_id, action, days)
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": logs,
    }


@router.get("/logs/{log_id}", response_model=InventoryLogResponse)
def get_inventory_log(log_id: int, db: Session = Depends(get_db)):
    """Get inventory log by ID"""
    log = InventoryService.get_inventory_log_by_id(db, log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Inventory log not found")
    return log


@router.get("/product/{product_id}/history", response_model=list)
def get_product_inventory_history(
    product_id: int,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """Get inventory history for a product"""
    history = InventoryService.get_product_inventory_history(db, product_id, limit)
    return history


@router.post("/product/{product_id}/adjust")
def adjust_stock(
    product_id: int,
    new_quantity: int,
    notes: str = "Stock adjustment",
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Adjust product stock"""
    log = InventoryService.adjust_stock(db, product_id, new_quantity, int(current_user["sub"]), notes)
    return {
        "message": "Stock adjusted successfully",
        "log_id": log.id,
        "quantity_before": log.quantity_before,
        "quantity_after": log.quantity_after,
    }


@router.get("/summary", response_model=dict)
def get_inventory_summary(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get inventory summary"""
    summary = InventoryService.get_inventory_summary(db)
    return summary
