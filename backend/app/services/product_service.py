"""Product and Category service"""
from sqlalchemy.orm import Session
from app.models import Product, Category, InventoryLog, InventoryAction
from app.schemas import ProductCreate, ProductUpdate, CategoryCreate, CategoryUpdate
from app.core.exceptions import not_found_exception, conflict_exception
from typing import Optional, Tuple
from decimal import Decimal


class ProductService:
    """Service for product operations"""

    @staticmethod
    def create_product(db: Session, product_create: ProductCreate, user_id: int) -> Product:
        """Create a new product"""
        # Check if SKU already exists
        existing = db.query(Product).filter(Product.sku == product_create.sku).first()
        if existing:
            raise conflict_exception("Product with this SKU already exists")

        # Create product
        db_product = Product(
            sku=product_create.sku,
            name=product_create.name,
            description=product_create.description,
            barcode=product_create.barcode,
            price=product_create.price,
            cost_price=product_create.cost_price,
            stock_quantity=product_create.stock_quantity,
            min_stock_level=product_create.min_stock_level,
            category_id=product_create.category_id,
            image_url=product_create.image_url,
        )

        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        # Log initial stock
        if product_create.stock_quantity > 0:
            InventoryService.log_inventory_change(
                db=db,
                product_id=db_product.id,
                user_id=user_id,
                action=InventoryAction.STOCK_IN,
                quantity_change=product_create.stock_quantity,
                reference_number="INITIAL_STOCK",
            )

        return db_product

    @staticmethod
    def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
        """Get product by ID"""
        return db.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def get_product_by_sku(db: Session, sku: str) -> Optional[Product]:
        """Get product by SKU"""
        return db.query(Product).filter(Product.sku == sku).first()

    @staticmethod
    def get_product_by_barcode(db: Session, barcode: str) -> Optional[Product]:
        """Get product by barcode"""
        return db.query(Product).filter(Product.barcode == barcode).first()

    @staticmethod
    def update_product(db: Session, product_id: int, product_update: ProductUpdate) -> Product:
        """Update product"""
        product = ProductService.get_product_by_id(db, product_id)
        if not product:
            raise not_found_exception("Product not found")

        # Check if new SKU is unique
        if product_update.sku and product_update.sku != product.sku:
            existing = db.query(Product).filter(Product.sku == product_update.sku).first()
            if existing:
                raise conflict_exception("Product with this SKU already exists")

        update_data = product_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(product, field, value)

        db.commit()
        db.refresh(product)
        return product

    @staticmethod
    def delete_product(db: Session, product_id: int) -> bool:
        """Delete product"""
        product = ProductService.get_product_by_id(db, product_id)
        if not product:
            raise not_found_exception("Product not found")

        db.delete(product)
        db.commit()
        return True

    @staticmethod
    def list_products(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        category_id: Optional[int] = None,
        is_active: Optional[bool] = None,
    ) -> Tuple[list[Product], int]:
        """List products with pagination and filters"""
        query = db.query(Product)

        if category_id is not None:
            query = query.filter(Product.category_id == category_id)

        if is_active is not None:
            query = query.filter(Product.is_active == is_active)

        total = query.count()
        products = query.offset(skip).limit(limit).all()
        return products, total

    @staticmethod
    def get_low_stock_products(db: Session) -> list[Product]:
        """Get products with stock below minimum level"""
        return db.query(Product).filter(
            (Product.stock_quantity <= Product.min_stock_level) & (Product.is_active == True)
        ).all()

    @staticmethod
    def search_products(db: Session, search_term: str) -> list[Product]:
        """Search products by name, SKU, or barcode"""
        return db.query(Product).filter(
            (Product.name.ilike(f"%{search_term}%"))
            | (Product.sku.ilike(f"%{search_term}%"))
            | (Product.barcode.ilike(f"%{search_term}%"))
        ).filter(Product.is_active == True).all()


class CategoryService:
    """Service for category operations"""

    @staticmethod
    def create_category(db: Session, category_create: CategoryCreate) -> Category:
        """Create a new category"""
        # Check if name already exists
        existing = db.query(Category).filter(Category.name == category_create.name).first()
        if existing:
            raise conflict_exception("Category with this name already exists")

        db_category = Category(
            name=category_create.name,
            description=category_create.description,
        )

        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category

    @staticmethod
    def get_category_by_id(db: Session, category_id: int) -> Optional[Category]:
        """Get category by ID"""
        return db.query(Category).filter(Category.id == category_id).first()

    @staticmethod
    def update_category(db: Session, category_id: int, category_update: CategoryUpdate) -> Category:
        """Update category"""
        category = CategoryService.get_category_by_id(db, category_id)
        if not category:
            raise not_found_exception("Category not found")

        update_data = category_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(category, field, value)

        db.commit()
        db.refresh(category)
        return category

    @staticmethod
    def delete_category(db: Session, category_id: int) -> bool:
        """Delete category"""
        category = CategoryService.get_category_by_id(db, category_id)
        if not category:
            raise not_found_exception("Category not found")

        db.delete(category)
        db.commit()
        return True

    @staticmethod
    def list_categories(
        db: Session, skip: int = 0, limit: int = 100
    ) -> Tuple[list[Category], int]:
        """List categories"""
        query = db.query(Category)
        total = query.count()
        categories = query.offset(skip).limit(limit).all()
        return categories, total
