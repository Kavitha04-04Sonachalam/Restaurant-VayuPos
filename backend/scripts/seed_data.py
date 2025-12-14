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

        # Create categories
        categories = [
            Category(name="Electronics", description="Electronic devices and gadgets"),
            Category(name="Clothing", description="Apparel and accessories"),
            Category(name="Food & Beverage", description="Food items and drinks"),
            Category(name="Home & Garden", description="Home and garden products"),
            Category(name="Books", description="Books and reading materials"),
        ]
        db.add_all(categories)
        db.commit()
        print("✓ Categories created")

        # Create products
        products = [
            Product(
                sku="ELEC001",
                name="Laptop",
                description="High-performance laptop",
                barcode="1234567890001",
                price=Decimal("999.99"),
                cost_price=Decimal("600.00"),
                stock_quantity=50,
                min_stock_level=5,
                category_id=categories[0].id,
                is_active=True,
            ),
            Product(
                sku="ELEC002",
                name="Mouse",
                description="Wireless mouse",
                barcode="1234567890002",
                price=Decimal("29.99"),
                cost_price=Decimal("10.00"),
                stock_quantity=200,
                min_stock_level=20,
                category_id=categories[0].id,
                is_active=True,
            ),
            Product(
                sku="CLOTH001",
                name="T-Shirt",
                description="Cotton t-shirt",
                barcode="1234567890003",
                price=Decimal("19.99"),
                cost_price=Decimal("8.00"),
                stock_quantity=150,
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

        # Create customers
        customers = [
            Customer(
                first_name="John",
                last_name="Doe",
                email="john@example.com",
                phone="555-0001",
                address="123 Main St",
                city="New York",
                state="NY",
                zip_code="10001",
                loyalty_points=100,
                total_spent=Decimal("500.00"),
                is_active=True,
            ),
            Customer(
                first_name="Jane",
                last_name="Smith",
                email="jane@example.com",
                phone="555-0002",
                address="456 Oak Ave",
                city="Los Angeles",
                state="CA",
                zip_code="90001",
                loyalty_points=250,
                total_spent=Decimal("1200.00"),
                is_active=True,
            ),
        ]
        db.add_all(customers)
        db.commit()
        print("✓ Customers created")

        # Create orders
        order = Order(
            order_number="ORD-20240101-ABC123",
            customer_id=customers[0].id,
            user_id=users[1].id,
            status=OrderStatus.COMPLETED,
            subtotal=Decimal("1029.98"),
            tax=Decimal("102.99"),
            discount=Decimal("50.00"),
            total=Decimal("1082.97"),
            notes="Sample order",
            created_at=datetime.utcnow() - timedelta(days=1),
        )
        db.add(order)
        db.commit()
        print("✓ Orders created")

        # Create order items
        order_items = [
            OrderItem(
                order_id=order.id,
                product_id=products[0].id,
                product_name=products[0].name,
                product_sku=products[0].sku,
                quantity=1,
                unit_price=Decimal("999.99"),
                discount=Decimal("50.00"),
                subtotal=Decimal("949.99"),
            ),
            OrderItem(
                order_id=order.id,
                product_id=products[1].id,
                product_name=products[1].name,
                product_sku=products[1].sku,
                quantity=1,
                unit_price=Decimal("29.99"),
                discount=Decimal("0.00"),
                subtotal=Decimal("29.99"),
            ),
        ]
        db.add_all(order_items)
        db.commit()
        print("✓ Order items created")

        # Create payment
        payment = Payment(
            order_id=order.id,
            payment_method=PaymentMethod.CREDIT_CARD,
            status=PaymentStatus.COMPLETED,
            amount=Decimal("1082.97"),
            transaction_id="TXN-20240101-001",
            reference_number="REF-001",
        )
        db.add(payment)
        db.commit()
        print("✓ Payments created")

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
