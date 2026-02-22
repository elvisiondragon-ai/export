import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ─── FB PIXEL ────────────────────────────────────────────
import { initFacebookPixelWithLogging, trackViewContentEvent, trackAddToCartEvent } from "@/utils/fbpixel";

// ─── IMAGES ──────────────────────────────────────────────
import heroMain from "@/assets/placeholder_package/hero_section_1_a_premium_rigid_p_13_11zon.jpg";
import heroInset from "@/assets/placeholder_package/hero_section_1_a_premium_rigid_p_1_12_11zon.jpg";
import strip1 from "@/assets/placeholder_package/photo_strip_1_a_busy_global_expo_1_19_11zon.jpg";
import strip2 from "@/assets/placeholder_package/photo_strip_1_a_busy_global_expo_2_20_11zon.jpg";
import strip3 from "@/assets/placeholder_package/photo_strip_1_a_busy_global_expo_3_21_11zon.jpg";
import strip4 from "@/assets/placeholder_package/photo_strip_1_a_busy_global_expo_22_11zon.jpg";
import pain1 from "@/assets/placeholder_package/pain_section_1_a_cheap_generic_t_16_11zon.jpg";
import pain2 from "@/assets/placeholder_package/pain_section_1_a_cheap_generic_t_4_14_11zon.jpg";
import pain3 from "@/assets/placeholder_package/pain_section_1_a_cheap_generic_t_5_15_11zon.jpg";
import pain4 from "@/assets/placeholder_package/pain_section_continuation_1_a_bl_18_11zon.jpg";
import pain5 from "@/assets/placeholder_package/pain_section_continuation_1_a_bl_2_17_11zon.jpg";
import pain6 from "@/assets/placeholder_package/final_placeholders_1_a_topdown_s_5_11zon.jpg";
import solutionMain from "@/assets/placeholder_package/solution_section_1_a_full_glamou_26_11zon.jpg";
import solutionDetail1 from "@/assets/placeholder_package/solution_section_continuation_1__27_11zon.jpg";
import solutionDetail2 from "@/assets/placeholder_package/final_placeholders_1_a_topdown_s_1_4_11zon.jpg";
import compareBefore from "@/assets/placeholder_package/comparison_section_1_a_plain_den_1_1_11zon.jpg";
import compareAfter from "@/assets/placeholder_package/comparison_section_1_a_plain_den_2_11zon.jpg";
import testimonial1 from "@/assets/placeholder_package/testimonials_1_a_successful_busi_1_28_11zon.jpg";
import testimonial2 from "@/assets/placeholder_package/testimonials_1_a_successful_busi_2_29_11zon.jpg";
import testimonial3 from "@/assets/placeholder_package/testimonials_1_a_successful_busi_30_11zon.jpg";
import gallery1 from "@/assets/placeholder_package/gallery_1_a_full_product_line_fl_1_6_11zon.jpg";
import gallery2 from "@/assets/placeholder_package/gallery_1_a_full_product_line_fl_2_7_11zon.jpg";
import gallery3 from "@/assets/placeholder_package/gallery_1_a_full_product_line_fl_3_8_11zon.jpg";
import gallery4 from "@/assets/placeholder_package/gallery_1_a_full_product_line_fl_4_9_11zon.jpg";
import gallery5 from "@/assets/placeholder_package/gallery_1_a_full_product_line_fl_5_10_11zon.jpg";
import gallery6 from "@/assets/placeholder_package/gallery_1_a_full_product_line_fl_11_11zon.jpg";
import pricing1 from "@/assets/placeholder_package/pricing_section_1_a_single_clean_1_23_11zon.jpg";
import pricing2 from "@/assets/placeholder_package/pricing_section_1_a_single_clean_24_11zon.jpg";
import pricing3 from "@/assets/placeholder_package/pricing_section_continuation_a_m_25_11zon.jpg";
import ctaBg from "@/assets/placeholder_package/cta_final_an_atmospheric_aerial__3_11zon.jpg";
import packagev from "@/assets/packagev.mp4";

// ─── TYPES ───────────────────────────────────────────────
interface PlaceholderProps {
  type: "photo" | "video";
  label: string;
  title: string;
  brief: string;
  tags?: string[];
  className?: string;
  star?: boolean;
  src?: string;
  videoSrc?: string;
  style?: React.CSSProperties;
}

interface FeatureItem {
  num: string;
  title: string;
  desc: string;
}

interface PainCard {
  icon: string;
  photoLabel: string;
  photoTitle: string;
  photoBrief: string;
  photoTags: string[];
  heading: string;
  body: string;
  image?: string;
}

interface Testimonial {
  initials: string;
  photoLabel: string;
  photoTitle: string;
  photoBrief: string;
  photoTags: string[];
  quote: string;
  name: string;
  role: string;
  image?: string;
}

interface PricingTier {
  tier: string;
  moq: string;
  unit: string;
  featured?: boolean;
  photoTitle: string;
  photoBrief: string;
  photoTags: string[];
  features: string[];
  image?: string;
}

interface FAQItem {
  q: string;
  a: string;
}

// ─── PLACEHOLDER COMPONENT ───────────────────────────────
function Placeholder({
  type,
  label,
  title,
  brief,
  tags = [],
  className = "",
  star = false,
  src,
  videoSrc,
  style = {},
}: PlaceholderProps) {
  if (type === "photo" && src) {
    return (
      <div className={className} style={{ position: "relative", overflow: "hidden", aspectRatio: "1/1", width: "100%", ...style }}>
        <img 
          src={src} 
          alt={title} 
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
        />
        {star && (
          <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(201,168,76,0.9)", color: "#0A0A08", padding: "2px 8px", fontSize: "0.6rem", fontWeight: 700, borderRadius: 2 }}>
            FEATURED
          </div>
        )}
      </div>
    );
  }

  if (type === "video" && videoSrc) {
    return (
      <div className={className} style={{ position: "relative", overflow: "hidden", background: "#000", ...style }}>
        <video 
          src={videoSrc} 
          controls 
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
        />
      </div>
    );
  }

  return (
    <div
      className={`ph ${type === "video" ? "ph-video" : ""} ${className}`}
      style={{
        background: "#1A1A14",
        border: "1.5px dashed rgba(201,168,76,0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6rem",
        position: "relative",
        overflow: "hidden",
        padding: "1.2rem",
        backgroundImage:
          "repeating-linear-gradient(-45deg,transparent,transparent 14px,rgba(201,168,76,0.025) 14px,rgba(201,168,76,0.025) 15px)",
        aspectRatio: type === "photo" ? "1/1" : "auto",
        ...style,
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: "1.8rem", position: "relative", zIndex: 1 }}>
        {type === "video" ? (
          <span
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1.5px solid #C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9A84C",
              fontSize: "1rem",
              paddingLeft: 4,
            }}
          >
            ▶
          </span>
        ) : (
          "📷"
        )}
      </span>

      {/* Type badge */}
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#C9A84C",
          background: "rgba(201,168,76,0.1)",
          padding: "0.2rem 0.65rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {type === "photo" ? "📷" : "🎬"} {label}
        {star ? " ⭐" : ""}
      </span>

      {/* Title */}
      <p
        style={{
          fontWeight: 600,
          fontSize: "0.82rem",
          color: "#F8F4EC",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </p>

      {/* Brief */}
      <p
        style={{
          fontSize: "0.7rem",
          color: "#888878",
          textAlign: "center",
          lineHeight: 1.55,
          maxWidth: 300,
          position: "relative",
          zIndex: 1,
        }}
      >
        {brief}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "monospace",
                fontSize: "0.57rem",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "rgba(201,168,76,0.55)",
                padding: "0.12rem 0.45rem",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── REVEAL HOOK ─────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────
const FEATURES: FeatureItem[] = [
  { num: "01", title: "Export-Certified Materials", desc: "FSC-certified boards, food-safe inks, REACH-compliant coatings. Passes EU, US, and ASEAN import standards out of the box." },
  { num: "02", title: "Premium Print Finishes", desc: "Soft-touch matte, spot UV, hot foil stamping, emboss/deboss — finishes that make your product feel luxury before it's unwrapped." },
  { num: "03", title: "Structural Engineering for Global Transit", desc: "Tested for 14,000 km drop, humidity, and stacking loads. Your boxes arrive in the same condition they left our factory." },
  { num: "04", title: "Low MOQ — Start from 50 Pcs", desc: "No need to over-commit your cash flow. Test a new market with just 50 units of fully custom, branded packaging." },
  { num: "05", title: "Full Branding & Dieline Support", desc: "Don't have a designer? Our in-house team creates print-ready artwork that meets international retail shelf standards." },
  { num: "06", title: "14-Day Production Turnaround", desc: "Fast enough to meet urgent buyer timelines. Sample approval in 3 days, bulk in 14. No more missed export windows." },
];

const PAINS: PainCard[] = [
  {
    icon: "😶", heading: '"We Decided to Go with Another Supplier"',
    body: "Your samples arrive at the buyer's office. The product looks great — but the box is dented, faded, and feels like a grocery bag. Decision made before they even tested it.",
    photoLabel: "PAIN FOTO 1", photoTitle: "Box Murahan di Meja Buyer",
    photoBrief: "Kotak coklat polos, penyok sedikit, di atas meja rapat. Cold tone, kesan murahan.",
    photoTags: ["Cold light", "Flat angle", "No branding"],
    image: pain1,
  },
  {
    icon: "📦", heading: "Cheap Box = Cheap Product",
    body: "Buyers subconsciously price your product by how it's packaged. A $40 item in a $2 box gets negotiated down to $22. Your premium product needs premium armor.",
    photoLabel: "PAIN FOTO 2", photoTitle: "Negosiasi Harga Alot",
    photoBrief: "Tangan buyer menunjuk angka lebih rendah di dokumen. Suasana tegang, warna dingin.",
    photoTags: ["Tense mood", "Cold tone", "Documents"],
    image: pain2,
  },
  {
    icon: "💸", heading: '"Premium Packaging is Too Expensive for Me"',
    body: "You think custom boxes require 10,000 pcs minimum order. So you settle for generic. Meanwhile competitors land deals with 200 pcs of stunning branded packaging.",
    photoLabel: "PAIN FOTO 3", photoTitle: "Gudang Box Polos Tanpa Brand",
    photoBrief: "Ribuan box generik bertumpuk di gudang, tanpa identitas. Terasa anonim dan murah.",
    photoTags: ["Warehouse", "Generic boxes", "No branding"],
    image: pain3,
  },
  {
    icon: "🌍", heading: "Export Standards You Don't Know You're Failing",
    body: "International markets (EU, USA, Japan) have strict expectations on labeling, material safety, and presentation. Cheap packaging fails silently — until your goods get returned.",
    photoLabel: "PAIN FOTO 4", photoTitle: "Paket Dikembalikan / Customs",
    photoBrief: 'Stiker merah "REJECTED" or "RETURNED" di atas paket. Nuansa merah dan frustrasi.',
    photoTags: ["Red mood", "Customs", "Rejected sticker"],
    image: pain4,
  },
  {
    icon: "🔁", heading: "No Repeat Orders",
    body: "First-time buyers don't reorder when the unboxing experience is forgettable. Premium packaging creates the emotional hook that turns a one-time buyer into a loyal distributor.",
    photoLabel: "PAIN FOTO 5", photoTitle: "Email Inbox Sepi — Tidak Ada Order",
    photoBrief: "Layar laptop menampilkan inbox kosong. Ekspresi frustrasi pemilik bisnis.",
    photoTags: ["Empty inbox", "Frustrated", "Laptop screen"],
    image: pain5,
  },
  {
    icon: "📉", heading: "Your Brand Value Tanks Overseas",
    body: "You've worked years to build your product. Don't let the last 5% — the packaging — destroy decades of brand equity the moment it lands at an overseas retailer's shelf.",
    photoLabel: "PAIN FOTO 6", photoTitle: "Produk Tenggelam di Rak Ritel",
    photoBrief: "Box polos terjepit di antara produk kompetitor yang premium dan eye-catching. Kalah visual.",
    photoTags: ["Retail shelf", "Lost among competitors", "Overlooked"],
    image: pain6,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "RK", name: "Reza Kusuma", role: "Export Manager · Cosmetics Brand, Indonesia",
    quote: "We switched before a trade show in Dubai. The buyer said our booth looked like a luxury brand — we closed a $120K deal that week. The packaging paid for itself 50x over.",
    photoLabel: "FOTO CLIENT 1", photoTitle: "Reza di Trade Show Dubai",
    photoBrief: "Client berdiri bangga di booth pameran internasional. Box premium terlihat jelas di display belakang. Candid, profesional, happy.",
    photoTags: ["Trade show", "Candid", "Box in BG"],
    image: testimonial1,
  },
  {
    initials: "SN", name: "Sarah Nguyen", role: "Founder · Artisanal Food Brand, Vietnam",
    quote: "I ordered 100 pcs as a test for the UK market. We sold out in 3 weeks. Now we order 500 pcs every month. The low MOQ gave me the courage to start.",
    photoLabel: "FOTO CLIENT 2", photoTitle: "Produk Sarah di Rak Ritel UK",
    photoBrief: "Box artisanal food brand berdiri menonjol di rak toko premium UK. Shot dari sudut pembeli.",
    photoTags: ["UK retail shelf", "Point of sale", "Product pops"],
    image: testimonial2,
  },
  {
    initials: "AP", name: "Ahmad Pratama", role: "CEO · Herbal Supplement Company, Malaysia",
    quote: "Our German distributor rejected two previous suppliers over packaging. When we showed them our new samples, they signed a 12-month contract on the spot.",
    photoLabel: "FOTO CLIENT 3", photoTitle: "Penandatanganan Kontrak",
    photoBrief: "Momen handshake atau pena di atas dokumen kontrak. Box premium terletak di meja meeting.",
    photoTags: ["Meeting room", "Contract sign", "Box on table"],
    image: testimonial3,
  },
];

const PRICING: PricingTier[] = [
  {
    tier: "Starter", moq: "50", unit: "Minimum Pcs · Market Testing",
    photoTitle: "Single Box, Clean & Confident",
    photoBrief: "1 box berdiri tegak. Background putih/abu bersih. Sederhana, reliable, profesional.",
    photoTags: ["White BG", "Single box", "Clean"],
    features: ["Custom size & structure", "Full-color CMYK print", "Matte or gloss lamination", "1 free dieline revision", "3-day sample approval", "14-day production", "Export-grade material"],
    image: pricing1,
  },
  {
    tier: "Growth", moq: "200", unit: "Minimum Pcs · Export Ready", featured: true,
    photoTitle: "Box dengan Foil + Soft Touch — Full Glamour",
    photoBrief: "Box terbaik Anda. Foil gold berkilau, soft-touch matte. Dark dramatic background. Foto paling menjual.",
    photoTags: ["Dark BG", "Gold foil", "Most premium"],
    features: ["Everything in Starter", "Spot UV or soft-touch matte", "Hot foil stamping option", "Emboss / deboss option", "Unlimited design revisions", "In-house brand design support", "Transit drop-test certificate", "EU & US material compliance"],
    image: pricing2,
  },
  {
    tier: "Scale", moq: "500+", unit: "Minimum Pcs · Global Retail",
    photoTitle: "Multi-SKU Line Display",
    photoBrief: "3 box berbeda ukuran satu brand, ditata seperti display boutique. Menunjukkan skala dan konsistensi.",
    photoTags: ["3 box sizes", "Boutique display", "Brand consistent"],
    features: ["Everything in Growth", "Volume pricing discount", "Retail shelf-ready spec", "Multi-SKU production runs", "Dedicated account manager", "Priority 10-day production", "Warehousing & phased delivery"],
    image: pricing3,
  },
];

const FAQS: FAQItem[] = [
  { q: "Why is your MOQ only 50 pcs? Is quality compromised?", a: "Not at all. We invested in digital-offset hybrid printing to deliver premium quality at low quantities. 50 pcs gets you the same materials, finishes, and engineering as a 10,000 pc order — just without the inventory risk." },
  { q: "How much more does premium packaging cost vs. generic?", a: "Typically 2–4x the per-unit cost. But premium packaging allows you to raise your product's selling price by 15–40%, and it directly impacts buyer confidence and reorder rates. The ROI is not in the box — it's in the deals you close." },
  { q: "Do you help with design if I don't have a designer?", a: "Yes. Our in-house design team creates print-ready artwork optimized for international retail. We include brand consulting, dieline creation, and pre-press review — no additional charge for Growth and Scale packages." },
  { q: "What countries do you ship to?", a: "We ship globally — EU, US, UK, Japan, Australia, Middle East, and Southeast Asia. We handle export documentation and advise on import labeling requirements for your target market." },
  { q: "How do I prove quality before committing to bulk?", a: "Order a pre-production sample (1–3 pcs) for approval before your bulk run. Sample takes 3–5 business days. You review, approve, and then we proceed. No surprises on delivery day." },
];

// ─── CSS VARS (injected as style tag) ────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --dark: #0A0A08;
    --dark2: #141410;
    --dark3: #1E1E18;
    --cream: #F8F4EC;
    --dim: #888878;
    --red: #C0392B;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; width: 100vw; }

  body {
    background: var(--dark);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    width: 100vw;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.35;
  }

  /* Prevent side scroll on mobile */
  @media (max-width: 768px) {
    .mobile-px { padding-left: 1rem !important; padding-right: 1rem !important; }
    .mobile-gap { gap: 2rem !important; }
    .mobile-stack { display: flex !important; flex-direction: column !important; grid-template-columns: 1fr !important; }
    .mobile-w-95 { width: 95% !important; max-width: 95% !important; margin-left: auto !important; margin-right: auto !important; }
    .mobile-center { text-align: center !important; align-items: center !important; justify-content: center !important; }
    .mobile-hide { display: none !important; }
    .mobile-table-scroll { display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    
    h1, h2, h3, p, div { max-width: 100% !important; overflow-wrap: break-word; }
    section { padding-left: 1rem !important; padding-right: 1rem !important; width: 100vw !important; overflow: hidden; }
  }
`;

// ─── SHARED STYLE HELPERS ────────────────────────────────
const S = {
  playfair: { fontFamily: "'Playfair Display', serif" } as React.CSSProperties,
  mono: { fontFamily: "'DM Mono', monospace" } as React.CSSProperties,
  gold: { color: "#C9A84C" } as React.CSSProperties,
  dim: { color: "#888878" } as React.CSSProperties,
  cream: { color: "#F8F4EC" } as React.CSSProperties,

  sectionLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    color: "#C9A84C",
    marginBottom: "3.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  } as React.CSSProperties,

  h2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2rem,4vw,3.8rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    maxWidth: 700,
    marginBottom: "1.5rem",
  } as React.CSSProperties,

  btnPrimary: {
    background: "#C9A84C",
    color: "#0A0A08",
    padding: "1rem 2.5rem",
    fontWeight: 500,
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
    transition: "all 0.25s",
    textAlign: "center" as const,
  } as React.CSSProperties,

  btnGhost: {
    color: "#C9A84C",
    border: "1px solid rgba(201,168,76,0.4)",
    padding: "1rem 2.5rem",
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    textDecoration: "none",
    display: "inline-block",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.25s",
    textAlign: "center" as const,
  } as React.CSSProperties,
};

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function PremiumExportLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState({
    quantity: "",
    country: "",
    business: "",
    days: ""
  });

  const PIXEL_ID = "1449012769558475";

  useEffect(() => {
    initFacebookPixelWithLogging(PIXEL_ID);
    trackViewContentEvent(
      { content_name: "PremiumBox Export Landing", content_category: "Landing Page" },
      undefined,
      PIXEL_ID
    );
  }, []);

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fire AddToCart Pixel Event
    trackAddToCartEvent(
      { content_name: "Ask The Sales (WhatsApp)", value: 199, currency: "USD" },
      undefined,
      PIXEL_ID
    );

    const message = `Hello, I'm interested in PremiumBox Export.\n\n` +
      `1. How many pcs you plan to order? ${surveyData.quantity}\n` +
      `2. What country you are in? ${surveyData.country}\n` +
      `3. What business you are now? ${surveyData.business}\n` +
      `4. How many days you expect the package are finish? ${surveyData.days}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/62895325633487?text=${encodedMessage}`, '_blank');
    setShowSurvey(false);
  };

  return (
    <>
      <style>{globalStyle}</style>

      {/* ── SURVEY DIALOG ── */}
      <Dialog open={showSurvey} onOpenChange={setShowSurvey}>
        <DialogContent className="sm:max-w-[425px] bg-[#141410] border-[#C9A84C]/20 text-[#F8F4EC]">
          <DialogHeader>
            <DialogTitle style={S.playfair} className="text-2xl text-[#C9A84C]">Help Your Requirement</DialogTitle>
            <DialogDescription className="text-[#888878]">
              Please fill out this quick survey so we can better assist you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWhatsAppRedirect} className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">1. How many pcs you plan to order?</Label>
              <Select onValueChange={(v) => setSurveyData({ ...surveyData, quantity: v })} required>
                <SelectTrigger className="bg-[#1E1E18] border-white/10 text-white">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E18] border-white/10 text-white">
                  <SelectItem value="50 pcs">a. 50 pcs</SelectItem>
                  <SelectItem value="100 pcs +">b. 100 pcs +</SelectItem>
                  <SelectItem value="500 pcs ++">c. 500 pcs ++</SelectItem>
                  <SelectItem value="1000 pcs +++">d. 1000 pcs +++</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">2. What country you are in?</Label>
              <Input 
                className="bg-[#1E1E18] border-white/10 text-white" 
                placeholder="Your country" 
                value={surveyData.country}
                onChange={(e) => setSurveyData({ ...surveyData, country: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">3. What business you are now?</Label>
              <Input 
                className="bg-[#1E1E18] border-white/10 text-white" 
                placeholder="e.g. Cosmetics, Food, etc." 
                value={surveyData.business}
                onChange={(e) => setSurveyData({ ...surveyData, business: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">4. How many days you expect the package are finish?</Label>
              <Input 
                className="bg-[#1E1E18] border-white/10 text-white" 
                placeholder="e.g. 14 days" 
                value={surveyData.days}
                onChange={(e) => setSurveyData({ ...surveyData, days: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#C9A84C] hover:bg-[#E8C96A] text-[#0A0A08] font-bold uppercase tracking-widest py-6">
              Continue to WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── NAV ── */}
      <nav 
        className="mobile-px"
        style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.4rem 4rem",
          background: "linear-gradient(to bottom, rgba(10,10,8,0.95), transparent)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div style={{ ...S.mono, fontSize: "0.85rem", letterSpacing: "0.25em", ...S.gold, textTransform: "uppercase" }}>
          PremiumBox · Export
        </div>
        <button onClick={() => setShowSurvey(true)} style={S.btnPrimary} className="px-4 py-2 text-xs">Ask The Sales</button>
      </nav>

      {/* ── HERO ── */}
      <section 
        className="mobile-px mobile-stack mobile-gap"
        style={{
          position: "relative", zIndex: 1, minHeight: "100vh",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          alignItems: "center", padding: "8rem 4rem 4rem", gap: "4rem",
          overflow: "hidden",
        }}
      >
        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column" }} className="mobile-w-95 mobile-center">
          <p className="mobile-center" style={{ ...S.mono, fontSize: "0.72rem", letterSpacing: "0.3em", ...S.gold, textTransform: "uppercase", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="mobile-hide" style={{ display: "block", width: "3rem", height: 1, background: "#C9A84C" }} />
            Boutique Quality, Industrial Speed
          </p>
          <h1 className="mobile-center" style={{ ...S.playfair, fontSize: "clamp(2.8rem,4.5vw,5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "2rem" }}>
            Get Your Premium Brand Prototype.<br />
            <em style={S.gold}>50 Luxury Boxes</em>, Delivered to Your Door for $199.
          </h1>
          <p className="mobile-center" style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#BBAA88", maxWidth: 500, marginBottom: "3rem" }}>
            Delivered to your door. ISO Standard Material. 100% Export-Ready or Money Back. Don't let a flimsy box cost you the deal.
          </p>
          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }} className="mobile-center">
            <button onClick={() => setShowSurvey(true)} style={S.btnPrimary}>Ask The Sales</button>
            <a href="#compare" style={S.btnGhost}>See the Difference</a>
          </div>
          <span style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", ...S.gold, padding: "0.4rem 1rem", ...S.mono, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1.5rem", display: "inline-block" }}>
            ✦ Boutique Quality, Industrial Speed · Worldwide Shipping
          </span>
        </div>

        {/* Hero Visuals */}
        <div style={{ position: "relative", height: "75vh" }} className="mobile-w-95">
          {/* ── REPLACE: src="./images/hero-main.jpg" ── */}
          <Placeholder
            type="photo" label="FOTO HERO UTAMA"
            title="Box Premium Terbuka — Produk Tersaji"
            brief="Box luxury terbuka 45°, produk di dalam tertata rapi. Meja marmer hitam. Rim light gold dari atas-belakang. Background gelap, dramatic, mewah."
            tags={["Dark marble BG", "45° angle", "Rim light gold", "Product inside"]}
            className="hero-ph-main"
            style={{ width: "100%", height: "83%" } as React.CSSProperties}
            src={heroMain}
          />
          {/* ── REPLACE: src="./images/hero-inset.jpg" ── */}
          <Placeholder
            type="photo" label="FOTO DETAIL INSET"
            title="Macro Foil Gold Logo"
            brief="Close-up logo hot foil stamp berkilau. Bokeh background. Menunjukkan premium finish."
            style={{ position: "absolute", bottom: 0, left: "-2rem", width: "52%", border: "3px solid #0A0A08" } as React.CSSProperties}
            src={heroInset}
          />
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div 
        className="mobile-stack"
        style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {[
          { label: "STRIP FOTO 1", title: "Pelabuhan / Kargo", brief: "Tangan memegang box di depan kontainer. Nuansa export global.", src: strip1 },
          { label: "STRIP FOTO 2", title: "Momen Unboxing", brief: "Tangan bisnis membuka box perlahan. Ekspresi impress, candid.", src: strip2 },
          { label: "STRIP FOTO 3", title: "Rak Ritel / Trade Show", brief: "Box berjejer di rak toko premium atau booth pameran internasional.", src: strip3 },
          { label: "STRIP FOTO 4", title: "Lantai Produksi", brief: "Mesin cetak modern, suasana pabrik bersih dan high-tech.", src: strip4 },
        ].map((p) => (
          <Placeholder key={p.label} type="photo" label={p.label} title={p.title} brief={p.brief}
            style={{ width: "100%" } as React.CSSProperties} src={p.src} />
        ))}
      </div>

      {/* ── PROOF STRIP ── */}
      <div 
        className="mobile-px mobile-gap"
        style={{ position: "relative", zIndex: 1, background: "#C9A84C", padding: "1.4rem 4rem", display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}
      >
        {[["50+", "Countries Shipped"], ["2,400+", "Brands Served"], ["MOQ 50", "Pcs — No Minimum Trap"], ["14", "Days Production"]].map(([num, label], i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{ ...S.playfair, fontSize: "2rem", fontWeight: 900, color: "#0A0A08", lineHeight: 1 }}>{num}</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(10,10,8,0.7)" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── PAIN SECTION ── */}
      <section 
        id="pain" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#0D0D0A", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "7rem 4rem" }}
      >
        <Reveal><p style={S.sectionLabel}>The Real Problem</p></Reveal>
        <Reveal delay={80}><h2 style={S.h2}>Why Are Global Buyers<br />Ghosting You?</h2></Reveal>
        <Reveal delay={160}><p style={{ ...S.dim, maxWidth: 560, lineHeight: 1.8, marginBottom: "4rem", fontSize: "1.05rem" }}>It's not your product quality. It might be your packaging. Here's what cheap boxes are silently costing you.</p></Reveal>

        <Reveal>
          <div 
            className="mobile-stack"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {PAINS.map((card) => (
              <div key={card.heading} style={{ background: "#141410", position: "relative", overflow: "hidden" }} className="mobile-w-95">
                {/* ── REPLACE: <img src={`./images/${card.photoLabel.toLowerCase().replace(/ /g,'-')}.jpg`} /> ── */}
                <Placeholder type="photo" label={card.photoLabel} title={card.photoTitle} brief={card.photoBrief} tags={card.photoTags}
                  style={{ width: "100%" } as React.CSSProperties} src={card.image} />
                <div style={{ padding: "2rem 2.2rem 2.5rem" }}>
                  <span style={{ fontSize: "1.8rem", marginBottom: "1rem", display: "block" }}>{card.icon}</span>
                  <h3 style={{ ...S.playfair, fontSize: "1.15rem", marginBottom: "0.7rem", fontWeight: 700 }}>{card.heading}</h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.7, ...S.dim }}>{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section 
        id="solution" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, padding: "8rem 4rem" }}
      >
        <div 
          className="mobile-stack mobile-gap"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}
        >
          <div style={{ position: "sticky", top: "7rem" }} className="mobile-w-95">
            <Reveal><p style={S.sectionLabel}>Our Solution</p></Reveal>
            <Reveal delay={80}>
              <h2 style={{ ...S.playfair, fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem" }}>
                Export-Grade Packaging<br />Built to <em style={S.gold}>Win Deals</em>
              </h2>
            </Reveal>
            <Reveal delay={160}><p style={{ ...S.dim, lineHeight: 1.85, marginBottom: "2rem" }}>We engineer packaging that sells. Every structural choice, every print finish, every material spec is designed to make global buyers say yes.</p></Reveal>
            <Reveal delay={200}><button onClick={() => setShowSurvey(true)} style={S.btnPrimary}>Ask The Sales →</button></Reveal>

            <Reveal delay={240}>
              <div style={{ marginTop: "2.5rem" }}>
                {/* ── REPLACE: src="./images/solution-hero.jpg" ── */}
                <Placeholder type="photo" label="SOLUTION FOTO UTAMA" title="Box Terbuka — Full Glamour Shot"
                  brief="Box landscape terbuka penuh, produk tertata indah. Background hitam pekat, rim light tipis kiri-atas. Foto terbaik Anda."
                  tags={["Black BG", "Landscape open", "Full product"]}
                  style={{ width: "100%" } as React.CSSProperties} src={solutionMain} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginTop: "0.6rem" }}>
                  <Placeholder type="photo" label="DETAIL 1" title="Tekstur Soft-Touch Matte" brief="Jari menyentuh permukaan matte. Sensory, macro." style={{ width: "100%" } as React.CSSProperties} src={solutionDetail1} />
                  <Placeholder type="photo" label="DETAIL 2" title="Hot Foil Stamp Berkilau" brief="Macro logo foil, light flare kecil mengikuti kontur logo." style={{ width: "100%" } as React.CSSProperties} src={solutionDetail2} />
                </div>
              </div>
            </Reveal>
          </div>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={i * 60}>
                <li style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", transition: "all 0.3s" }}>
                  <span style={{ ...S.mono, fontSize: "0.7rem", ...S.gold, letterSpacing: "0.1em", minWidth: "2.5rem", paddingTop: "0.1rem" }}>{f.num}</span>
                  <div>
                    <h4 style={{ fontWeight: 500, marginBottom: "0.4rem", fontSize: "1rem" }}>{f.title}</h4>
                    <p style={{ fontSize: "0.88rem", ...S.dim, lineHeight: 1.65 }}>{f.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#0D0D0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "7rem 4rem" }}
      >
        <div 
          className="mobile-stack mobile-gap"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
        >
          <div className="mobile-w-95">
            {/* ── REPLACE: <video src="./videos/brand-film.mp4" /> ── */}
            <Placeholder type="video" label="VIDEO UTAMA — BRAND FILM" title="From Raw Material to Global Deal"
              brief="60–90 detik. Board kosong → desain → foil → cutting → box jadi → dikirim → buyer puas. No voiceover. Musik: cinematic ambient orchestral."
              tags={["60–90 detik", "No voiceover", "Music driven", "Slow-mo accents"]}
              style={{ aspectRatio: "9/16", width: "100%", height: "auto", maxWidth: "450px", margin: "0 auto" } as React.CSSProperties} videoSrc={packagev} />
          </div>

          <div>
            <Reveal><p style={S.sectionLabel}>Watch It Come to Life</p></Reveal>
            <Reveal delay={80}>
              <h2 style={{ ...S.playfair, fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem" }}>
                From Raw Board<br />to <em style={S.gold}>Deal-Winning</em><br />Masterpiece.
              </h2>
            </Reveal>
            <Reveal delay={160}><p style={{ ...S.dim, lineHeight: 1.85, marginBottom: "2rem" }}>See exactly how your packaging is engineered — every cut, every press, every finish — built to make global buyers take notice.</p></Reveal>
            <Reveal delay={200}><button onClick={() => setShowSurvey(true)} style={S.btnGhost}>Ask The Sales →</button></Reveal>
          </div>
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section 
        id="compare" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#0D0D0A", padding: "8rem 4rem" }}
      >
        <Reveal><p style={S.sectionLabel}>Side by Side</p></Reveal>
        <Reveal delay={80}><h2 style={S.h2}>Standard Box vs.<br />Premium Export Package</h2></Reveal>

        {/* Before / After */}
        <Reveal delay={160}>
          <div 
            className="mobile-stack mobile-gap"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", margin: "3rem 0 5rem" }}
          >
            {[
              { bad: true, label: "✗ Cheap Generic Box", ph: "BEFORE FOTO", title: "Generic Brown Kraft Box, No Branding", brief: "Box kraft coklat polos, tanpa logo, penyok. Pencahayaan flat dan cold. Shot dari angle SAMA dengan foto After.", tags: ["Cold light", "Flat angle", "No branding", "Slightly dented"], src: compareBefore },
              { bad: false, label: "✦ Premium Export Package", ph: "AFTER FOTO ⭐", title: "Premium Branded Box — Same Product, Different World", brief: "Box branded dengan foil gold, soft-touch matte, emboss logo. Pencahayaan warm dramatic. Angle persis sama dengan Before.", tags: ["Warm dramatic light", "Same angle as Before", "Gold foil visible"], src: compareAfter },
            ].map(({ bad, label, ph, title, brief, tags, src }) => (
              <div key={label} className="mobile-w-95">
                <div style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", padding: "0.55rem", color: bad ? "#C0392B" : "#C9A84C", background: bad ? "rgba(192,57,43,0.1)" : "rgba(201,168,76,0.1)" }}>{label}</div>
                <Placeholder type="photo" label={ph} title={title} brief={brief} tags={tags} style={{ width: "100%" } as React.CSSProperties} src={src} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Table */}
        <Reveal>
          <div className="mobile-table-scroll">
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr>
                  {["Feature", "Generic Cheap Box", "✦ Premium Export Package"].map((h, i) => (
                    <th key={h} style={{ padding: "1.2rem 2rem", textAlign: "left", fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: `1px solid ${i === 2 ? "#C9A84C" : "rgba(255,255,255,0.1)"}`, background: i === 2 ? "rgba(201,168,76,0.1)" : "transparent", color: i === 2 ? "#C9A84C" : "#F8F4EC" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["First Impression at Buyer Desk", "✗ Forgettable", "✓ Stops them cold"],
                  ["Material Quality", "✗ Low-grade kraft / single ply", "✓ FSC board, premium weight"],
                  ["Print Finish", "✗ Flat offset, fades fast", "✓ Soft-touch, foil, spot UV"],
                  ["Export / Import Compliance", "✗ Unknown — risky", "✓ EU, US, ASEAN certified"],
                  ["Transit Durability", "✗ Dents, tears, collapses", "✓ Drop & humidity tested"],
                  ["Brand Storytelling", "✗ None — just a box", "✓ Full custom design & branding"],
                  ["MOQ", "✗ Often 1,000–5,000 pcs", "✓ As low as 50 pcs"],
                  ["Negotiating Power", "✗ Buyers lowball your price", "✓ Commands premium pricing"],
                  ["Repeat Orders", "✗ Low — experience is flat", "✓ High — unboxing creates loyalty"],
                ].map(([feat, bad, good]) => (
                  <tr key={feat}>
                    <td style={{ padding: "1rem 2rem", fontSize: "0.88rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#888878" }}>{feat}</td>
                    <td style={{ padding: "1rem 2rem", fontSize: "0.92rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#BBAA88" }}><span style={{ color: "#C0392B" }}>✗</span> {bad.replace("✗ ", "")}</td>
                    <td style={{ padding: "1rem 2rem", fontSize: "0.92rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(201,168,76,0.05)", color: "#E8C96A", fontWeight: 500 }}><span style={{ color: "#4CAF50" }}>✓</span> {good.replace("✓ ", "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section 
        id="testimonials" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, padding: "8rem 4rem" }}
      >
        <Reveal><p style={S.sectionLabel}>What Exporters Say</p></Reveal>
        <Reveal delay={80}><h2 style={S.h2}>Real Results from<br />Real Exporters</h2></Reveal>
        <div 
          className="mobile-stack mobile-gap"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem", marginTop: "4rem" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div style={{ background: "#1E1E18", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }} className="mobile-w-95">
                {/* ── REPLACE: <img src={`./images/${t.initials.toLowerCase()}.jpg`} /> ── */}
                <Placeholder type="photo" label={t.photoLabel} title={t.photoTitle} brief={t.photoBrief} tags={t.photoTags}
                  style={{ width: "100%", borderBottom: "1px solid rgba(201,168,76,0.12)" } as React.CSSProperties} src={t.image} />
                <div style={{ padding: "2rem 2.2rem" }}>
                  <div style={{ ...S.playfair, fontSize: "4.5rem", color: "rgba(201,168,76,0.15)", lineHeight: 0.5, userSelect: "none" }}>"</div>
                  <p style={{ fontSize: "0.93rem", lineHeight: 1.8, color: "#CCBFA0", paddingTop: "0.8rem", marginBottom: "1.8rem" }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.4rem" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#0A0A08", fontSize: "0.85rem", flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: "0.88rem", marginBottom: "0.2rem" }}>{t.name}</p>
                      <p style={{ fontSize: "0.75rem", ...S.dim }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#0A0A08", padding: "6rem 4rem" }}
      >
        <Reveal><p style={S.sectionLabel}>Our Work</p></Reveal>
        <Reveal delay={80}><h2 style={S.h2}>Packaging That<br />Commands <em style={S.gold}>Attention.</em></h2></Reveal>
        <Reveal delay={160}>
          <div 
            className="mobile-stack mobile-gap"
            style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "0.7rem", marginTop: "3rem" }}
          >
            {[
              { style: { gridColumn: "1 / 6", gridRow: "1" }, label: "GALLERY 1 — HERO SHOT ⭐", title: "Full Product Line Flatlay", brief: "3–5 box dari 1 brand ditata overhead di marmer hitam. Foto terbesar dan paling impactful. Harus yang paling WOW.", tags: ["Overhead flatlay", "Black marble", "Multi-box"], src: gallery1 },
              { style: { gridColumn: "6 / 9", gridRow: "1" }, label: "GALLERY 2", title: "Emboss Texture Detail", brief: "Cahaya grazing dari samping pada permukaan emboss. Tekstur terlihat tiga dimensi dan premium.", tags: ["Grazing light", "Macro", "Emboss"], src: gallery2 },
              { style: { gridColumn: "9 / 13", gridRow: "1 / 3" }, label: "GALLERY 3 — PORTRAIT", title: "Stacked Luxury Boxes", brief: "4–6 box berbeda ukuran ditumpuk elegan secara vertikal. Backlit soft dari belakang. Kesan editorial magazine.", tags: ["Portrait", "Stacked", "Backlit"], src: gallery3 },
              { style: { gridColumn: "1 / 4", gridRow: "2" }, label: "GALLERY 4", title: "Spot UV Contrast", brief: "Cahaya miring 45° membuat area spot UV mengkilap terlihat jelas vs bagian matte.", tags: ["45° light", "UV vs matte", "High contrast"], src: gallery4 },
              { style: { gridColumn: "4 / 6", gridRow: "2" }, label: "GALLERY 5", title: "Export-Ready Packaging", brief: 'Box premium di dalam outer carton bertuliskan "EXPORT". Label destination country visible. Siap global.', tags: ["Outer carton", "Export label", "Global"], src: gallery5 },
              { style: { gridColumn: "6 / 9", gridRow: "2" }, label: "GALLERY 6", title: "Color Variant Fan-Out", brief: "5–6 box warna berbeda dari 1 brand disebar seperti fan. Menunjukkan fleksibilitas desain.", tags: ["Fan layout", "Multiple colors", "Same brand"], src: gallery6 },
            ].map((g) => (
              <Placeholder key={g.label} type="photo" label={g.label} title={g.title} brief={g.brief} tags={g.tags}
                className="mobile-w-95"
                style={g.style as React.CSSProperties} src={g.src} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PRICING ── */}
      <section 
        id="pricing" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#0D0D0A", padding: "8rem 4rem" }}
      >
        <Reveal><p style={S.sectionLabel}>Packages</p></Reveal>
        <Reveal delay={80}><h2 style={S.h2}>Start Small.<br />Scale Confidently.</h2></Reveal>
        <Reveal delay={160}>
          <div 
            className="mobile-stack mobile-gap"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", marginTop: "4rem", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}
          >
            {PRICING.map((p) => (
              <div key={p.tier} style={{ padding: "3rem 2.5rem", borderRight: "1px solid rgba(255,255,255,0.08)", position: "relative", background: p.featured ? "linear-gradient(160deg,rgba(201,168,76,0.1) 0%,rgba(201,168,76,0.03) 100%)" : "transparent", ...(p.featured ? { borderLeft: "1px solid rgba(201,168,76,0.3)", borderRight: "1px solid rgba(201,168,76,0.3)", margin: "-1px" } : {}) }} className="mobile-w-95">
                {p.featured && (
                  <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "#C9A84C", color: "#0A0A08", fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.35rem 1.2rem", fontWeight: 500 }}>Most Popular</div>
                )}
                <p style={{ ...S.mono, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", ...S.dim, marginBottom: "1.5rem", marginTop: p.featured ? "2rem" : "0.5rem" }}>{p.tier}</p>
                <div style={{ ...S.playfair, fontSize: "2.8rem", fontWeight: 900, ...S.gold, lineHeight: 1, marginBottom: "0.3rem" }}>{p.moq === "50" ? "$199" : p.moq}</div>
                <p style={{ fontSize: "0.8rem", ...S.dim, letterSpacing: "0.1em", marginBottom: "1.8rem" }}>{p.moq === "50" ? "Prototypes Package · 50 Pcs" : p.unit}</p>

                {/* ── REPLACE with <img src={`./images/pricing-${p.tier.toLowerCase()}.jpg`} /> ── */}
                <Placeholder type="photo" label={`PACKAGE FOTO — ${p.tier.toUpperCase()}`} title={p.photoTitle} brief={p.photoBrief}
                  tags={p.photoTags} star={p.featured} style={{ marginBottom: "2rem" } as React.CSSProperties} src={p.image} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "2.5rem" }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ fontSize: "0.88rem", color: "#BBAA88", display: "flex", alignItems: "flex-start", gap: "0.7rem", lineHeight: 1.5 }}>
                      <span style={{ ...S.gold, fontSize: "0.55rem", marginTop: "0.35rem", flexShrink: 0 }}>✦</span>{f}
                                      </li>
                                    ))}
                                  </ul>
                    
                                  <button onClick={() => setShowSurvey(true)} style={p.featured
                                    ? { ...S.btnPrimary, display: "block", textAlign: "center", width: "100%" }
                                    : { ...S.btnGhost, display: "block", textAlign: "center", width: "100%" }}>
                                    Ask The Sales
                                  </button>
                                </div>
                              ))}
                            </div>
                    
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section 
        id="faq" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, padding: "8rem 4rem", maxWidth: 860, margin: "0 auto" }}
      >
        <Reveal><p style={S.sectionLabel}>FAQ</p></Reveal>
        <Reveal delay={80}><h2 style={{ ...S.h2, marginBottom: "1rem" }}>Questions<br />Answered.</h2></Reveal>
        {FAQS.map((f, i) => (
          <Reveal key={i} delay={i * 60}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "2rem 0" }}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ fontSize: "1.05rem", fontWeight: 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", userSelect: "none", color: openFaq === i ? "#C9A84C" : "#F8F4EC", transition: "color 0.2s" }}>
                {f.q}
                <span style={{ ...S.gold, fontSize: "1.4rem", transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
              </div>
              <div style={{ fontSize: "0.92rem", lineHeight: 1.8, ...S.dim, marginTop: openFaq === i ? "1.2rem" : 0, maxHeight: openFaq === i ? 300 : 0, overflow: "hidden", opacity: openFaq === i ? 1 : 0, transition: "all 0.4s ease" }}>
                {f.a}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── CTA FINAL ── */}
      <section 
        id="order" 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#1E1E18", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "8rem 4rem", textAlign: "center", overflow: "hidden" }}
      >
        {/* ── REPLACE: <img src="./images/cta-bg.jpg" style={{position:'absolute',inset:0,objectFit:'cover',opacity:0.12}} /> ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Placeholder type="photo" label="CTA BACKGROUND FOTO" title="Atmospheric Global / Aerial Shot"
            brief="Foto atmospheric: box premium di atas surface mewah, ATAU foto aerial kota global (Dubai/London/Tokyo). Akan di-overlay gelap 80% — hanya sebagai texture mood."
            tags={["Full bleed", "Dark overlay 80%", "Atmospheric mood"]}
            style={{ height: "100%", border: "none", borderRadius: 0, opacity: 0.45 } as React.CSSProperties} src={ctaBg} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,8,0.82)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 3 }}>
          <h2 style={{ ...S.playfair, fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Get Your Premium Prototype.<br />Make Sure <em style={S.gold}>Your Box Agrees.</em>
          </h2>
          <p style={{ ...S.dim, maxWidth: 500, margin: "0 auto 3rem", lineHeight: 1.75 }}>
            ISO Standard Material. 100% Export-Ready or Money Back. Start your first order from just 50 pcs and see how global buyers respond differently.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowSurvey(true)} style={S.btnPrimary}>Ask The Sales</button>
          </div>
          <p style={{ marginTop: "2rem", fontSize: "0.78rem", ...S.dim }}>Boutique Quality, Industrial Speed · ISO Standard Material · MOQ 50 Pcs</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer 
        className="mobile-px"
        style={{ position: "relative", zIndex: 1, background: "#0A0A08", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "3rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}
      >
        <div style={{ ...S.mono, fontSize: "0.75rem", letterSpacing: "0.25em", ...S.gold, textTransform: "uppercase" }}>PremiumBox · Export</div>
        <p style={{ fontSize: "0.78rem", ...S.dim }}>support@elvisiongroup.com</p>
      </footer>
    </>
  );
}