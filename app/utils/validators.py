"""Data validation utilities"""
from email_validator import validate_email, EmailNotValidError
from datetime import datetime


def validate_email_format(email: str) -> bool:
    """Validate email format"""
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        return False


def validate_phone_number(phone: str) -> bool:
    """Validate phone number format"""
    phone = phone.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
    return len(phone) >= 10 and len(phone) <= 15 and phone.isdigit()


def validate_date_range(start_date: datetime, end_date: datetime) -> bool:
    """Validate date range"""
    return start_date <= end_date


def validate_positive_amount(amount: float) -> bool:
    """Validate positive amount"""
    return amount > 0


def validate_sku_format(sku: str) -> bool:
    """Validate SKU format"""
    return len(sku) > 0 and len(sku) <= 50


def sanitize_filename(filename: str) -> str:
    """Sanitize filename"""
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, "_")
    return filename
