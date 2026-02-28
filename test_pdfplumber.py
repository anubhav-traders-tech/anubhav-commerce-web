import pdfplumber
import os
import json

pdf_dir = r"D:\Anubhav Traders\anubhav-commerce-web\AnubhavTraders\catalogs"
pdfs = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]

for pdf_file in pdfs:
    print(f"\n=======================")
    print(f"FILE: {pdf_file}")
    try:
        with pdfplumber.open(os.path.join(pdf_dir, pdf_file)) as pdf:
            print(f"Pages: {len(pdf.pages)}")
            if len(pdf.pages) > 0:
                first_page = pdf.pages[0]
                text = first_page.extract_text()
                tables = first_page.extract_tables()
                
                print(f"Text preview (first 200 chars): {text[:200] if text else 'None'}")
                print(f"Tables found: {len(tables)}")
                if tables:
                    print(f"First table preview: {tables[0][:2]}")
    except Exception as e:
        print(f"Error reading {pdf_file}: {e}")
