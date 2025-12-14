"""Helper utilities"""
from decimal import Decimal
from datetime import datetime


def format_currency(amount: Decimal, currency: str = "USD") -> str:
    """Format amount as currency"""
    if currency == "USD":
        return f"${amount:,.2f}"
    elif currency == "EUR":
        return f"€{amount:,.2f}"
    else:
        return f"{currency} {amount:,.2f}"


def format_datetime(dt: datetime, format_str: str = "%Y-%m-%d %H:%M:%S") -> str:
    """Format datetime to string"""
    return dt.strftime(format_str)


def calculate_discount_percentage(original: Decimal, discounted: Decimal) -> float:
    """Calculate discount percentage"""
    if original == 0:
        return 0
    return float((original - discounted) / original * 100)


def calculate_profit(selling_price: Decimal, cost_price: Decimal) -> Decimal:
    """Calculate profit"""
    return selling_price - cost_price


def calculate_profit_margin(selling_price: Decimal, cost_price: Decimal) -> float:
    """Calculate profit margin percentage"""
    if selling_price == 0:
        return 0
    return float((selling_price - cost_price) / selling_price * 100)


def paginate(items: list, skip: int, limit: int) -> list:
    """Paginate items"""
    return items[skip : skip + limit]


def generate_report_filename(report_type: str, date: datetime = None) -> str:
    """Generate report filename"""
    if not date:
        date = datetime.utcnow()
    return f"{report_type}_{date.strftime('%Y%m%d_%H%M%S')}.pdf"
