import os
import json
import base64
import urllib.request
import urllib.error
import time

# Use Built-in TOOL ANTIGRAVITY — DO NOT use API key directly
# Primary: google/gemini-3-pro-image-preview
MODEL_NAME = "gemini-3-pro-image-preview"

OUTPUT_DIR = "/Users/eldragon/git/el/export/src/assets/drelf/generated"

# =============================================================
# DRELF — Ad Copy Framework (PGM: Pain → Gain → Method)
# Target: Wanita Indonesia 35-55 tahun
# Hook: Anti-aging, awet muda, kulit putih cerah glowing
# Kandungan Utama:
#   - 5000mg Marine Collagen  → Kulit kenyal & elastis
#   - 350mg L-Glutathione     → Cerah, anti kusam, anti kusam
#   - Saffron Premium         → Glowing alami dari dalam
#   - Sarang Burung Walet     → Anti-aging, regenerasi sel
# Brand Color:
#   Gold: #C9991A / #B8860B
#   Cream: #EEE5C8
#   White: #FFFFFF
#   Dark Brown: #4A2C0A
# =============================================================

BASE_SCENE = (
    "A realistic Indonesian woman aged 40-45, looking visibly younger with "
    "glowing bright fair white skin (kulit putih cerah bersinar), dewy luminous complexion, "
    "youthful radiance from within. Natural Indonesian facial features — soft face, "
    "slightly almond eyes, warm fair skin. NOT Korean. Wears elegant champagne-gold silk. "
    "Holds white-gold DRELF product box. Luxury marble and cherry blossom background. "
    "Photorealistic high-end beauty ad, magazine quality. "
)

prompts = [
    {
        "filename": "drelf_id_v1_01_awetmuda.png",
        "text": (
            f"Create a 1:1 square premium beauty supplement ad image. Scene: {BASE_SCENE} "
            "She sits at a luxury marble vanity table, soft golden bokeh background. "
            "Upper half: woman glowing closeup. "
            "Bottom half: warm cream-gold semi-transparent overlay with TEXT in EXACT layout: "
            "Top small uppercase gold label: 'DRELF — BEAUTY FROM WITHIN', "
            "Large bold serif dark-gold headline: 'Rahasia Awet Muda di Usia 40+', "
            "Medium dark text listing: "
            "'✦ Collagen 5000mg — Kulit Kenyal Elastis', "
            "'✦ Glutathione 350mg — Cerah & Anti Kusam', "
            "'✦ Saffron Premium — Glowing Alami', "
            "'✦ Sarang Burung Walet — Anti Aging', "
            "Bold brown text: 'PUTIH. CERAH. GLOWING. AWET MUDA.', "
            "Small gold italic CTA: 'Buktikan dalam 30 hari. Order Sekarang →'"
        )
    },
    {
        "filename": "drelf_id_v1_02_kolagen.png",
        "text": (
            f"Create a 1:1 square premium beauty supplement ad image. Scene: {BASE_SCENE} "
            "She stands by a bright airy window, morning golden light, cherry blossom view. "
            "Upper half: woman portrait, soft luminous skin. "
            "Bottom half: cream overlay TEXT in EXACT layout: "
            "Small gold label: 'DRELF — COLLAGEN PREMIUM', "
            "Large bold headline: '5000mg Collagen — Terasa Bedanya dalam 2 Minggu', "
            "Medium cream text: "
            "'Bukan sekedar suplemen biasa.', "
            "'Drelf hadir dengan formula terlengkap:', "
            "'✦ 5000mg Marine Collagen — dosis tertinggi', "
            "'✦ 350mg Glutathione — pemutih alami terkuat', "
            "'✦ Ekstrak Saffron + Sarang Burung Walet', "
            "Bold text: 'KULIT KAMU BISA SEPERTI INI.', "
            "Gold italic CTA: 'Order Drelf Sekarang →'"
        )
    },
    {
        "filename": "drelf_id_v1_03_sebelum_sesudah.png",
        "text": (
            f"Create a 1:1 square premium beauty supplement ad image. Scene: {BASE_SCENE} "
            "She looks radiant in a bright luxury living room, holding a glass of pink collagen drink, "
            "DRELF box nearby on a marble table. Warm editorial lighting. "
            "Upper half: woman glowing editorial shot. "
            "Bottom half: cream-gold overlay TEXT in EXACT layout: "
            "Small gold label: 'DRELF — MINUMAN KECANTIKAN NO.1', "
            "Large bold headline: 'Di Umur 40-an, Kulitnya Makin Muda', "
            "Medium text: "
            "'Rahasianya bukan di skincare.', "
            "'Rahasianya dari DALAM tubuh.', "
            "'✦ Collagen 5000mg → kenyal elastis', "
            "'✦ Glutathione 350mg → putih merata', "
            "'✦ Saffron → glow natural', "
            "'✦ Sarang Walet → regenerasi sel', "
            "Bold text: 'MUDA ITU PILIHAN. DRELF JAWABANNYA.', "
            "Gold italic CTA: 'Mulai Perjalananmu. Order Sekarang →'"
        )
    },
    {
        "filename": "drelf_id_v1_04_pain_hook.png",
        "text": (
            f"Create a 1:1 square premium beauty supplement ad image. Scene: {BASE_SCENE} "
            "She smiles confidently looking into a mirror, reflection shows glowing skin. "
            "Warm dressing table setting, luxury perfume bottles around. "
            "Upper half: woman mirror scene, glowing skin. "
            "Bottom half: cream-gold overlay TEXT in EXACT layout: "
            "Small gold label: 'DRELF — YOU ARE REBORN', "
            "Large bold headline: 'Kulit Kusam di Usia 40? Bukan Takdir.', "
            "Medium text: "
            "'Kusam, keriput, gelap — itu bisa dibalik.', "
            "'Dengan kandungan terlengkap dalam 1 sachet:', "
            "'✦ 5000mg Collagen — fondasi kulit muda', "
            "'✦ 350mg Glutathione — putihkan dari dalam', "
            "'✦ Saffron + Sarang Burung Walet — anti-aging premium', "
            "Bold text: 'KEMBALIKAN KULITMU. SEKARANG.', "
            "Gold italic CTA: 'Coba Drelf 30 Hari. Order →'"
        )
    },
    {
        "filename": "drelf_id_v1_05_kandungan_highlight.png",
        "text": (
            f"Create a 1:1 square premium beauty supplement ad image. Scene: {BASE_SCENE} "
            "Close-up beauty shot, she holds the DRELF sachet near her glowing face, warm smile. "
            "Luxury spa-like setting, white marble and pink flowers. "
            "Upper half: beauty closeup portrait, luminous fair skin. "
            "Bottom half: clean elegant overlay TEXT in EXACT layout: "
            "Small gold label: 'KANDUNGAN UNGGULAN DRELF', "
            "Large bold headline: 'Satu Sachet. Empat Kandungan Premium.', "
            "Four ingredient cards: "
            "'🌟 COLLAGEN 5000mg', "
            "'🌿 GLUTATHIONE 350mg', "
            "'🌺 SAFFRON PREMIUM', "
            "'🕊️ SARANG BURUNG WALET', "
            "Bold text: 'FORMULA AWET MUDA TERLENGKAP DI INDONESIA.', "
            "Gold italic CTA: 'Dapatkan Kulit Impianmu →'"
        )
    },
]


def generate_image(prompt_text, filename):
    out_path = os.path.join(OUTPUT_DIR, filename)
    print(f"Generating {filename}...")
    API_KEY = os.environ.get("GEMINI_API_KEY", "")
    URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"

    data = {"contents": [{"parts": [{"text": prompt_text}]}]}
    json_data = json.dumps(data).encode("utf-8")
    headers = {"Content-Type": "application/json"}
    req = urllib.request.Request(URL, data=json_data, headers=headers, method="POST")

    max_retries = 3
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                if response.status == 200:
                    result = json.loads(response.read().decode("utf-8"))
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
            time.sleep(3)  # Safe delay between generations
        else:
            print(f"Failed {item['filename']}")
