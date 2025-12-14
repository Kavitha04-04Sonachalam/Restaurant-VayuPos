"""Barcode generator utility"""
import barcode
from barcode.writer import ImageWriter
from io import BytesIO
from PIL import Image


def generate_barcode(code: str, barcode_format: str = "code128") -> Image.Image:
    """Generate barcode image"""
    try:
        barcode_class = barcode.get_barcode_class(barcode_format)
        barcode_instance = barcode_class(code, writer=ImageWriter())
        buffer = BytesIO()
        barcode_instance.write(buffer)
        buffer.seek(0)
        return Image.open(buffer)
    except Exception as e:
        print(f"Error generating barcode: {str(e)}")
        return None


def save_barcode(code: str, filepath: str, barcode_format: str = "code128") -> bool:
    """Save barcode to file"""
    try:
        barcode_class = barcode.get_barcode_class(barcode_format)
        barcode_instance = barcode_class(code, writer=ImageWriter())
        barcode_instance.save(filepath)
        return True
    except Exception as e:
        print(f"Error saving barcode: {str(e)}")
        return False


def validate_barcode(code: str) -> bool:
    """Validate barcode format"""
    return len(code) > 0 and len(code) <= 100
