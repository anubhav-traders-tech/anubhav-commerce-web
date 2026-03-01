import json
from datetime import datetime

with open('public/catalog/products.json', 'r', encoding='utf-8') as f:
    brands = json.load(f)

base_url = "https://www.anubhavtraders.com"
last_mod = datetime.now().strftime("%Y-%m-%d")

urls = [
    "/",
    "/brands",
    "/products",
    "/contact",
    "/cart",
    "/checkout"
]

for brand in brands:
    urls.append(f"/brand/{brand['slug']}")
    if 'products' in brand:
        for product in brand['products']:
            urls.append(f"/product/{product['id']}")

sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

for url in urls:
    sitemap_content += f"""  <url>
    <loc>{base_url}{url}</loc>
    <lastmod>{last_mod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{"1.0" if url == "/" else "0.8"}</priority>
  </url>\n"""

sitemap_content += '</urlset>'

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_content)

robots_txt = f"""User-agent: *
Allow: /

Sitemap: {base_url}/sitemap.xml
"""
with open('public/robots.txt', 'w', encoding='utf-8') as f:
    f.write(robots_txt)

print("Sitemap and robots.txt generated successfully!")
