import sys
import json
from ocr import pdf_to_text
from ai_structurer import structure_with_ai
from normalizer import clean_products

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing pdf path or brand name"}))
        sys.exit(1)

    pdf_path = sys.argv[1]
    brand = sys.argv[2]

    try:
        # Step 1: OCR
        raw_text = pdf_to_text(pdf_path)
        
        # Step 2: AI Structurer
        if len(raw_text.strip()) == 0:
            print(json.dumps({"error": "Failed to extract text from PDF."}))
            sys.exit(1)

        structured_json_str = structure_with_ai(raw_text, brand)
        
        # Parse AI response
        structured_data = json.loads(structured_json_str)
        
        # Step 3: Normalizer / Cleaning
        final_products = clean_products(structured_data, brand)
        
        # Step 4: Output to stdout for Node.js
        print(json.dumps(final_products))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
