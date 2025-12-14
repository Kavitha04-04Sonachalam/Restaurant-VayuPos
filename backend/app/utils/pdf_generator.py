"""PDF generation utility"""
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from decimal import Decimal
from datetime import datetime
from io import BytesIO
from typing import List, Dict, Optional


def generate_order_invoice(
    order_number: str,
    customer_name: str,
    order_items: List[Dict],
    subtotal: Decimal,
    tax: Decimal,
    discount: Decimal,
    total: Decimal,
    date: Optional[datetime] = None,
) -> BytesIO:
    """Generate order invoice PDF"""
    if not date:
        date = datetime.utcnow()

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()

    # Title
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Heading1"],
        fontSize=24,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=30,
    )
    elements.append(Paragraph("INVOICE", title_style))

    # Order details
    order_details = [
        [f"Order #: {order_number}", f"Date: {date.strftime('%Y-%m-%d %H:%M')}"],
        [f"Customer: {customer_name}", ""],
    ]
    table = Table(order_details, colWidths=[3 * inch, 3 * inch])
    table.setStyle(
        TableStyle([("FONTNAME", (0, 0), (-1, -1), "Helvetica"), ("FONTSIZE", (0, 0), (-1, -1), 10)])
    )
    elements.append(table)
    elements.append(Spacer(1, 0.3 * inch))

    # Items
    item_data = [["Product", "Qty", "Unit Price", "Discount", "Total"]]
    for item in order_items:
        item_data.append(
            [
                item.get("product_name", ""),
                str(item.get("quantity", 0)),
                f"${item.get('unit_price', 0):.2f}",
                f"${item.get('discount', 0):.2f}",
                f"${item.get('subtotal', 0):.2f}",
            ]
        )

    items_table = Table(item_data, colWidths=[2 * inch, 0.8 * inch, 1 * inch, 1 * inch, 1 * inch])
    items_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e5e7eb")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.black),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 11),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ("FONTSIZE", (0, 1), (-1, -1), 10),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f9fafb")]),
            ]
        )
    )
    elements.append(items_table)
    elements.append(Spacer(1, 0.3 * inch))

    # Totals
    totals_data = [
        ["Subtotal:", f"${subtotal:.2f}"],
        ["Tax:", f"${tax:.2f}"],
        ["Discount:", f"-${discount:.2f}"],
        ["TOTAL:", f"${total:.2f}"],
    ]
    totals_table = Table(totals_data, colWidths=[4 * inch, 2 * inch])
    totals_table.setStyle(
        TableStyle(
            [
                ("ALIGN", (0, 0), (-1, -1), "RIGHT"),
                ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
                ("FONTSIZE", (0, -1), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LINEABOVE", (0, -1), (-1, -1), 2, colors.black),
            ]
        )
    )
    elements.append(totals_table)

    doc.build(elements)
    buffer.seek(0)
    return buffer
