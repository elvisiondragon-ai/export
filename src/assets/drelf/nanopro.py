import os
import json
import base64
import urllib.request
import urllib.error
import time

#Dont Use API, use Built in TOOL ANTIGRAVITY
#DONT DICTATE THE OUTPUT PATH, LET IT DEFAULT on BRAIN
# Primary: google/gemini-3-pro-image-preview
MODEL_NAME = "gemini-3-pro-image-preview"

OUTPUT_DIR = "/Users/eldragon/git/el/command/meta_ads/brand_darkfeminine/images/philippines_image"

# Layout Requirements:
# Small purple label #8B5CF6: 'DARK FEMININE'
# Large white bold serif headline #FFFFFF
# Cream text #EEE5C8 for description
# Gold italic CTA #C9991A: '... →'

prompts = [
    {
        "filename": "df_ph_v2_13.png", # V2 Ad #03 - Strong Lead
        "text": "Create a 1:1 square dark feminine ad image. Scene: Silhouette of a Filipino woman standing in a doorway at night, a faint golden aura highlighting her figure against the dark room. Cinematic, photorealistic, editorial Meta ad style. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Gusto Mong Maging Siya — Hindi Lang Panoorin', Medium cream text below: 'Lagi kang nananawa sa strong female lead.', Next line cream text: 'Ang babaeng hindi pumipigil sa sarili.', Bold white caps text: 'SIYA ANG PINIPILI.', Small gold italic text at bottom: '52 hakbang para maging SIYA. Simulan →'"
    },
    {
        "filename": "df_ph_v2_14.png", # V2 Ad #04 - Bakit Siya Again
        "text": "Create a 1:1 square dark feminine ad image. Scene: Split composition. Left side: An ordinary-looking Filipino woman being hugged by a man. Right side: A traditionally beautiful Filipino woman sitting alone in a car at night looking out the window. Cinematic style. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Bakit Siya Lagi? Ano ang Alam Niya?', Medium cream text below: 'Hindi siya mas maganda. Hindi mas matalino.', Next line cream text: 'Pero SIYA ang pinili. Lagi.', Bold white caps text: 'ITO AY INTERNAL NA LAKAS.', Small gold italic text at bottom: 'Matutunan mo ito sa 52 pahina. Click →'"
    },
    {
        "filename": "df_ph_v2_15.png", # V2 Ad #05 - Mystery Aura
        "text": "Create a 1:1 square dark feminine ad image. Scene: A Filipino woman walking away down a dark, elegant hallway, several men's eyes following her in the shadows. Moody lighting with purple ambient glow. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Ang Babaeng Imposibleng Kalimutan', Medium cream text below: 'Hindi sila nagmamahal ng todo.', Next line cream text: 'Hindi sumusunod agad.', Bold white caps text: 'MISTERYOSO AT HINDI MABASA.', Small gold italic text at bottom: 'Aura na natututo, hindi ipinanganak →'"
    },
    {
        "filename": "df_ph_v2_16.png", # V2 Ad #06 - Niloko Pattern
        "text": "Create a 1:1 square dark feminine ad image. Scene: A desk calendar with red 'X' marks on three consecutive months. Beside it, a wilted rose on a dark marble surface. Phone screen nearby showing a 'Seen' message. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Bakit Lagi Tatlong Buwan, Tapos Wala Na?', Medium cream text below: '3 buwan. Palagi. Masaya kayo.', Next line cream text: 'Tapos parang may na-expire.', Bold white caps text: 'PATTERN ITO. MAY SOLUSYON.', Small gold italic text at bottom: 'Putulin ang cycle na ito. Alamin →'"
    },
    {
        "filename": "df_ph_v2_17.png", # V2 Ad #07 - Soft Life
        "text": "Create a 1:1 square dark feminine ad image. Scene: A luxury dinner table set for two with fine crystal and candles. A Filipino woman eats alone on one side, looking at the empty seat with envy. Gold rim lighting. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Bakit Siya — At Hindi Ikaw — ang Pinagalagaan?', Medium cream text below: 'Nakikita mo sila sa Instagram.', Next line cream text: 'Binibili ng bag. Dine-date.', Bold white caps text: 'MAY ALAM SILA NA HINDI MO ALAM.', Small gold italic text at bottom: 'Ang susi sa soft life. Alamin →'"
    },
    {
        "filename": "df_ph_v2_18.png", # V2 Ad #08 - Iniwan Ulit
        "text": "Create a 1:1 square dark feminine ad image. Scene: A Filipino woman holding her phone, reflections of city lights on her face. Screen shows a chat bubble with just 'Seen' and no reply. Deep purple lighting. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Ibinigay Mo Lahat — Pinili Pa Rin Niya Iba', Medium cream text below: 'Oras mo. Puso mo. Lakas mo.', Next line cream text: 'At pinili pa rin niya ang iba.', Bold white caps text: 'TAMA NA. HINDI NA AKO ITO.', Small gold italic text at bottom: 'Dark Feminine awakening. Start →'"
    },
    {
        "filename": "df_ph_v2_19.png", # V2 Ad #09 - Hindi Tanga
        "text": "Create a 1:1 square dark feminine ad image. Scene: A wall filled with framed diplomas and awards. A Filipino woman sits below them at a desk, head down in her hands. Intense gold and purple light. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: 'Matalino Ka — Bakit Talo Ka Pa Rin?', Medium cream text below: 'Matalino ka sa trabaho at pera.', Next line cream text: 'Pero pagdating sa kanya, parang wala.', Bold white caps text: 'DAHIL ITO SA INFORMATION GAP.', Small gold italic text at bottom: '52 lihim na hindi itinuro. Alamin →'"
    },
    {
        "filename": "df_ph_v2_20.png", # V2 Ad #10 - Sana All
        "text": "Create a 1:1 square dark feminine ad image. Scene: A Filipino woman scrolling through her phone in bed at night, the screen glow highlighting her face. Couple photos are visible on the blurred screen. Bottom half has a dark semi-transparent overlay with TEXT in this EXACT layout: Small purple uppercase label: 'DARK FEMININE', Large bold white serif headline: '\"Sana All\" — O Gagawin Mo Na?', Medium cream text below: 'Gaano kadalas mo sinasabi iyon?', Next line cream text: 'Deserving ka ng EKSAKTONG gusto mo.', Bold white caps text: 'KUNIN MO ANG GUSTO MO.', Small gold italic text at bottom: 'Huwag nang mag-sana all. Alamin →'"
    }
]

def generate_image(prompt_text, filename):
    out_path = os.path.join(OUTPUT_DIR, filename)
    print(f"Generating {filename}...")
    URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"
    
    data = {"contents": [{"parts": [{"text": prompt_text}]}]}
    json_data = json.dumps(data).encode('utf-8')
    headers = {'Content-Type': 'application/json'}
    req = urllib.request.Request(URL, data=json_data, headers=headers, method='POST')
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            # Added timeout=5 as requested by user previously
            with urllib.request.urlopen(req, timeout=5) as response:
                if response.status == 200:
                    result = json.loads(response.read().decode('utf-8'))
                    if "candidates" in result and len(result["candidates"]) > 0:
                        parts = result["candidates"][0].get("content", {}).get("parts", [])
                        for part in parts:
                            if "inlineData" in part:
                                image_data = base64.b64decode(part["inlineData"]["data"])
                                with open(out_path, "wb") as f:
                                    f.write(image_data)
                                print(f"✅ Saved: {out_path}")
                                return True
                    print(f"❌ No image data in response for {filename}")
                    return False
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait_time = 60 * (attempt + 1)
                print(f"Rate limit. Waiting {wait_time}s...")
                time.sleep(wait_time)
                continue
            else:
                print(f"HTTP Error {e.code}: {e.reason}")
                return False
        except Exception as e:
            print(f"❌ Error for {filename}: {e}")
            return False
    return False

if __name__ == "__main__":
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    for item in prompts:
        out_path = os.path.join(OUTPUT_DIR, item["filename"])
        if os.path.exists(out_path):
            print(f"Skipping {item['filename']} (exists)")
            continue
        
        if generate_image(item["text"], item["filename"]):
            time.sleep(2) # Safe delay
        else:
            print(f"Failed {item['filename']}")
