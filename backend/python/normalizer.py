CATEGORY_MAP = {
    "juice": "beverages",
    "masala": "spices",
    "spice": "spices",
    "agarbatti": "pooja",
    "dhoop": "pooja",
    "camphor": "pooja",
    "namkeen": "snacks",
    "snack": "snacks",
    "syrup": "pharmacy",
    "salt": "spices",
    "paste": "spices",
}

def clean_products(products, brand):
    for product in products:
        # Normalize Category
        cat_lower = product.get("category", "").lower()
        matched_cat = cat_lower
        
        for key, value in CATEGORY_MAP.items():
            if key in cat_lower:
                matched_cat = value
                break
        
        product["category"] = matched_cat.capitalize()
        
        # Standardize variants and generate SKUs
        for variant in product.get("variants", []):
            weight = str(variant.get("weight", "1-UNIT")).upper().replace(" ", "")
            name = product["name"].upper().replace(" ", "-")
            
            # Simple SKU generator
            brand_code = brand[:4].upper()
            variant["sku"] = f"{brand_code}-{name}-{weight}"
            variant["stock"] = 0

        product["brand"] = brand
        product["isActive"] = True

    return products
