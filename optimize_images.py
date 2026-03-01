import os
import glob
import json
from PIL import Image

MAX_SIZE = (800, 800)

def optimize_image(filepath):
    # Only process non-webp images
    if not filepath.lower().endswith(('.png', '.jpg', '.jpeg')):
        return None
    
    try:
        with Image.open(filepath) as img:
            img = img.convert('RGB')
            # Resize if necessary maintaining aspect ratio
            img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
            
            base, ext = os.path.splitext(filepath)
            new_path = base + ".webp"
            img.save(new_path, "webp", quality=80)
            
        # Check if the new file is smaller than 300KB
        size_kb = os.path.getsize(new_path) / 1024
        print(f"Optimized: {new_path} ({size_kb:.1f} KB)")
        
        # We only remove old image if webp was successfully created
        os.remove(filepath)
        
        # Return path diff so we know what to replace
        old_rel = filepath.replace('\\', '/').split('public/')[-1]
        new_rel = new_path.replace('\\', '/').split('public/')[-1]
        
        return old_rel, new_rel
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None

if __name__ == "__main__":
    replacements = []
    
    print("Converting static images to webp...")
    for filepath in glob.glob("public/catalog/**/*.*", recursive=True):
        res = optimize_image(filepath)
        if res:
            replacements.append(res)
            
    print("Updating products.json...")
    json_path = "public/catalog/products.json"
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old_rel, new_rel in replacements:
            old_web = "/" + old_rel.replace('\\', '/')
            new_web = "/" + new_rel.replace('\\', '/')
            content = content.replace(old_web, new_web)
            
        # Minify JSON
        data = json.loads(content)
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, separators=(',', ':'))
            
    print("Done!")
