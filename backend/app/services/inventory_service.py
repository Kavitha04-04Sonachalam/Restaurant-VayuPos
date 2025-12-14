"""Inventory service"""
from sqlalchemy.orm import Session
from app.models import InventoryLog, Product, InventoryAction
from app.schemas import InventoryLogCreate
from app.core.exceptions import not_found_exception, bad_request_exception
from typing import Optional, Tuple
from datetime import datetime, timedelta


class InventoryService:
    """Service for inventory operations"""

    @staticmethod
    def log_inventory_change(
        db: Session,
        product_id: int,
        user_id: Optional[int],
        action: InventoryAction,
        quantity_change: int,
        reference_number: Optional[str] = None,
        notes: Optional[str] = None,
    ) -> InventoryLog:
        """Log inventory change"""
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise not_found_exception("Product not found")

        quantity_before = product.stock_quantity
        quantity_after = quantity_before + quantity_change

        # Prevent negative stock
        if quantity_after < 0:
            raise bad_request_exception(
                f"Cannot reduce stock below 0. Current stock: {quantity_before}, Requested change: {quantity_change}"
            )

        # Update product stock
        product.stock_quantity = quantity_after

        # Create log entry
        log = InventoryLog(
            product_id=product_id,
            user_id=user_id,
            action=action,
            quantity_change=quantity_change,
            quantity_before=quantity_before,
            quantity_after=quantity_after,
            reference_number=reference_number,
            notes=notes,
        )

        db.add(log)
        db.commit()
        db.refresh(log)
        return log

    @staticmethod
    def create_inventory_log(db: Session, inventory_log_create: InventoryLogCreate, user_id: int) -> InventoryLog:
        """Create inventory log"""
        return InventoryService.log_inventory_change(
            db=db,
            product_id=inventory_log_create.product_id,
            user_id=user_id,
            action=inventory_log_create.action,
            quantity_change=inventory_log_create.quantity_change,
            reference_number=inventory_log_create.reference_number,
            notes=inventory_log_create.notes,
        )

    @staticmethod
    def get_inventory_log_by_id(db: Session, log_id: int) -> Optional[InventoryLog]:
        """Get inventory log by ID"""
        return db.query(InventoryLog).filter(InventoryLog.id == log_id).first()

    @staticmethod
    def list_inventory_logs(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        product_id: Optional[int] = None,
        action: Optional[InventoryAction] = None,
        days: Optional[int] = None,
    ) -> Tuple[list[InventoryLog], int]:
        """List inventory logs with filters"""
        query = db.query(InventoryLog)

        if product_id is not None:
            query = query.filter(InventoryLog.product_id == product_id)

        if action is not None:
            query = query.filter(InventoryLog.action == action)

        if days is not None:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            query = query.filter(InventoryLog.created_at >= cutoff_date)

        query = query.order_by(InventoryLog.created_at.desc())
        total = query.count()
        logs = query.offset(skip).limit(limit).all()
        return logs, total

    @staticmethod
    def get_product_inventory_history(
        db: Session, product_id: int, limit: int = 50
    ) -> list[InventoryLog]:
        """Get inventory history for a product"""
        return db.query(InventoryLog).filter(InventoryLog.product_id == product_id).order_by(
            InventoryLog.created_at.desc()
        ).limit(limit).all()

    @staticmethod
    def adjust_stock(
        db: Session,
        product_id: int,
        new_quantity: int,
        user_id: int,
        notes: str = "Stock adjustment",
    ) -> InventoryLog:
        """Adjust product stock to a specific quantity"""
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise not_found_exception("Product not found")

        quantity_change = new_quantity - product.stock_quantity

        return InventoryService.log_inventory_change(
            db=db,
            product_id=product_id,
            user_id=user_id,
            action=InventoryAction.ADJUSTMENT,
            quantity_change=quantity_change,
            notes=notes,
        )

    @staticmethod
    def get_inventory_summary(db: Session) -> dict:
        """Get inventory summary statistics"""
        total_products = db.query(Product).filter(Product.is_active == True).count()
        low_stock_products = db.query(Product).filter(
            (Product.stock_quantity <= Product.min_stock_level) & (Product.is_active == True)
        ).count()
        out_of_stock = db.query(Product).filter(
            (Product.stock_quantity == 0) & (Product.is_active == True)
        ).count()

        return {
            "total_products": total_products,
            "low_stock_count": low_stock_products,
            "out_of_stock_count": out_of_stock,
        }
