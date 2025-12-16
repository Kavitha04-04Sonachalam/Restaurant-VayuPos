from sqlalchemy.orm import Session
from datetime import datetime

from app.models.inventory_log import InventoryLog
from app.models.product import Product
from app.schemas.inventory import InventoryLogCreate


class InventoryService:

    @staticmethod
    def create_inventory_log(
        db: Session,
        product_id: int,
        user_id: int,
        data: InventoryLogCreate,
    ):
        # 1. Load product
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise ValueError("Product not found")

        # 2. Validate action
        if data.action not in ["stock_in", "stock_out"]:
            raise ValueError("Invalid action")

        # 3. Current quantity (note: stock_quantity)
        qty_before = product.stock_quantity

        # 4. Compute after quantity
        if data.action == "stock_in":
            qty_after = qty_before + data.quantity_change
        else:  # stock_out
            if qty_before < data.quantity_change:
                raise ValueError("Insufficient stock")
            qty_after = qty_before - data.quantity_change

        # 5. Create log row
        log = InventoryLog(
            product_id=product_id,
            user_id=user_id,
            action=data.action.upper(),  # store as STOCK_IN / STOCK_OUT
            quantity_change=data.quantity_change,
            quantity_before=qty_before,
            quantity_after=qty_after,
            reference_number=data.reference_number,
            notes=data.notes,
            created_at=datetime.utcnow(),
        )

        # 6. Update product stock
        product.stock_quantity = qty_after

        db.add(log)
        db.commit()
        db.refresh(log)

        return log

    @staticmethod
    def get_all_logs(db: Session):
        return (
            db.query(InventoryLog)
            .order_by(InventoryLog.created_at.desc())
            .all()
        )

    @staticmethod
    def get_log_by_id(db: Session, log_id: int):
        return (
            db.query(InventoryLog)
            .filter(InventoryLog.id == log_id)
            .first()
        )

    @staticmethod
    def get_product_history(db: Session, product_id: int):
        return (
            db.query(InventoryLog)
            .filter(InventoryLog.product_id == product_id)
            .order_by(InventoryLog.created_at.desc())
            .all()
        )

    @staticmethod
    def get_inventory_summary(db: Session):
        products = db.query(Product).all()
        return [
            {
                "product_id": p.id,
                "product_name": p.name,
                "quantity": p.stock_quantity,
            }
            for p in products
        ]
