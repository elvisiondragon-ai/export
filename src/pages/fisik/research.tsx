import React, { useEffect, useState } from 'react';
import { useLocale } from "@/contexts/LocaleContext";

// Import Assets
import heroImage from "@/assets/research/hero_utama.png";
import painImage from "@/assets/research/ilustrasi_kerugian.png";
import processImage from "@/assets/research/tim_analisis_data.png";
import deliverableImage from "@/assets/research/mockup_deliverable.png";
import beforeAfterImage from "@/assets/research/screenshot_dashboard_iklan.png";
import avatar1 from "@/assets/research/avatar_klien_1.png";
import avatar2 from "@/assets/research/avatar_klien_2.png";
import avatar3 from "@/assets/research/avatar_klien_3.png";
import faqImage from "@/assets/research/konsultasi_team_shot.png";
import ctaImage from "@/assets/research/cta_founder_shot.png";

export default function Research() {
  const { lang } = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Helper for translation
  const t = (en: string, id: string) => lang === 'id' ? id : en;

  useEffect(() => {
    document.title = t("Product Research — elvisiongroup", "Product Research — elvisiongroup");
  }, [lang]);

  useEffect(() => {
    // Scroll-triggered fade in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { 
        if(e.isIntersecting) { 
          (e.target as HTMLElement).style.opacity='1'; 
          (e.target as HTMLElement).style.transform='translateY(0)'; 
        } 
      });
    }, { threshold: 0.08 });
    
    document.querySelectorAll('section').forEach(section => {
        // observer.observe(section); // Optional: re-enable if desired
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <style>{`
        :root {
          --gold: #C9A84C;
          --gold-light: #F0CC6E;
          --gold-dim: rgba(201,168,76,0.15);
          --blue: #3B82F6;
          --blue-bright: #60A5FA;
          --bg: #0A0A0F;
          --bg2: #0F0F1A;
          --bg3: #13131F;
          --surface: #16161F;
          --surface2: #1C1C2E;
          --border: rgba(255,255,255,0.07);
          --text: #F0F0F5;
          --muted: #7B7B9A;
          --danger: #EF4444;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          overflow-x: hidden;
        }
      
        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 60px;
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .logo { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.1rem; letter-spacing:0.05em; }
        .logo span { color: var(--gold); }
        nav ul { list-style:none; display:flex; gap:32px; }
        nav ul a { color:var(--muted); text-decoration:none; font-size:.9rem; font-weight:500; transition:color .2s; }
        nav ul a:hover { color:var(--text); }
        .nav-cta {
          background: var(--gold); color: #000; font-weight:700; font-size:.85rem;
          padding: 10px 22px; border-radius:6px; text-decoration:none; transition:opacity .2s;
        }
        .nav-cta:hover { opacity:.85; }
      
        /* ── SECTIONS ── */
        section { padding: 100px 60px; }
        .container { max-width: 1100px; margin: 0 auto; }
        .tag {
          display: inline-block; font-size:.75rem; font-weight:700; letter-spacing:.12em;
          text-transform:uppercase; color: var(--gold); border:1px solid var(--gold-dim);
          padding:5px 14px; border-radius:100px; margin-bottom:20px;
          background: var(--gold-dim);
        }
        h1,h2,h3,h4 { font-family:'Space Grotesk',sans-serif; line-height:1.15; }
        h1 { font-size: clamp(2.4rem,5vw,4rem); font-weight:800; }
        h2 { font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight:800; }
        h3 { font-size:1.25rem; font-weight:700; }
      
        /* ── HERO ── */
        #hero {
          min-height: 100vh;
          display: flex; align-items:center;
          padding-top: 120px;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,.08) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 85% 60%, rgba(59,130,246,.06) 0%, transparent 60%),
                      var(--bg);
          position:relative; overflow:hidden;
        }
        #hero .grid {
          display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;
        }
        .hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.8rem; font-weight:600; color:var(--gold);
          background:var(--gold-dim); border:1px solid rgba(201,168,76,.3);
          padding:6px 16px; border-radius:100px; margin-bottom:24px;
        }
        .hero-badge span { width:7px; height:7px; background:var(--gold); border-radius:50%; display:inline-block; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        h1 em { font-style:normal; color:var(--gold); }
        .hero-sub {
          margin-top:20px; font-size:1.1rem; color:var(--muted); max-width:480px; line-height:1.7;
        }
        .hero-sub strong { color:var(--text); }
        .cta-group { display:flex; gap:14px; margin-top:36px; flex-wrap:wrap; }
        .btn-primary {
          background: linear-gradient(135deg, var(--gold), #B8922A);
          color:#000; font-weight:800; font-size:1rem;
          padding:15px 32px; border-radius:8px; text-decoration:none;
          transition: transform .2s, box-shadow .2s;
          box-shadow: 0 0 24px rgba(201,168,76,.3);
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 6px 32px rgba(201,168,76,.4); }
        .btn-ghost {
          background:transparent; color:var(--text); font-weight:600; font-size:1rem;
          padding:15px 28px; border-radius:8px; text-decoration:none;
          border:1px solid var(--border); transition: border-color .2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,.2); }
        .hero-stat {
          display:flex; gap:32px; margin-top:44px; padding-top:32px;
          border-top:1px solid var(--border);
        }
        .stat-item { text-align:left; }
        .stat-num { font-family:'Space Grotesk',sans-serif; font-size:1.8rem; font-weight:800; color:var(--gold); }
        .stat-label { font-size:.8rem; color:var(--muted); margin-top:2px; }
        
        .hero-img-container {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            border: 1px solid var(--border);
        }
        .hero-img-container img {
            display: block;
            width: 100%;
            height: auto;
        }
      
        /* ── PAIN ── */
        #pain { background: var(--bg2); }
        #pain .intro { max-width:680px; margin-bottom:60px; }
        #pain .intro p { color:var(--muted); font-size:1.05rem; margin-top:16px; }
        .pain-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:24px; margin-bottom:60px; }
        .pain-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:12px; padding:28px 24px;
          position:relative; overflow:hidden;
          transition: border-color .3s;
        }
        .pain-card:hover { border-color: rgba(239,68,68,.3); }
        .pain-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg, var(--danger), transparent);
        }
        .pain-icon { font-size:1.8rem; margin-bottom:14px; }
        .pain-card h3 { font-size:1rem; margin-bottom:8px; color:var(--text); }
        .pain-card p { font-size:.85rem; color:var(--muted); line-height:1.6; }
        .pain-cost {
          background: rgba(239,68,68,.07); border:1px solid rgba(239,68,68,.2);
          border-radius:12px; padding:32px 40px;
          display:flex; align-items:center; gap:40px;
        }
        .cost-num { font-family:'Space Grotesk',sans-serif; font-size:3.5rem; font-weight:800; color:var(--danger); white-space:nowrap; }
        .cost-text h3 { font-size:1.2rem; margin-bottom:8px; }
        .cost-text p { color:var(--muted); font-size:.95rem; }
      
        /* ── PROCESS ── */
        #process { background:var(--bg); }
        #process .grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
        .steps { display:flex; flex-direction:column; gap:0; }
        .step {
          display:flex; gap:24px; padding:28px 0;
          border-bottom:1px solid var(--border); position:relative;
        }
        .step:last-child { border-bottom:none; }
        .step-num {
          font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:2.5rem;
          color:var(--gold); opacity:.25; line-height:1; min-width:48px;
          transition:opacity .3s;
        }
        .step:hover .step-num { opacity:.6; }
        .step-content h3 { margin-bottom:8px; font-size:1.05rem; }
        .step-content p { font-size:.875rem; color:var(--muted); line-height:1.65; }
        .step-badge {
          display:inline-block; font-size:.68rem; font-weight:700; letter-spacing:.08em;
          text-transform:uppercase; color:var(--gold); background:var(--gold-dim);
          border:1px solid rgba(201,168,76,.2); padding:3px 10px; border-radius:100px; margin-bottom:10px;
        }
      
        /* ── DELIVERABLES ── */
        #deliverables { background:var(--bg2); }
        .deliverable-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:50px; }
        .del-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:12px; padding:24px;
          display:flex; gap:18px; align-items:flex-start;
          transition: border-color .3s, transform .3s;
        }
        .del-card:hover { border-color: rgba(201,168,76,.3); transform:translateY(-3px); }
        .del-icon {
          width:44px; height:44px; border-radius:10px;
          background:var(--gold-dim); display:flex; align-items:center; justify-content:center;
          font-size:1.4rem; flex-shrink:0;
        }
        .del-text h4 { font-size:.95rem; margin-bottom:6px; }
        .del-text p { font-size:.82rem; color:var(--muted); line-height:1.55; }
      
        /* ── BEFORE/AFTER ── */
        #before-after { background: var(--bg); overflow:hidden; }
        .ba-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin-top:50px; border-radius:16px; overflow:hidden; }
        .ba-col { padding:40px 36px; }
        .ba-col.before { background:rgba(239,68,68,.06); border:1px solid rgba(239,68,68,.15); border-radius:16px 0 0 16px; }
        .ba-col.after { background:rgba(201,168,76,.06); border:1px solid rgba(201,168,76,.2); border-radius:0 16px 16px 0; }
        .ba-header { display:flex; align-items:center; gap:12px; margin-bottom:28px; }
        .ba-dot { width:12px; height:12px; border-radius:50%; }
        .ba-dot.red { background:var(--danger); }
        .ba-dot.gold { background:var(--gold); }
        .ba-header h3 { font-size:1.15rem; }
        .ba-item { display:flex; gap:14px; align-items:flex-start; margin-bottom:16px; }
        .ba-item-icon { font-size:1.1rem; margin-top:1px; }
        .ba-item p { font-size:.875rem; color:var(--muted); line-height:1.55; }
        .ba-result {
          margin-top:24px; padding-top:24px; border-top:1px solid var(--border);
          font-family:'Space Grotesk',sans-serif;
        }
        .ba-result .num { font-size:2.2rem; font-weight:800; }
        .ba-result.red .num { color:var(--danger); }
        .ba-result.gold .num { color:var(--gold); }
        .ba-result p { font-size:.8rem; color:var(--muted); margin-top:4px; }
      
        /* ── TESTIMONIALS ── */
        #testimonials { background:var(--bg2); }
        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:50px; }
        .testi-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:14px; padding:28px 24px;
          position:relative;
        }
        .testi-card::before { content:'"'; position:absolute; top:18px; right:22px; font-size:3.5rem; color:var(--gold); opacity:.12; font-family:Georgia,serif; }
        .testi-stars { color:var(--gold); font-size:.9rem; margin-bottom:14px; letter-spacing:.05em; }
        .testi-card blockquote { font-size:.875rem; color:var(--muted); line-height:1.7; font-style:italic; margin-bottom:20px; }
        .testi-author { display:flex; align-items:center; gap:14px; }
        .testi-avatar {
          width:42px; height:42px; border-radius:50%; border:2px solid var(--border);
          overflow:hidden; flex-shrink:0; background:var(--surface2);
        }
        .testi-avatar img { width:100%; height:100%; object-fit:cover; }
        .testi-name { font-weight:700; font-size:.875rem; }
        .testi-role { font-size:.75rem; color:var(--muted); }
      
        /* ── PRICING ── */
        #pricing { background:var(--bg); }
        #pricing .intro { max-width:600px; margin-bottom:54px; }
        #pricing .intro p { color:var(--muted); margin-top:14px; }
        .pricing-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        .price-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:16px; padding:32px 28px;
          position:relative; transition:transform .3s, border-color .3s;
        }
        .price-card:hover { transform:translateY(-4px); border-color:rgba(201,168,76,.25); }
        .price-card.featured {
          border-color:var(--gold); background:linear-gradient(160deg,rgba(201,168,76,.08),var(--surface));
        }
        .featured-badge {
          position:absolute; top:-14px; left:50%; transform:translateX(-50%);
          background:linear-gradient(135deg,var(--gold),#B8922A); color:#000;
          font-size:.7rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
          padding:5px 18px; border-radius:100px;
        }
        .price-name { font-size:.8rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:12px; }
        .price-amount { font-family:'Space Grotesk',sans-serif; font-size:2.4rem; font-weight:800; color:var(--text); }
        .price-amount small { font-size:1rem; color:var(--muted); font-weight:500; }
        .price-desc { font-size:.82rem; color:var(--muted); margin:10px 0 24px; line-height:1.55; }
        .price-divider { border:none; border-top:1px solid var(--border); margin-bottom:20px; }
        .price-features { list-style:none; display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
        .price-features li { display:flex; gap:10px; align-items:flex-start; font-size:.84rem; }
        .price-features li::before { content:'✓'; color:var(--gold); font-weight:700; flex-shrink:0; }
        .price-features li.no::before { content:'✗'; color:var(--muted); }
        .price-features li.no { color:var(--muted); }
        .btn-price {
          display:block; text-align:center; font-weight:700; font-size:.9rem;
          padding:13px; border-radius:8px; text-decoration:none; transition:all .2s;
        }
        .btn-price-primary { background:linear-gradient(135deg,var(--gold),#B8922A); color:#000; }
        .btn-price-ghost { border:1px solid var(--border); color:var(--text); }
        .btn-price-ghost:hover { border-color:rgba(201,168,76,.4); }
      
        /* ── FAQ ── */
        #faq { background:var(--bg2); }
        #faq .grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
        .faq-list { display:flex; flex-direction:column; gap:0; }
        .faq-item { border-bottom:1px solid var(--border); }
        .faq-q {
          width:100%; background:none; border:none; color:var(--text);
          text-align:left; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:.95rem;
          padding:20px 0; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
          gap:12px;
        }
        .faq-q::after { content:'+'; font-size:1.3rem; color:var(--gold); flex-shrink:0; transition:transform .3s; }
        .faq-q.open::after { transform:rotate(45deg); }
        .faq-a { font-size:.85rem; color:var(--muted); line-height:1.7; padding-bottom:20px; display:none; }
        .faq-a.open { display:block; }
      
        /* ── FINAL CTA ── */
        #final-cta {
          background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,.12) 0%, var(--bg) 70%);
          text-align:center; padding:120px 60px;
        }
        #final-cta h2 { font-size:clamp(2rem,4vw,3.2rem); max-width:700px; margin:20px auto; }
        #final-cta p { color:var(--muted); font-size:1.05rem; max-width:520px; margin:0 auto 36px; }
        .cta-group-center { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
        .guarantee { margin-top:28px; font-size:.82rem; color:var(--muted); }
        .guarantee span { color:var(--gold); }
      
        /* ── FOOTER ── */
        footer {
          background:var(--bg); border-top:1px solid var(--border);
          padding:32px 60px; display:flex; align-items:center; justify-content:space-between;
        }
        footer p { font-size:.8rem; color:var(--muted); }
        .footer-links { display:flex; gap:24px; }
        .footer-links a { font-size:.8rem; color:var(--muted); text-decoration:none; }
        .footer-links a:hover { color:var(--text); }
      
        /* responsive */
        @media(max-width:900px) {
          nav { position: absolute; padding:24px; background: transparent; border-bottom: none; backdrop-filter: none; }
          nav ul { display:none; }
          section { padding:80px 24px; }
          #hero .grid, #process .grid, #faq .grid, .video-grid { grid-template-columns:1fr; }
          .pain-grid, .deliverable-grid, .testi-grid, .pricing-grid { grid-template-columns:1fr; }
          .ba-grid { grid-template-columns:1fr; }
          .ba-col.before { border-radius:16px 16px 0 0; }
          .ba-col.after { border-radius:0 0 16px 16px; }
          footer { flex-direction:column; gap:14px; text-align:center; }
          
          /* Pain Cost Mobile Fix */
          .pain-cost { flex-direction: column; text-align: center; gap: 20px; padding: 32px 24px; }
          .cost-num { font-size: 3rem; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="logo">el<span>vision</span>group / <span style={{color:'var(--muted)', fontWeight:500}}>Research</span></div>
        <ul>
          <li><a href="#process">{t("How it Works", "Cara Kerja")}</a></li>
          <li><a href="#deliverables">{t("Deliverables", "Deliverable")}</a></li>
          <li><a href="#pricing">{t("Pricing", "Paket")}</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <button 
                onClick={() => setLang(lang === 'en' ? 'id' : 'en')} 
                style={{
                    background: 'transparent', 
                    border: '1px solid var(--border)', 
                    color: 'var(--text)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600
                }}
            >
                {lang === 'en' ? '🇮🇩 ID' : '🇺🇸 EN'}
            </button>
        </div>
      </nav>

      {/* 1. HERO */}
      <section id="hero">
        <div className="container">
          <div className="grid">
            <div>
              <div className="hero-badge">
                <span></span> research.elvisiongroup.com
              </div>
              <h1>{t("Stop Burning Budget", "Berhenti Bakar Budget")}<br />{t("Before Knowing the Facts.", "sebelum Tahu")} <em>{t("", "Faktanya.")}</em></h1>
              <p className="hero-sub">
                {t("Certain product research before burning energy and money on ads and creatives.", "Riset produk yang pasti sebelum membakar energi dan uang untuk iklan dan creative.")}<br />
                <strong>{t("Because wrong ads aren't about budget — it's about lack of research.", "Karena iklan yang salah bukan soal budget — soal kamu belum riset.")}</strong>
              </p>
              <div className="cta-group">
                <a href="#final-cta" className="btn-primary">{t("Request Free Consultation", "Minta Konsultasi Gratis")}</a>
                <a href="#process" className="btn-ghost">{t("See How It Works", "Lihat Cara Kerja")}</a>
              </div>
              <div className="hero-stat">
                <div className="stat-item">
                  <div className="stat-num">3.2×</div>
                  <div className="stat-label">{t("avg ROAS increase", "rata-rata peningkatan ROAS")}<br/>{t("after research", "setelah riset")}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">200+</div>
                  <div className="stat-label">{t("products analyzed", "produk dianalisis")}<br/>{t("in 2 years", "dalam 2 tahun")}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">67%</div>
                  <div className="stat-label">{t("clients save budget", "klien hemat budget")}<br/>{t("creative >50%", "creative >50%")}</div>
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="hero-img-container">
                <img src={heroImage} alt="Hero Research" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN SECTION */}
      <section id="pain">
        <div className="container">
          <div className="intro">
            <div className="tag">{t("The Problem We Attack", "Masalah yang Kita Serang")}</div>
            <h2>{t("How Much Wasted", "Berapa yang Sudah Habis")}<br />{t("Just Guessing?", "karena Asal Jalan?")}</h2>
            <p>{t("Every rupiah you throw at ads without research isn't bravery — it's avoidable recklessness.", "Setiap rupiah yang kamu buang di iklan tanpa riset bukan keberanian — itu kecerobohan yang bisa dihindari.")}</p>
          </div>

          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">📉</div>
              <h3>{t("Ads Running, No Sales", "Iklan Jalan, Tak Ada yang Beli")}</h3>
              <p>{t("CTR okay, traffic coming in, but checkout is quiet. Your product is good — but your message is wrong to the wrong people.", "CTR oke, traffic masuk, tapi checkout sepi. Produk kamu bagus — tapi pesan kamu salah arah ke orang yang salah.")}</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">💸</div>
              <h3>{t("Expensive Creative, Zero Results", "Creative Mahal, Hasilnya Zonk")}</h3>
              <p>{t("Millions on video production, professional photos, endorsers. But the angle is wrong because it's built on assumptions, not market research.", "Video produksi jutaan rupiah, foto profesional, endorser. Tapi angle-nya salah karena dibuat dari asumsi, bukan dari riset pasar.")}</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">🎯</div>
              <h3>{t("Wrong Target, Wrong Platform", "Salah Target, Salah Platform")}</h3>
              <p>{t("Selling on TikTok when buyers are on Shopee. Marketing to millennials when buyers are moms 35+.", "Jualan di TikTok padahal buyer-nya ada di Shopee. Memasarkan ke millennial padahal yang beli ibu rumah tangga 35+.")}</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">❓</div>
              <h3>{t("Unknown Demand", "Tidak Tahu Demand-nya Ada Tidak")}</h3>
              <p>{t("Product ready, stock ordered, ads running — only to find out demand is near zero.", "Produk sudah jadi, stok sudah dipesan, iklan sudah tayang — baru tahu bahwa demand-nya nyaris nol.")}</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">🏁</div>
              <h3>{t("Competitors Win, We Lose", "Kompetitor Menang, Kita Kalah")}</h3>
              <p>{t("They use the right messaging, on the right platform, to the right audience. Because they researched first.", "Mereka pakai messaging yang tepat, di platform yang tepat, ke audiens yang tepat. Karena mereka riset dulu.")}</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">🔁</div>
              <h3>{t("Recurring Loss Loop", "Loop Rugi yang Terus Berulang")}</h3>
              <p>{t("Change product, change ad vendor, change creative agency — but the main problem is never solved.", "Ganti produk, ganti vendor iklan, ganti creative agency — tapi masalah utamanya tidak pernah diselesaikan.")}</p>
            </div>
          </div>

          {/* Pain visual */}
          <div style={{marginBottom:"36px", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)"}}>
            <img src={painImage} alt="Pain Illustration" style={{width:"100%", display:"block"}} />
          </div>

          <div className="pain-cost">
            <div className="cost-num">Rp 50 jt+</div>
            <div className="cost-text">
              <h3>{t("Average Wasted Before Clients Finally Ask for Help", "Rata-rata yang Dibuang Sebelum Klien Kita Akhirnya Minta Bantuan")}</h3>
              <p>{t("Not a number we made up. It's what they tell us during the first consultation. And it could all be prevented with proper research beforehand.", "Bukan angka yang kami karang. Itu yang mereka ceritakan saat pertama kali konsultasi. Dan semuanya bisa dicegah dengan riset yang benar sebelum mulai.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section id="process">
        <div className="container">
          <div className="grid">
            <div>
              <div className="tag">{t("How It Works", "Cara Kerja")}</div>
              <h2>{t("Research Isn't Guesswork.", "Riset Bukan Tebak-tebakan.")}<br />{t("This Is The Process.", "Ini Prosesnya.")}</h2>
              <p style={{color:'var(--muted)', marginTop:'16px', marginBottom:'40px'}}>{t("5 systematic steps that turn uncertainty into data-driven decisions.", "5 tahap sistematis yang mengubah uncertainty menjadi keputusan berbasis data.")}</p>

              <div className="steps">
                <div className="step">
                  <div className="step-num">01</div>
                  <div className="step-content">
                    <div className="step-badge">Discovery</div>
                    <h3>{t("Brief & Product Scope", "Brief & Scope Produk")}</h3>
                    <p>{t("We start by understanding your product thoroughly — category, claims, known competitors, and what has been tried. This is the foundation of valid research.", "Kita mulai dari memahami produk kamu secara menyeluruh — kategori, klaim, kompetitor yang kamu tahu, dan apa yang sudah pernah dicoba. Ini fondasi riset yang valid.")}</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">02</div>
                  <div className="step-content">
                    <div className="step-badge">Demand Analysis</div>
                    <h3>{t("Demand & Market Size Analysis", "Analisis Demand & Market Size")}</h3>
                    <p>{t("We check search volume, trends, seasonality, and real buying signals from marketplaces, social, and search engines — not random surveys.", "Kita cek volume pencarian, tren, musiman, dan sinyal beli nyata dari platform marketplace, social, dan search engine — bukan dari survei asal-asalan.")}</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">03</div>
                  <div className="step-content">
                    <div className="step-badge">Audience Intel</div>
                    <h3>{t("Real Buyer Persona Map", "Peta Buyer Persona Nyata")}</h3>
                    <p>{t("Who buys, why they buy, what words they use when searching, and what they say in competitor reviews. Not fictional personas — from primary data.", "Siapa yang beli, kenapa beli, kata apa yang mereka pakai saat searching, dan apa yang mereka bilang di review kompetitor. Bukan persona fiksi — dari data primer.")}</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">04</div>
                  <div className="step-content">
                    <div className="step-badge">Competitive Intel</div>
                    <h3>{t("Competitor Analysis & Gap", "Analisis Kompetitor & Gap")}</h3>
                    <p>{t("What competitors claim, where they are weak, what messaging is missing, and whitespace you can take. This makes you win without price wars.", "Apa yang kompetitor klaim, di mana mereka lemah, messaging apa yang belum ada, dan whitespace yang bisa kamu ambil. Ini yang bikin kamu menang tanpa harus perang harga.")}</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">05</div>
                  <div className="step-content">
                    <div className="step-badge">Deliverable</div>
                    <h3>{t("Creative Brief & Recommendation", "Creative Brief & Recommendation")}</h3>
                    <p>{t("All findings compiled into actionable documents: messaging hierarchy, proven ad angles, priority platforms, and creative briefs ready for your team.", "Semua temuan dikompilasi jadi dokumen actionable: messaging hierarchy, angle iklan yang terbukti, platform prioritas, dan brief creative yang siap dieksekusi tim kamu.")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process visual */}
            <div style={{borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)"}}>
               <img src={processImage} alt="Process Team Analysis" style={{width:"100%", display:"block", height:"100%", objectFit:"cover"}} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. DELIVERABLES */}
      <section id="deliverables">
        <div className="container">
          <div className="tag">{t("What You Get", "Yang Kamu Terima")}</div>
          <h2>{t("Not Thick PDF Reports", "Bukan Laporan PDF Tebal")}<br />{t("That No One Reads.", "yang Tidak Dibaca.")}</h2>
          <p style={{color:'var(--muted)', marginTop:'14px', maxWidth:'580px'}}>{t("Every deliverable is designed to be used immediately — by your ad team, creatives, and founder.", "Setiap deliverable dirancang untuk langsung dipakai — oleh tim iklan, creative, dan founder kamu sendiri.")}</p>

          <div className="deliverable-grid">
            <div className="del-card">
              <div className="del-icon">📊</div>
              <div className="del-text">
                <h4>Market Demand Report</h4>
                <p>{t("Search volume, 12-month trends, seasonality, and quantifiable market size estimates. Not 'seems like there's demand' — but how big.", "Volume pencarian, tren 12 bulan, musiman, dan estimasi market size yang bisa dikuantifikasi. Bukan 'sepertinya ada demand' — tapi berapa besarnya.")}</p>
              </div>
            </div>
            <div className="del-card">
              <div className="del-icon">👥</div>
              <div className="del-text">
                <h4>Buyer Persona Document</h4>
                <p>{t("3–5 personas based on review data, forums, and conversation analysis. Complete with buy triggers, pain points, and the language they use.", "3–5 persona berbasis data review, forum, dan conversation analysis. Lengkap dengan trigger beli, pain point, dan bahasa yang mereka pakai.")}</p>
              </div>
            </div>
            <div className="del-card">
              <div className="del-icon">🔍</div>
              <div className="del-text">
                <h4>Competitive Intelligence Map</h4>
                <p>{t("Competitor positioning, messaging they use, unexploited weaknesses, and whitespace for you to enter.", "Positioning kompetitor, messaging yang mereka pakai, kelemahan yang belum dieksploitasi, dan whitespace untuk kamu masuk.")}</p>
              </div>
            </div>
            <div className="del-card">
              <div className="del-icon">✍️</div>
              <div className="del-text">
                <h4>{t("Data-Driven Creative Brief", "Creative Brief Berbasis Data")}</h4>
                <p>{t("Ad angles with priority ranking, key messages per persona, visual do's & don'ts, tone of voice, and relevant hook examples.", "Angle iklan dengan ranking prioritas, key messages per persona, do & don't visual, tone of voice, dan contoh hook yang relevan.")}</p>
              </div>
            </div>
            <div className="del-card">
              <div className="del-icon">📱</div>
              <div className="del-text">
                <h4>Platform & Placement Recommendation</h4>
                <p>{t("Where your audience is, content formats that work on that platform, and the most efficient platform sequence for your budget.", "Di mana audiens kamu ada, format konten yang bekerja di platform tersebut, dan urutan platform yang paling efisien untuk budget kamu.")}</p>
              </div>
            </div>
            <div className="del-card">
              <div className="del-icon">🚀</div>
              <div className="del-text">
                <h4>Launch Readiness Scorecard</h4>
                <p>{t("Objective assessment: is this product ready to launch or needs adjustment. If there's risk, we say it first — before you burn budget.", "Penilaian objektif: produk ini siap launch atau butuh adjustment. Kalau ada risiko, kita bilang dulu — sebelum kamu bakar budget.")}</p>
              </div>
            </div>
          </div>

          {/* Deliverables visual */}
          <div style={{marginTop:"36px", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)"}}>
             <img src={deliverableImage} alt="Deliverables Mockup" style={{width:"100%", display:"block"}} />
          </div>
        </div>
      </section>

      {/* 6. BEFORE / AFTER (Moved up since Video is gone) */}
      <section id="before-after">
        <div className="container">
          <div className="tag">{t("Real Results", "Hasil Nyata")}</div>
          <h2>{t("Without Research vs With Research.", "Tanpa Riset vs Dengan Riset.")}<br />{t("Choose Which You Want.", "Pilih Kamu Mau yang Mana.")}</h2>

          <div className="ba-grid" style={{marginTop:"50px"}}>
            <div className="ba-col before">
              <div className="ba-header">
                <div className="ba-dot red"></div>
                <h3>{t("Without Research — Just Running", "Tanpa Riset — Jalan Duluan")}</h3>
              </div>
              <div className="ba-item"><div className="ba-item-icon">❌</div><p>{t("Creative made from gut feeling & random competitor references", "Creative dibuat dari feeling & referensi kompetitor ngasal")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">❌</div><p>{t("Target audience: everyone 18–45 who might be interested", "Target audience: semua orang usia 18–45 yang mungkin tertarik")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">❌</div><p>{t("Generic messaging: 'best product, premium quality, affordable price'", "Messaging generik: 'produk terbaik, kualitas premium, harga terjangkau'")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">❌</div><p>{t("Ad budget gone in 2 weeks, 0.3% conversion", "Budget iklan habis dalam 2 minggu, konversi 0.3%")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">❌</div><p>{t("Creative revisions multiple times, nobody knows what to change", "Revisi creative berkali-kali, tidak ada yang tahu harus diubah apa")}</p></div>
              <div className="ba-result red">
                <div className="num">ROAS 0.8×</div>
                <p>{t("Every 1M ads spent, 800k returns. Losing money.", "Tiap Rp 1 juta diiklankan, balik Rp 800 ribu. Rugi terus.")}</p>
              </div>
            </div>
            <div className="ba-col after">
              <div className="ba-header">
                <div className="ba-dot gold"></div>
                <h3>{t("With elvisiongroup Research", "Dengan Riset elvisiongroup")}</h3>
              </div>
              <div className="ba-item"><div className="ba-item-icon">✅</div><p>{t("Creative brief from real review data & audience conversation mining", "Creative brief dari data review riil & conversation mining audiens")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">✅</div><p>{t("3 specific personas with buy triggers and language used", "3 persona spesifik dengan trigger beli dan bahasa yang dipakai")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">✅</div><p>{t("Messaging hierarchy: hooks, main claims, and objection handlers", "Messaging hierarchy: hook, klaim utama, dan objection handler yang tepat")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">✅</div><p>{t("Efficient budget, knowing priority platforms & formats", "Budget efisien, tahu mana platform & format yang harus diprioritaskan")}</p></div>
              <div className="ba-item"><div className="ba-item-icon">✅</div><p>{t("First creative on-point because brief is fact-based", "Creative pertama langsung on-point karena brief-nya berbasis fakta")}</p></div>
              <div className="ba-result gold">
                <div className="num">ROAS 3.4×</div>
                <p>{t("Every 1M ads spent, 3.4M returns. Scalable.", "Tiap Rp 1 juta diiklankan, balik Rp 3.4 juta. Skalabel.")}</p>
              </div>
            </div>
          </div>

          {/* BA visual */}
          <div style={{marginTop:"36px", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)"}}>
            <img src={beforeAfterImage} alt="Dashboard Before After" style={{width:"100%", display:"block"}} />
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section id="testimonials">
        <div className="container">
          <div className="tag">{t("What They Say", "Kata Mereka")}</div>
          <h2>{t("Clients Who Stopped", "Klien yang Sudah Berhenti")}<br />{t("Wasting Budget.", "Buang Budget.")}</h2>

          <div className="testi-grid">

            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <blockquote>"{t("Previously spent 80 million on ads for 3 months, ROAS under 1. After elvisiongroup research and creative brief revision, first month straight to ROAS 2.8. Not magic — it's because we finally knew who we were talking to.", "Sebelumnya sudah keluar 80 juta untuk iklan 3 bulan, ROAS-nya di bawah 1. Setelah riset elvisiongroup dan kita revisi creative brief, bulan pertama langsung ROAS 2.8. Itu bukan keajaiban — itu karena akhirnya kita tahu siapa yang kita ajak bicara.")}"</blockquote>
              <div className="testi-author">
                <div className="testi-avatar">
                   <img src={avatar1} alt="Rizky A" />
                </div>
                <div>
                  <div className="testi-name">Rizky A.</div>
                  <div className="testi-role">Founder, Skincare Brand — Shopee & TikTok Shop</div>
                </div>
              </div>
            </div>

            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <blockquote>"{t("Almost cancelled launch because I wasn't sure anyone would buy. After research, demand existed — but on a different platform with different messaging. We pivoted before burning big budget. Saved our launch.", "Saya hampir cancel launch karena tidak yakin ada yang beli. Setelah riset demand-nya ternyata ada — tapi di platform yang berbeda dan dengan messaging yang berbeda. Kita pivot sebelum bakar budget besar. Itu yang menyelamatkan launch kita.")}"</blockquote>
              <div className="testi-author">
                 <div className="testi-avatar">
                   <img src={avatar2} alt="Sandra M" />
                </div>
                <div>
                  <div className="testi-name">Sandra M.</div>
                  <div className="testi-role">E-commerce Seller, Health Supplements</div>
                </div>
              </div>
            </div>

            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <blockquote>"{t("Their creative brief was the first time our team didn't debate angles. Everything had data. Asked 'why this hook?' — there was an answer. What we needed all along.", "Creative brief dari mereka adalah yang pertama kalinya tim kita tidak debat soal angle. Semuanya ada data-nya. Waktu ditanya 'kenapa pakai hook ini?' — ada jawabannya. Itu yang kita butuhkan dari dulu.")}"</blockquote>
              <div className="testi-author">
                 <div className="testi-avatar">
                   <img src={avatar3} alt="Budi H" />
                </div>
                <div>
                  <div className="testi-name">Budi H.</div>
                  <div className="testi-role">Marketing Manager, Fashion Brand D2C</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PRICING */}
      <section id="pricing">
        <div className="container">
          <div className="intro">
            <div className="tag">{t("Service Packages", "Paket Layanan")}</div>
            <h2>{t("Investment That Returns", "Investasi yang Balik Modal")}<br />{t("On The First Ad.", "di Iklan Pertama.")}</h2>
            <p>{t("Choose a package fitting your business scale and research depth needed.", "Pilih paket sesuai skala bisnis dan kedalaman riset yang kamu butuhkan.")}</p>
          </div>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-name">Starter</div>
              <div className="price-amount">Rp 3,5 jt <small>/proyek</small></div>
              <p className="price-desc">{t("For brands launching or validating quickly before first ad.", "Untuk brand yang baru mau launch atau ingin validasi cepat sebelum iklan pertama.")}</p>
              <hr className="price-divider"/>
              <ul className="price-features">
                <li>Market Demand Report (1 produk)</li>
                <li>Buyer Persona (2 persona)</li>
                <li>Platform Recommendation</li>
                <li>Creative Brief Dasar</li>
                <li className="no">Competitive Intelligence Map</li>
                <li className="no">Launch Readiness Scorecard</li>
                <li className="no">Sesi Konsultasi Presentasi</li>
              </ul>
              <a href="#final-cta" className="btn-price btn-price-ghost">{t("Start with Starter", "Mulai dengan Starter")}</a>
            </div>

            <div className="price-card featured">
              <div className="featured-badge">{t("Most Popular", "Paling Populer")}</div>
              <div className="price-name">Growth</div>
              <div className="price-amount">Rp 8,5 jt <small>/proyek</small></div>
              <p className="price-desc">{t("For brands ready to scale and need comprehensive data decisions.", "Untuk brand yang siap scale dan butuh keputusan berdasarkan data komprehensif.")}</p>
              <hr className="price-divider"/>
              <ul className="price-features">
                <li>Market Demand Report (1 produk)</li>
                <li>Buyer Persona (5 persona)</li>
                <li>Platform & Placement Recommendation</li>
                <li>Creative Brief Lengkap + Hook Library</li>
                <li>Competitive Intelligence Map</li>
                <li>Launch Readiness Scorecard</li>
                <li>1× Sesi Presentasi & Q&A (60 min)</li>
              </ul>
              <a href="#final-cta" className="btn-price btn-price-primary">{t("Select Growth", "Pilih Growth")}</a>
            </div>

            <div className="price-card">
              <div className="price-name">Enterprise</div>
              <div className="price-amount">Custom</div>
              <p className="price-desc">{t("For brands with multiple SKUs, new market expansion, or ongoing monthly research.", "Untuk brand dengan multiple SKU, ekspansi pasar baru, atau riset ongoing bulanan.")}</p>
              <hr className="price-divider"/>
              <ul className="price-features">
                <li>{t("Everything in Growth, plus:", "Semua di Growth, plus:")}</li>
                <li>Multi-SKU atau multi-kategori</li>
                <li>Primary research (survey & interview)</li>
                <li>Monitoring kompetitor ongoing</li>
                <li>Monthly riset update report</li>
                <li>Dedicated research lead</li>
                <li>Priority turnaround</li>
              </ul>
              <a href="#final-cta" className="btn-price btn-price-ghost">{t("Discuss Needs", "Diskusi Kebutuhan")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq">
        <div className="container">
          <div className="grid">
            <div>
              <div className="tag">FAQ</div>
              <h2>{t("Frequently Asked", "Pertanyaan yang")}<br />{t("Questions.", "Selalu Ditanya.")}</h2>
              <p style={{color:'var(--muted)', marginTop:'16px', marginBottom:'36px'}}>{t("If unanswered, we are ready to talk directly.", "Kalau ada yang belum terjawab, kita siap bicara langsung.")}</p>

              {/* FAQ visual */}
              <div style={{minHeight:"220px", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)"}}>
                 <img src={faqImage} alt="FAQ Team Consultation" style={{width:"100%", display:"block", height:"100%", objectFit:"cover"}} />
              </div>
            </div>

            <div className="faq-list">
              <div className="faq-item">
                <button className={`faq-q ${openFaq === 0 ? 'open' : ''}`} onClick={() => toggleFaq(0)}>{t("How long is the process?", "Berapa lama proses risetnya?")}</button>
                <div className={`faq-a ${openFaq === 0 ? 'open' : ''}`}>{t("Starter Package: 5–7 working days. Growth: 10–14 working days. Enterprise depends on scope. We don't rush because rushed research yields wrong recommendations — but we aren't slow without reason.", "Paket Starter: 5–7 hari kerja. Growth: 10–14 hari kerja. Enterprise bergantung scope. Kita tidak terburu-buru karena riset yang tergesa menghasilkan rekomendasi yang salah — tapi kita juga tidak lambat tanpa alasan.")}</div>
              </div>
              <div className="faq-item">
                <button className={`faq-q ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>{t("Do I need to prepare data first?", "Apakah saya perlu menyiapkan data dulu?")}</button>
                <div className={`faq-a ${openFaq === 1 ? 'open' : ''}`}>{t("Not necessarily. Just product brief, main claims, and business context. The more data you share (past ads, feedback, sales), the more accurate the recommendations — but not mandatory.", "Tidak harus. Cukup brief produk, klaim utama, dan konteks bisnis. Semakin banyak data yang kamu bagi (data iklan lama, feedback pelanggan, data penjualan), semakin akurat rekomendasinya — tapi bukan syarat wajib.")}</div>
              </div>
              <div className="faq-item">
                <button className={`faq-q ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>{t("If I don't have a product yet, can I research?", "Kalau saya belum punya produk, bisa riset dulu?")}</button>
                <div className={`faq-a ${openFaq === 2 ? 'open' : ''}`}>{t("Yes, and this is ideal. Demand research before product is best decision. We validate if market exists, how big, and which segment converts easily.", "Bisa, dan ini justru ideal. Riset demand sebelum produk jadi adalah keputusan terbaik yang bisa kamu buat. Kita bisa validasi apakah pasar ada, berapa besar, dan segmen mana yang paling mudah dikonversi.")}</div>
              </div>
              <div className="faq-item">
                <button className={`faq-q ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>{t("Can results be used by creative team immediately?", "Apakah hasilnya bisa langsung dipakai tim creative?")}</button>
                <div className={`faq-a ${openFaq === 3 ? 'open' : ''}`}>{t("Yes, that's the goal. Our creative briefs are designed for copywriters, designers, videographers without long interpretation. Format is actionable, not academic.", "Ya, itu tujuannya. Creative brief yang kita buat didesain agar bisa langsung dibaca oleh copywriter, desainer, dan videografer tanpa harus ada sesi interpretasi panjang. Format-nya actionable, bukan akademik.")}</div>
              </div>
              <div className="faq-item">
                <button className={`faq-q ${openFaq === 4 ? 'open' : ''}`} onClick={() => toggleFaq(4)}>{t("What's different from doing my own research?", "Apa yang kamu lakukan berbeda dari riset sendiri?")}</button>
                <div className={`faq-a ${openFaq === 4 ? 'open' : ''}`}>{t("200+ products experience, premium tools, and data interpretation into actionable insights. DIY research is possible — but often incomplete, biased, or too slow. We do this full-time.", "Pengalaman 200+ produk, tools premium (tidak tersedia gratis), dan kemampuan interpretasi data menjadi insight yang actionable. Riset sendiri bisa — tapi biasanya incomplete, bias, atau terlalu lama. Kita lakukan ini full-time.")}</div>
              </div>
              <div className="faq-item">
                <button className={`faq-q ${openFaq === 5 ? 'open' : ''}`} onClick={() => toggleFaq(5)}>{t("Is there a guarantee?", "Ada garansi?")}</button>
                <div className={`faq-a ${openFaq === 5 ? 'open' : ''}`}>{t("We don't sell ROAS guarantees — that's dishonest. We guarantee: research done with strict methodology, transparent results even if low demand, and actionable briefs. If unsatisfied with document quality, we revise until you are.", "Kita tidak jual garansi ROAS — itu tidak jujur. Yang kita jamin: riset dilakukan dengan metodologi yang ketat, hasilnya transparan termasuk kalau ternyata demand rendah, dan brief-nya actionable. Kalau kamu tidak puas dengan kualitas dokumen, kita revisi sampai kamu yakin.")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section id="final-cta">
        <div className="container" style={{textAlign:"center"}}>
          <div className="tag">{t("Start Now", "Mulai Sekarang")}</div>
          <h2>{t("Your Competitors Have", "Kompetitor Kamu Sudah")}<br />{t("Researched Yesterday.", "Riset dari Kemarin.")}</h2>
          <p>{t("Every day you delay is a day they get further ahead. Research now, launch with confidence.", "Setiap hari yang kamu tunda adalah hari mereka semakin jauh di depan. Riset sekarang, launch dengan keyakinan.")}</p>

          {/* CTA visual */}
          <div style={{minHeight:"200px", maxWidth:"700px", margin:"0 auto 40px", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)"}}>
             <img src={ctaImage} alt="Founder CTA" style={{width:"100%", display:"block"}} />
          </div>

          <div className="cta-group-center">
            <a href="https://wa.me/62895325633487" className="btn-primary" style={{fontSize:"1.05rem",padding:"17px 38px"}}>{t("Request Free Consult — WhatsApp", "Minta Konsultasi Gratis — WhatsApp")}</a>
            <a href="mailto:research@elvisiongroup.com" className="btn-ghost" style={{fontSize:"1.05rem",padding:"17px 32px"}}>{t("Send Email", "Kirim Email")}</a>
          </div>
          <div className="guarantee" style={{marginTop:"24px"}}>
            ⏱ {t("Response in", "Respons dalam")} <span>{t("1×24 working hours", "1×24 jam kerja")}</span> · 🔒 {t("Your data", "Data kamu")} <span>100% confidential</span> · 📋 {t("First consult", "Konsultasi pertama")} <span>{t("free & no commitment", "gratis & tanpa komitmen")}</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="logo" style={{marginBottom:"6px"}}>el<span>vision</span>group</div>
          <p style={{fontSize:".75rem"}}>© 2026 Research eL Vision Group Global</p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="mailto:research@elvisiongroup.com" style={{fontSize:".8rem",color:"var(--muted)",textDecoration:"none"}}>research@elvisiongroup.com</a>
        </div>
      </footer>
    </>
  );
}
