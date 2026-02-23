import os
import json
import base64
import urllib.request
import urllib.error
import time

# Found from .env (API Key provided by User for Gemini/Nano Banana)
API_KEY = "AIzaSyDVuw3feB1YksC8_O5pUPzSiwjE_7FlD5k"
MODELS_TO_TRY = [
    "gemini-2.5-flash-image",
    "gemini-3-pro-image-preview",
    "gemini-2.0-flash-exp-image-generation"
]

prompts = [
    {
        "filename": "cta_founder_shot.png",
        "text": "Square 1:1 ratio. A professional confident startup founder looking directly at the camera. Cinematic rim light with gold/amber tones on the edges, premium dark minimal background. High status, charismatic. Highly detailed, 4k."
    },
    {
        "filename": "mockup_deliverable.png",
        "text": "Square 1:1 ratio. Flat-lay, top-down view on a dark premium desk. A modern laptop partially visible, printed research documents with yellow highlights, and colorful sticky notes arranged neatly. Soft box lighting, professional organized stationery layout. Highly detailed, 4k."
    },
    {
        "filename": "screenshot_dashboard_iklan.png",
        "text": "Square 1:1 ratio. Side-by-side visual of an advertising dashboard interface. The left side shows negative red charts and a low ROAS metric. The right side shows positive green upward trends and high ROAS. Text and identities are blurred for privacy. UI design, data-driven, modern software interface. Highly detailed, 4k."
    },
    {
        "filename": "avatar_klien_1.png",
        "text": "Square 1:1 ratio. Headshot of a professional business executive, age 35, warm inviting lighting, blurred background. High quality, photorealistic, 4k."
    },
    {
        "filename": "avatar_klien_2.png",
        "text": "Square 1:1 ratio. Headshot of a female entrepreneur, age 40, warm inviting lighting, blurred background. High quality, photorealistic, premium corporate portrait, 4k."
    },
    {
        "filename": "avatar_klien_3.png",
        "text": "Square 1:1 ratio. Headshot of a male startup founder, age 38, warm inviting lighting, blurred background. High quality, photorealistic, premium corporate portrait, 4k."
    },
    {
        "filename": "konsultasi_team_shot.png",
        "text": "Square 1:1 ratio. A team and a client in a discussion session. Screen visible with charts. Warm ambient lighting, approachable and friendly mood. Professional consulting environment. Highly detailed, 4k."
    }
]

def generate_image(prompt_text, filename, model_name):
    print(f"Generating {filename} with {model_name}...")
    URL = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={API_KEY}"
    
    data = {"contents": [{"parts": [{"text": prompt_text}]}]}
    json_data = json.dumps(data).encode('utf-8')
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(URL, data=json_data, headers=headers, method='POST')
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    result = json.loads(response.read().decode('utf-8'))
                    if "candidates" in result and len(result["candidates"]) > 0:
                        candidate = result["candidates"][0]
                        if "content" in candidate and "parts" in candidate["content"]:
                            parts = candidate["content"]["parts"]
                            found_image = False
                            for part in parts:
                                if "inlineData" in part:
                                    b64_data = part["inlineData"]["data"]
                                    image_data = base64.b64decode(b64_data)
                                    with open(filename, "wb") as f:
                                        f.write(image_data)
                                    print(f"Saved to {filename} with {model_name}")
                                    return True
                            if not found_image:
                                 print(f"No image data found in parts for {filename} with {model_name}. Response: {result}")
                                 return False
                    else:
                        print(f"Error: No candidates found for {filename} with {model_name}. Response: {result}")
                        return False
        except urllib.error.HTTPError as e:
            if e.code == 429:
                 wait_time = 60 * (attempt + 1)
                 print(f"Rate limit hit for {model_name}. Waiting {wait_time}s and retrying...")
                 time.sleep(wait_time)
                 continue
            else:
                 print(f"Failed to generate {filename} with {model_name}: HTTP Error {e.code} - {e.reason}")
                 try: print(e.read().decode('utf-8'))
                 except: pass
                 return False
        except Exception as e:
            print(f"Failed to generate {filename} with {model_name}: {e}")
            return False
            
    return False

if __name__ == "__main__":
    out_dir = "/Users/eldragon/git/meta_ads/research_page"
    os.makedirs(out_dir, exist_ok=True)
    os.chdir(out_dir)
    print(f"Saving images to {out_dir}")
    
    for i, item in enumerate(prompts):
        if os.path.exists(item["filename"]):
             print(f"Skipping {item['filename']} (exists)")
             continue
        
        success = False
        for model in MODELS_TO_TRY:
            if generate_image(item["text"], item["filename"], model):
                success = True
                break
            time.sleep(2) 
            
        if success:
             print(f"Successfully generated {item['filename']}")
        else:
             print(f"Failed to generate {item['filename']} with all models.")
             
        if i < len(prompts) - 1:
            print("Waiting 10 seconds before next request...")
            time.sleep(10)
