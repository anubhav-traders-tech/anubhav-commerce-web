import json
import re

path = r"d:\Anubhav Traders\anubhav-commerce-web\public\catalog\products.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for brand in data:
    for i, product in enumerate(brand.get("products", [])):
        # Generate SKU
        if "sku" not in product:
            product["sku"] = f"SKU-{brand['id'].upper()}-{product['id'].upper()}"
        
        # Images array
        if "images" not in product:
            product["images"] = [product.get("image", "")]
        
        # Parse MRP to number
        old_mrp_str = str(product.get("mrp", "0"))
        parsed_mrp = 0
        matches = re.findall(r'\d+', old_mrp_str)
        if matches:
            parsed_mrp = int(matches[-1]) # take highest from range if like ₹10 - ₹120
        
        if "variants" in product and product["variants"]:
            v_price = product["variants"][-1].get("price", 0)
            if v_price != 0 and type(v_price) in (int, float):
                parsed_mrp = v_price
        
        product["mrp"] = parsed_mrp
        
        # Selling price with discount
        discount = 15 # 15% discount for demo
        product["discount_percentage"] = discount
        product["selling_price"] = int(parsed_mrp * (1 - discount/100))
        
        if product["selling_price"] <= 0:
            product["selling_price"] = product["mrp"]
            product["discount_percentage"] = 0
            
        product["stock"] = 100 # Default stock
        
        if "short_description" not in product:
            product["short_description"] = f"A high-quality {product.get('category', 'product')} by {brand['name']} designed to meet your daily needs."
            
        if "full_description" not in product:
            product["full_description"] = f"Experience the exceptional quality of {product['name']}. Brought to you by {brand['name']}. This {product.get('category', 'product')} stands out in terms of premium ingredients and manufacturing standards. It perfectly complements your lifestyle."
            
        if "key_features" not in product:
            product["key_features"] = [
                "Premium quality ingredients",
                "Authentic and trusted brand",
                "Carefully processed and packed",
                "Incredible value for money"
            ]
        
        if "specifications" not in product:
            product["specifications"] = {
                "Brand": brand["name"],
                "Category": product.get("category", "General"),
                "Origin": "India"
            }

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    
print("Migration completed.")
