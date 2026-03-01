import json
import os
import urllib.parse

path = r"d:\Anubhav Traders\anubhav-commerce-web\public\catalog\products.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Helper function to generate an ID
def get_id(prefix, index):
    return f"ba-{prefix}-{index}"

ba_products = []

# Scan through local directories to populate
base_dir = r"d:\Anubhav Traders\anubhav-commerce-web\AnubhavTraders\catalogs\Basic Ayurveda"

# Mapping directory names to categories
category_map = {
    "Capsule": "Capsules",
    "Health Juices": "Health Juices",
    "Honey & Candy": "Honey & Candy",
    "Oil": "Oils",
    "Powder": "Powders",
    "Vineger": "Vinegar"
}

prefix_map = {
    "Capsule": "c",
    "Health Juices": "hj",
    "Honey & Candy": "hc",
    "Oil": "o",
    "Powder": "p",
    "Vineger": "v"
}

index_counters = {k: 1 for k in prefix_map.keys()}

for folder_name, category in category_map.items():
    folder_path = os.path.join(base_dir, folder_name)
    if os.path.exists(folder_path):
        for file in os.listdir(folder_path):
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                # File name is like "Ashwagandha Capsule.png" or "After Meal - 225ml & 450ml.png"
                name_part = os.path.splitext(file)[0]
                
                # Try to extract weight from name
                name = name_part
                variants = []
                mrp = "Check Package" # Default message
                
                if "-" in name_part:
                    parts = name_part.split("-", 1)
                    name = parts[0].strip()
                    weight_str = parts[1].strip()
                    
                    # Split multiple weights if & is present
                    weights = [w.strip() for w in weight_str.split("&")]
                    for w in weights:
                        variants.append({"weight": w, "price": 0}) # Replace price with 0 to indicate unknown
                else:
                    variants.append({"weight": "Standard", "price": 0})
                
                # Image path relative for public (URL encoding the path)
                # Need to use the copied path
                rel_path = f"/catalog/images/basic-ayurveda/{folder_name}/{file}"
                
                product = {
                    "id": get_id(prefix_map[folder_name], index_counters[folder_name]),
                    "name": name,
                    "category": category,
                    "mrp": mrp,
                    "image": rel_path,
                    "variants": variants,
                    "isNew": False
                }
                
                ba_products.append(product)
                index_counters[folder_name] += 1

# Make first product new
if ba_products:
    ba_products[0]["isNew"] = True

for brand in data:
    if brand["id"] == "basic-ayurveda":
        brand["products"] = ba_products
        brand["logo"] = "/catalog/images/basic-ayurveda/Logo-Basic Ayurveda.jpg"

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
