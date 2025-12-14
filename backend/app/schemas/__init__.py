"""Pydantic schemas for API request/response validation"""
from app.schemas.response import *

__all__ = [
    # User
    "UserBase",
    "UserCreate",
    "UserUpdate",
    "UserResponse",
    # Category
    "CategoryBase",
    "CategoryCreate",
    "CategoryUpdate",
    "CategoryResponse",
    # Product
    "ProductBase",
    "ProductCreate",
    "ProductUpdate",
    "ProductResponse",
    # Customer
    "CustomerBase",
    "CustomerCreate",
    "CustomerUpdate",
    "CustomerResponse",
    # Order
    "OrderCreate",
    "OrderUpdate",
    "OrderResponse",
    "OrderItemCreate",
    "OrderItemResponse",
    # Payment
    "PaymentCreate",
    "PaymentUpdate",
    "PaymentResponse",
    # Inventory
    "InventoryLogCreate",
    "InventoryLogResponse",
    # Generic
    "ResponseSchema",
    "PaginationParams",
    "LoginRequest",
    "TokenResponse",
]
