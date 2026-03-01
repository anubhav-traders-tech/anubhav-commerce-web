import json

path = "d:/Anubhav Traders/anubhav-commerce-web/public/catalog/products.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for brand in data:
    if brand["id"] == "vaveda":
        # Remove the combined Coco Floats product
        brand["products"] = [p for p in brand["products"] if p["id"] != "v-cf"]
        
        # Add individual Coco Floats products
        coco_floats = [
            {
                "id": "v-cf-mango",
                "name": "Coco Float (Mango)",
                "category": "Coco Floats",
                "mrp": "₹70",
                "image": "/catalog/images/vaveda/Coco Floats/Coco float.jpg", # Or appropriate image
                "variants": [
                  { "weight": "320ml", "price": 70 }
                ],
                "isNew": True
            },
            {
                "id": "v-cf-coconut",
                "name": "Coco Float (Coconut)",
                "category": "Coco Floats",
                "mrp": "₹70",
                "image": "/catalog/images/vaveda/Coco Floats/Coco Float (2).jpg", # Or appropriate image
                "variants": [
                  { "weight": "320ml", "price": 70 }
                ],
                "isNew": True
            },
            {
                "id": "v-cf-lemon",
                "name": "Coco Float (Lemon)",
                "category": "Coco Floats",
                "mrp": "₹70",
                "image": "/catalog/images/vaveda/Coco Floats/Coco Float (3).jpg", # Or appropriate image
                "variants": [
                  { "weight": "320ml", "price": 70 }
                ],
                "isNew": True
            },
            {
                "id": "v-cf-grape",
                "name": "Coco Float (Grape)",
                "category": "Coco Floats",
                "mrp": "₹70",
                "image": "/catalog/images/vaveda/Coco Floats/Coco float.jpg", # Reusing image as there are only 3 images but 5 flavors
                "variants": [
                  { "weight": "320ml", "price": 70 }
                ],
                "isNew": True
            },
            {
                "id": "v-cf-strawberry",
                "name": "Coco Float (Strawberry)",
                "category": "Coco Floats",
                "mrp": "₹70",
                "image": "/catalog/images/vaveda/Coco Floats/Coco Float (2).jpg", # Reusing image
                "variants": [
                  { "weight": "320ml", "price": 70 }
                ],
                "isNew": True
            }
        ]
        
        # Insert them at the beginning
        brand["products"] = coco_floats + brand["products"]

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
