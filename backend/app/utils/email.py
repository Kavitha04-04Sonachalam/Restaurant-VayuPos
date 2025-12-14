"""Email utility functions"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import get_settings

settings = get_settings()


def send_email(
    to_email: str,
    subject: str,
    body: str,
    is_html: bool = False,
) -> bool:
    """Send email"""
    try:
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = settings.from_email
        message["To"] = to_email

        mime_type = "html" if is_html else "plain"
        message.attach(MIMEText(body, mime_type))

        with smtplib.SMTP(settings.smtp_server, settings.smtp_port) as server:
            server.starttls()
            server.login(settings.smtp_username, settings.smtp_password)
            server.sendmail(settings.from_email, to_email, message.as_string())

        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False


def send_order_confirmation(customer_email: str, order_number: str, order_total: float) -> bool:
    """Send order confirmation email"""
    subject = f"Order Confirmation - {order_number}"
    body = f"""
    <h2>Thank you for your order!</h2>
    <p>Your order number is: <strong>{order_number}</strong></p>
    <p>Total: <strong>${order_total:.2f}</strong></p>
    <p>We will process your order shortly.</p>
    """
    return send_email(customer_email, subject, body, is_html=True)


def send_payment_confirmation(customer_email: str, order_number: str, amount: float) -> bool:
    """Send payment confirmation email"""
    subject = f"Payment Confirmation - {order_number}"
    body = f"""
    <h2>Payment Received</h2>
    <p>Thank you for your payment!</p>
    <p>Order: <strong>{order_number}</strong></p>
    <p>Amount: <strong>${amount:.2f}</strong></p>
    """
    return send_email(customer_email, subject, body, is_html=True)
