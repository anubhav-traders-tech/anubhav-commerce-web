import os
from openai import OpenAI

# ensure OPENAI_API_KEY is defined in .env or system vars
def structure_with_ai(raw_text, brand):
    client = OpenAI()

    prompt = f"""
You are a data extraction engine.

Extract all product information from the text below for the brand '{brand}'.

Return STRICT JSON array without any markdown fences, matching the schema.

Schema:
[
  {{
    "name": "",
    "category": "",
    "variants": [
        {{
            "weight": "",
            "price": 0
        }}
    ]
  }}
]

Rules:
- Merge same products with multiple weights into variants
- If price is missing, set price to null
- If weight is missing, set weight to "1 Unit"
- Do not hallucinate products that aren't there
- Return ONLY JSON! No markdown block, no conversational text.

TEXT:
{raw_text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    clean_res = response.choices[0].message.content.strip()
    if clean_res.startswith('```json'):
        clean_res = clean_res[7:]
    if clean_res.endswith('```'):
        clean_res = clean_res[:-3]
        
    return clean_res.strip()
