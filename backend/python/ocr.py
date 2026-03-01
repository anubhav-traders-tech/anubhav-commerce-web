from pdf2image import convert_from_path
import pytesseract
import os

def pdf_to_text(pdf_path):
    # Depending on the system, poppler is required for pdf2image.
    # Tesseract OCR path might need to be set on Windows
    # pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    
    # Check if files exists
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF missing: {pdf_path}")

    # Fallback/Optimization: First try pdfplumber or fitz to see if text is natively extractable.
    # But as per architectural instructions, we do Image OCR to ensure we catch image-based pages.
    
    try:
        pages = convert_from_path(pdf_path, dpi=300)
    except Exception as e:
        raise Exception(f"pdf2image failed (make sure poppler is installed): {e}")

    full_text = ""

    for page in pages:
        # Using pytesseract on the converted PIL Image
        text = pytesseract.image_to_string(page, lang='eng')
        full_text += text + "\n"

    return full_text
