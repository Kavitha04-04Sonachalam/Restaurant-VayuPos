"""Seed data script for development"""
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, init_db
from app.models import (
    User, UserRole, Category, Product, Customer,
    Order, OrderStatus, OrderItem, Payment, PaymentMethod, PaymentStatus
)
from app.core.security import get_password_hash
from decimal import Decimal
from datetime import datetime, timedelta


def seed_database():
    """Seed database with initial data"""
    db = SessionLocal()

    try:
        # Initialize database
        init_db()

        # Create users
        users = [
            User(
                username="admin",
                email="admin@pos.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Admin User",
                role=UserRole.ADMIN,
                is_active=True,
                is_verified=True,
            ),
            User(
                username="cashier1",
                email="cashier1@pos.com",
                hashed_password=get_password_hash("cashier123"),
                full_name="John Cashier",
                role=UserRole.CASHIER,
                is_active=True,
                is_verified=True,
            ),
            User(
                username="manager1",
                email="manager1@pos.com",
                hashed_password=get_password_hash("manager123"),
                full_name="Jane Manager",
                role=UserRole.MANAGER,
                is_active=True,
                is_verified=True,
            ),
        ]
        db.add_all(users)
        db.commit()
        print("✓ Users created")

        # Don't create default categories - user can create via API
        print("✓ Categories (create via API)")

        # Don't create default products - user can create via API
        print("✓ Products (create via API)")
                min_stock_level=30,
                category_id=categories[1].id,
                is_active=True,
            ),
            Product(
                sku="FOOD001",
                name="Coffee",
                description="Premium coffee beans",
                barcode="1234567890004",
                price=Decimal("12.99"),
                cost_price=Decimal("5.00"),
                stock_quantity=300,
                min_stock_level=50,
                category_id=categories[2].id,
                is_active=True,
            ),
        ]
        db.add_all(products)
        db.commit()
        print("✓ Products created")

        # Create customers (optional - skip for now)
        print("✓ Ready for API usage")

        print("\n✓ Database seeded successfully!")
        print("\nTest credentials:")
        print("  Admin - username: admin, password: admin123")
        print("  Cashier - username: cashier1, password: cashier123")
        print("  Manager - username: manager1, password: manager123")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {str(e)}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
