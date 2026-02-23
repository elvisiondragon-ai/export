import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Copy } from 'lucide-react';
import qrisBcaImage from '@/assets/qrisbca.jpeg';
import { useSearchParams } from 'react-router-dom';
import { getFbcFbpCookies, getClientIp } from '@/utils/fbpixel';
import { useLocale } from "@/contexts/LocaleContext";

// --- ASSETS ---
import singleHero1 from '@/assets/jewelry/singlering/solo1.jpeg';
import singleThumb1 from '@/assets/jewelry/singlering/solo2.jpeg';
import singleThumb2 from '@/assets/jewelry/singlering/solo3.jpeg';
import singleThumb3 from '@/assets/jewelry/singlering/solo4.jpeg';
import singleVideo from '@/assets/jewelry/singlering/solo.mp4';

import coupleHero1 from '@/assets/jewelry/couple/couple_ring_ref_1_1771870223210.png';
import coupleThumb1 from '@/assets/jewelry/couple/couple_ring_ref_3_1771869860234.png';
import coupleThumb2 from '@/assets/jewelry/couple/couple_ring_ref_3_1771870046382.png';

import coupleVideo from '@/assets/jewelry/couple/couple.mp4';
import testpenImage from '@/assets/jewelry/testpen.jpeg';
import certiImage from '@/assets/jewelry/certi.jpeg';

const provinces = [
  "Aceh", "Sumatra Utara", "Sumatra Barat", "Riau", "Kepulauan Riau", "Jambi", "Sumatra Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung",
  "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Gorontalo", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Maluku Utara", "Maluku", "Papua Barat", "Papua Barat Daya", "Papua", "Papua Tengah", "Papua Pegunungan", "Papua Selatan"
];

export default function RamadhanRing() {
  const [searchParams] = useSearchParams();
  const affiliateRef = searchParams.get('id');
  const { lang, setLang } = useLocale();

  const [ringType, setRingType] = useState<'single' | 'couple'>('single');
  const [qty, setQty] = useState(1);
  const [sizeStandard, setSizeStandard] = useState<'US' | 'Indo'>('US');
  const [size, setSize] = useState('7');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
  const [stock, setStock] = useState(8);

  const sizeMapping = [
    { us: '5', indo: '10' },
    { us: '6', indo: '13' },
    { us: '7', indo: '15' },
    { us: '8', indo: '18' },
    { us: '9', indo: '20' },
    { us: '10', indo: '22' }
  ];

  // Form State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kodePos, setKodePos] = useState('');

  // Payment State
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

  const priceID = ringType === 'single' ? 500000 : 900000;
  const priceEN = ringType === 'single' ? 45 : 80;
  const wasPriceID = ringType === 'single' ? 2000000 : 3500000;
  const wasPriceEN = ringType === 'single' ? 175 : 300;

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Stock Effect
  useEffect(() => {
    const stockInterval = setInterval(() => {
      setStock(prev => (prev > 5 ? prev - Math.floor(Math.random() * 2) : prev));
    }, 30000);
    return () => clearInterval(stockInterval);
  }, []);

  // CAPI ViewContent Effect
  useEffect(() => {
    const trackViewContent = async () => {
      try {
        const { fbc, fbp } = getFbcFbpCookies();
        const clientIp = await getClientIp();
        
        await supabase.functions.invoke('capi-universal', {
          body: {
            pixelId: 'CAPI_JEWELRY',
            eventName: 'ViewContent',
            eventSourceUrl: window.location.href,
            customData: {
              content_name: 'Jewelry Export Ring Ramadhan',
              value: priceID,
              currency: 'IDR'
            },
            userData: {
              fbc,
              fbp,
              client_ip_address: clientIp
            }
          }
        });
      } catch (e) {
        console.error('ViewContent CAPI error', e);
      }
    };
    
    trackViewContent();
  }, []);

  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
    setPaymentMethod(''); // Reset payment method on lang change
  };

  const changeQty = (delta: number) => {
    setQty(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const sendWAAlert = async (type: 'attempt' | 'success', details: any) => {
    try {
      const productDesc = `Ramadhan Ring (${ringType}) Size ${size} (${sizeStandard})`;
      const msg = type === 'attempt' 
        ? `🔔 *Mencoba Checkout*\nProduk: ${productDesc}\nNama: ${details.name}\nWA: ${details.phone}\nMetode: ${details.method}`
        : `✅ *Checkout Sukses*\nRef: ${details.ref}\nProduk: ${productDesc}\nNama: ${details.name}\nWA: ${details.phone}\nTotal: ${details.amount}`;

      await fetch('https://watzapp.web.id/api/message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': '23b62c4255c43489f55fa84693dc0451d89ea5a5c9ec00021a7b77287cdce0b8'
        },
        body: JSON.stringify({
          phone: "62895325633487",
          message: msg,
          token: "23b62c4255c43489f55fa84693dc0451d89ea5a5c9ec00021a7b77287cdce0b8"
        })
      });
    } catch (e) {
      console.error('WA API Error', e);
    }
  };

  const submitOrder = async () => {
    // --- VALIDATION ---
    if (lang === 'id') {
      if (!userName || !phoneNumber || !userAddress || !selectedProvince || !kota || !kecamatan || !kodePos) {
        alert('⚠️ Mohon lengkapi seluruh data diri dan alamat Anda!');
        return;
      }
    } else {
      if (!userName || !phoneNumber || !userAddress || !selectedProvince || !kota || !kecamatan || !kodePos) {
        alert('⚠️ Please complete all your details and address fields!');
        return;
      }
    }

    if (!paymentMethod) {
      alert(lang === 'id' ? '⚠️ Silahkan pilih metode pembayaran!' : '⚠️ Please select a payment method!');
      return;
    }

    sendWAAlert('attempt', { name: userName, phone: phoneNumber, method: paymentMethod });

    const totalIDR = priceID * qty;
    const totalEN = priceEN * qty;
    const fullAddressID = `${userAddress}, ${kecamatan}, ${kota}, ${selectedProvince}, ${kodePos}`;
    const fullAddressEN = `${userAddress}, ${kodePos}, ${kecamatan} (City), ${kota} (State), ${selectedProvince} (Country)`;
    const productDesc = `Ramadhan Ring (${ringType === 'single' ? 'Single' : 'Couple'}) Size ${size} (${sizeStandard})`;

    // --- EN FLOW (WhatsApp for COD) ---
    if (lang === 'en' && paymentMethod === 'cod') {
      const msg = `🛒 *NEW ORDER – Export Ring Ramadhan Gift*\n\n👤 Name: ${userName}\n📱 Phone: ${phoneNumber}\n🏠 Address: ${fullAddressEN}\n💍 Product: ${productDesc}\n📦 Qty: ${qty}\n💳 Pay: COD\n💰 Total: SGD ${totalEN}\n\nPlease confirm my order!`;
      sendWAAlert('success', { ref: 'WA-ORDER-COD', name: userName, phone: phoneNumber, amount: `SGD ${totalEN}` });
      window.open(`https://wa.me/62895325633487?text=${encodeURIComponent(msg)}`, '_blank');
      return;
    }

    // --- BACKEND API FLOW (ID QRIS/BCA & EN PayPal) ---
    setLoading(true);
    const { fbc, fbp } = getFbcFbpCookies();
    const clientIp = await getClientIp();

    try {
      const backendPaymentMethod = lang === 'en' ? 'PAYPAL' : (paymentMethod === 'bca_manual' ? 'BCA_MANUAL' : 'QRIS');

      // Track AddPaymentInfo
      try {
        await supabase.functions.invoke('capi-universal', {
          body: {
            pixelId: 'CAPI_JEWELRY',
            eventName: 'AddPaymentInfo',
            eventSourceUrl: window.location.href,
            customData: {
              content_name: `Jewelry Export Ring Ramadhan - ${productDesc} (x${qty})`,
              value: lang === 'id' ? totalIDR : totalEN,
              currency: lang === 'id' ? 'IDR' : 'SGD'
            },
            userData: {
              fbc,
              fbp,
              client_ip_address: clientIp,
              fn: userName,
              ph: phoneNumber,
              em: userEmail || `customer_${phoneNumber}@guest.com`
            }
          }
        });
      } catch (e) {
        console.error('AddPaymentInfo CAPI error', e);
      }

      const payload = {
        subscriptionType: 'universal', // ⚠️ WAJIB TETAP 'universal'
        paymentMethod: backendPaymentMethod,
        userName,
        userEmail: userEmail || `customer_${phoneNumber}@guest.com`,
        phoneNumber,
        address: lang === 'id' ? fullAddressID : fullAddressEN,
        province: selectedProvince,
        kota,
        kecamatan,
        kodePos,
        amount: lang === 'id' ? totalIDR : totalEN,
        currency: lang === 'id' ? 'IDR' : 'SGD',
        quantity: 1, // Send as 1 because amount is already total
        productName: `Jewelry Export Ring Ramadhan - ${productDesc} (x${qty})`,
        affiliateRef,
        fbc,
        fbp,
        clientIp
      };

      const { data, error } = await supabase.functions.invoke('tripay-create-payment', { body: payload });

      if (data?.success) {
        if (lang === 'en' && paymentMethod === 'paypal' && data.checkoutUrl) {
          sendWAAlert('success', { ref: data.tripay_reference || 'PAYPAL', name: userName, phone: phoneNumber, amount: `SGD ${totalEN}` });
          window.location.href = data.checkoutUrl;
          return;
        }

        setPaymentData(data);
        setShowPaymentInstructions(true);
        sendWAAlert('success', { ref: data.tripay_reference, name: userName, phone: phoneNumber, amount: `Rp ${totalIDR.toLocaleString('id-ID')}` });
      } else if (paymentMethod === 'bca_manual') {
        const ref = `MANUAL-${Date.now()}`;
        setPaymentData({ 
          paymentMethod: 'BCA_MANUAL', 
          amount: totalIDR, 
          status: 'UNPAID', 
          tripay_reference: ref 
        });
        setShowPaymentInstructions(true);
        sendWAAlert('success', { ref, name: userName, phone: phoneNumber, amount: `Rp ${totalIDR.toLocaleString('id-ID')}` });
      } else {
        alert(data?.error || error?.message || (lang === 'id' ? "Gagal membuat pembayaran, hubungi admin via WhatsApp." : "Failed to create payment, please contact admin."));
      }
    } catch (e) {
      alert(lang === 'id' ? 'Network Error. Silakan pesan via WhatsApp.' : 'Network Error. Please order via WhatsApp.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openWA = () => {
    const msg = lang === 'id'
      ? 'Halo, saya ingin tanya tentang Export Ring Ramadhan Gift 💍'
      : 'Hello, I would like to ask about the Export Ring Ramadhan Gift 💍';
    window.open(`https://wa.me/62895325633487?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // --- PAYMENT INSTRUCTIONS UI ---
  if (showPaymentInstructions && paymentData) {
    return (
      <div style={{minHeight: '100vh', background: 'var(--cream)', fontFamily: "'DM Sans', sans-serif", color: 'var(--ink)'}}>
        <style>{`
          :root {
            --gold: #C9A84C; --gold-light: #E8D08A; --cream: #FBF7F0; --deep: #1A1208; --ink: #2D2410;
          }
          .pay-btn-confirm {
            background: #25D366; color: white; display: flex; align-items: center; justify-content: center; gap: 8px;
            font-size: 14px; width: 100%; padding: 14px; border-radius: 10px; border: none; font-weight: 600; cursor: pointer; text-decoration: none;
          }
        `}</style>
        <div style={{maxWidth: '520px', margin: '0 auto', padding: '30px 20px'}}>
          <button onClick={() => setShowPaymentInstructions(false)} style={{background:'none', border:'none', color:'var(--deep)', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'8px', fontSize:'16px', fontWeight:'bold', fontFamily:'DM Sans'}}>
            <ArrowLeft size={20} /> Kembali
          </button>
          
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '24px', color: 'var(--deep)', marginBottom: '20px', textAlign: 'center'}}>Instruksi Pembayaran</h2>
          
          <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid rgba(201,168,76,.2)', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', fontSize:'13px'}}>
              <span style={{color:'#6b6045', fontWeight:600}}>NOMOR REFERENSI</span>
              <span style={{fontWeight:'bold', color:'var(--deep)'}}>{paymentData.tripay_reference}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'14px'}}>
              <span style={{color:'#6b6045', fontWeight:600}}>Total Pembayaran</span>
              <span style={{fontWeight:'bold', fontSize:'18px', color:'var(--deep)'}}>Rp {paymentData.amount.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {paymentData.paymentMethod === 'BCA_MANUAL' && (
            <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid rgba(201,168,76,.2)', textAlign: 'center'}}>
              <h3 style={{fontFamily: 'Playfair Display', fontSize: '18px', marginBottom: '16px'}}>Transfer Manual BCA</h3>
              <div style={{background: 'var(--cream)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                  <span style={{fontSize: '22px', fontWeight: 'bold', fontFamily: 'monospace'}}>7751146578</span>
                  <button onClick={() => { navigator.clipboard.writeText('7751146578'); alert('Tersalin!'); }} style={{background:'none', border:'none', cursor:'pointer'}}><Copy size={20} color="var(--gold)" /></button>
              </div>
              <p style={{fontWeight:'bold', marginBottom:'20px'}}>A.n Delia Mutia</p>
              <div style={{display:'flex', justifyContent:'center'}}>
                <img src={qrisBcaImage} alt="QRIS BCA" style={{width: '220px', height: '220px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '24px'}} />
              </div>
              <a href={`https://wa.me/62895325633487?text=${encodeURIComponent(`Halo kak, saya sudah bayar Export Ring Ramadhan. Ref: ${paymentData.tripay_reference}`)}`} target="_blank" rel="noreferrer" style={{textDecoration:'none', display:'block'}}>
                <button className="pay-btn-confirm">
                  Konfirmasi via WhatsApp
                </button>
              </a>
            </div>
          )}

          {paymentData.payCode && (
            <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid rgba(201,168,76,.2)', marginBottom: '16px'}}>
              <p style={{fontSize:'12px', color:'#6b6045', fontWeight:600, marginBottom:'8px'}}>KODE PEMBAYARAN</p>
              <div style={{background: 'var(--cream)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '20px', fontWeight: 'bold', fontFamily: 'monospace', color:'var(--deep)'}}>{paymentData.payCode}</span>
                  <button onClick={() => { navigator.clipboard.writeText(paymentData.payCode); alert('Tersalin!'); }} style={{background:'none', border:'none', cursor:'pointer'}}><Copy size={20} color="var(--gold)" /></button>
              </div>
            </div>
          )}

          {paymentData.qrUrl && (
            <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid rgba(201,168,76,.2)', textAlign: 'center'}}>
              <h3 style={{fontFamily: 'Playfair Display', fontSize: '18px', marginBottom: '8px'}}>Scan QRIS</h3>
              <p style={{fontSize:'13px', color:'#6b6045', marginBottom:'20px'}}>Buka aplikasi GoPay, OVO, Dana, ShopeePay, atau Mobile Banking pilihan Anda.</p>
              <div style={{display:'flex', justifyContent:'center'}}>
                <img src={paymentData.qrUrl} alt="QRIS" style={{width: '250px', height: '250px', borderRadius: '12px', border: '1px solid #eee', marginBottom:'20px'}} />
              </div>
              <div style={{background: '#e8f5e9', padding: '12px', borderRadius: '8px', color: '#1b5e20', fontSize: '13px', fontWeight: 600}}>
                ✅ Screenshot halaman ini dan upload pada aplikasi pembayaran Anda.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --gold: #C9A84C; --gold-light: #E8D08A; --gold-pale: #F5EDD4; --cream: #FBF7F0;
          --deep: #1A1208; --ink: #2D2410; --silver: #B8BFC9; --white: #FFFFFF;
          --red: #C0392B; --green: #1E6B3C;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--ink); overflow-x: hidden; }

        /* ─── LANG TOGGLE ─── */
        .lang-bar { background: var(--deep); padding: 8px 20px; display: flex; justify-content: flex-end; align-items: center; position: sticky; top: 0; z-index: 999; }
        .lang-btn { background: none; border: 1px solid var(--gold); color: var(--gold-light); padding: 4px 14px; border-radius: 2px; font-size: 12px; letter-spacing: 1.5px; cursor: pointer; transition: all .25s; font-family: 'DM Sans'; }
        .lang-btn.active { background: var(--gold); color: var(--deep); font-weight: 600; }

        /* ─── HEADER ─── */
        header { background: var(--deep); text-align: center; padding: 32px 20px 28px; position: relative; overflow: hidden; }
        header::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(201,168,76,.05) 12px, rgba(201,168,76,.05) 13px); }
        .logo-area { position: relative; z-index: 1; }
        .logo-icon { display: inline-block; width: 68px; height: 68px; background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold)); border-radius: 50%; line-height: 68px; font-size: 28px; margin-bottom: 10px; box-shadow: 0 0 28px rgba(201,168,76,.4); animation: pulse-gold 3s ease-in-out infinite; }
        @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 28px rgba(201,168,76,.4); } 50% { box-shadow: 0 0 48px rgba(201,168,76,.7), 0 0 80px rgba(201,168,76,.2); } }
        .brand-name { font-family: 'Playfair Display', serif; color: var(--gold-light); font-size: clamp(22px, 5vw, 36px); letter-spacing: 3px; line-height: 1.1; }
        .brand-sub { color: var(--silver); font-size: 11px; letter-spacing: 4px; text-transform: uppercase; margin-top: 6px; }

        /* ─── EXPORT BANNER ─── */
        .export-banner { background: linear-gradient(90deg, var(--gold) 0%, #A07820 50%, var(--gold) 100%); padding: 10px 16px; text-align: center; overflow: hidden; }
        .export-scroll { display: flex; align-items: center; gap: 20px; animation: scroll-x 22s linear infinite; white-space: nowrap; width: max-content; }
        @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .export-flag { font-size: 13px; font-weight: 500; color: var(--deep); letter-spacing: 1px; }
        .export-sep { color: var(--deep); opacity: .5; font-size: 18px; }

        /* ─── TIMER ─── */
        .timer-wrap { background: #fff8ee; border: 1px solid #f0d98a; border-radius: 8px; margin-top: 18px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
        .timer-icon { font-size: 22px; animation: shake 1s infinite; }
        @keyframes shake { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-6deg)} 75%{transform:rotate(6deg)} }
        .timer-label { font-size: 12px; color: #8B6914; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        .timer-digits { display: flex; gap: 6px; margin-top: 4px; }
        .digit-box { background: var(--deep); color: var(--gold-light); font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; width: 42px; text-align: center; border-radius: 4px; padding: 2px 0; letter-spacing: 2px; }
        .digit-sep { color: var(--deep); font-size: 20px; font-weight: 700; align-self: center; }

        /* ─── PRODUCT SECTION ─── */
        .product-section { max-width: 520px; margin: 0 auto; padding: 0 0 100px; }
        .product-section > * { width: 95%; margin-left: auto; margin-right: auto; display: block; }
        .product-section > .timer-wrap { display: flex; }
        .product-section > .feature-grid { display: grid; }
        .product-section > .media-area { display: flex; }
        .product-section > .media-thumbs { display: grid; }
        .product-section > .video-placeholder { display: flex; }
        .product-section > .type-toggle { display: flex; }

        /* TYPE TOGGLE */
        .type-toggle {
          background: #e6dfcc;
          border-radius: 50px;
          padding: 4px;
          margin-top: 20px;
          gap: 4px;
        }
        .type-btn {
          flex: 1;
          padding: 10px;
          border-radius: 50px;
          border: none;
          background: transparent;
          font-family: 'DM Sans';
          font-size: 14px;
          font-weight: 600;
          color: #6b6045;
          cursor: pointer;
          transition: all .3s;
        }
        .type-btn.active {
          background: white;
          color: var(--deep);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        /* MEDIA AREA */
        .media-area { margin-top: 12px; border-radius: 12px; overflow: hidden; position: relative; aspect-ratio: 1/1; }
        .media-area img { width: 100%; height: 100%; object-fit: cover; }
        
        .media-thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px; }
        .thumb-img { aspect-ratio: 1; border-radius: 8px; overflow: hidden; border: 1.5px solid transparent; transition: border-color .2s; cursor: pointer; }
        .thumb-img:hover { border-color: var(--gold); }
        .thumb-img img { width: 100%; height: 100%; object-fit: cover; }

        /* VIDEO */
        .video-container { margin-top: 8px; aspect-ratio: 1/1; border-radius: 10px; overflow: hidden; position: relative; }
        .video-container video { width: 100%; height: 100%; object-fit: cover; }

        /* ─── PRODUCT INFO ─── */
        .product-title { font-family: 'Playfair Display', serif; font-size: clamp(20px, 5vw, 28px); line-height: 1.2; color: var(--deep); margin-top: 20px; text-align: center; }
        .product-tagline { text-align: center; color: #8B6914; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px; }

        /* PRICE */
        .price-block { background: linear-gradient(135deg, var(--deep), #3d3018); border-radius: 12px; padding: 16px 20px; margin-top: 16px; text-align: center; position: relative; overflow: hidden; }
        .price-block::before { content: ''; position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; background: rgba(201,168,76,.08); border-radius: 50%; }
        .price-was { text-decoration: line-through; color: var(--silver); font-size: 15px; letter-spacing: 1px; }
        .price-now { font-family: 'Playfair Display', serif; color: var(--gold-light); font-size: clamp(30px, 8vw, 44px); font-weight: 700; line-height: 1; margin-top: 4px; letter-spacing: 1px; }
        .price-save { display: inline-block; margin-top: 6px; background: var(--red); color: white; font-size: 12px; font-weight: 700; padding: 3px 12px; border-radius: 20px; letter-spacing: 1px; }

        /* ─── KEUNGGULAN / WHY US ─── */
        .section-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--deep); margin-top: 24px; margin-bottom: 12px; position: relative; padding-left: 12px; }
        .section-title::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 70%; background: var(--gold); border-radius: 2px; }

        .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .feature-card { background: white; border-radius: 10px; padding: 14px 12px; border: 1px solid rgba(201,168,76,.2); transition: transform .2s, box-shadow .2s; }
        .feature-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(201,168,76,.15); }
        .feature-card .fc-icon { font-size: 24px; }
        .feature-card .fc-title { font-weight: 600; font-size: 13px; color: var(--deep); margin-top: 6px; line-height: 1.3; }
        .feature-card .fc-desc { font-size: 11px; color: #6b6045; margin-top: 3px; line-height: 1.5; }
        .feature-card.gold-card { background: linear-gradient(135deg, var(--deep), #3d3018); border-color: var(--gold); grid-column: span 2; display: flex; align-items: center; gap: 12px; }
        .feature-card.gold-card .fc-title { color: var(--gold-light); }
        .feature-card.gold-card .fc-desc { color: var(--silver); }

        /* ─── EXPORT COUNTRIES ─── */
        .countries-wrap { background: white; border-radius: 12px; padding: 16px; margin-top: 8px; border: 1px solid rgba(201,168,76,.2); }
        .countries-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .country-pill { background: var(--gold-pale); border: 1px solid rgba(201,168,76,.4); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 500; color: #5a4210; display: flex; align-items: center; gap: 5px; }

        /* ─── FORM ─── */
        .checkout-form { background: white; border-radius: 14px; padding: 20px 16px; margin-top: 20px; border: 1px solid rgba(201,168,76,.2); box-shadow: 0 4px 24px rgba(201,168,76,.08); }
        .form-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--deep); margin-bottom: 14px; }
        .form-group { margin-bottom: 12px; }
        .form-label { font-size: 12px; font-weight: 600; color: #6b6045; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 5px; display: block; }
        .form-input { width: 100%; border: 1.5px solid rgba(201,168,76,.3); border-radius: 8px; padding: 11px 14px; font-size: 14px; font-family: 'DM Sans'; color: var(--deep); background: var(--cream); outline: none; transition: border-color .2s; }
        .form-input:focus { border-color: var(--gold); background: white; }
        .form-input::placeholder { color: #bbb; }

        /* SIZE SELECTOR */
        .size-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .size-btn { width: 42px; height: 42px; border-radius: 8px; border: 1.5px solid rgba(201,168,76,.3); background: var(--cream); font-size: 13px; font-weight: 600; color: var(--deep); cursor: pointer; transition: all .2s; font-family: 'DM Sans'; }
        .size-btn.active { background: var(--deep); border-color: var(--gold); color: var(--gold-light); }
        .size-btn:hover:not(.active):not(.sold-out) { border-color: var(--gold); background: var(--gold-pale); }
        .size-btn.sold-out { opacity: 0.6; cursor: not-allowed; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f0f0f0; color: #999; border-color: #ddd; }
        .size-btn.sold-out .so-tag { font-size: 7px; font-weight: 800; text-transform: uppercase; margin-top: -2px; }

        /* QTY */
        .qty-row { display: flex; align-items: center; gap: 12px; }
        .qty-btn { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid rgba(201,168,76,.3); background: var(--cream); font-size: 18px; cursor: pointer; transition: all .2s; font-family: 'DM Sans'; display: flex; align-items: center; justify-content: center; color: var(--deep); }
        .qty-btn:hover { background: var(--gold-pale); border-color: var(--gold); }
        .qty-val { font-size: 18px; font-weight: 700; min-width: 24px; text-align: center; color: var(--deep); }

        /* PAYMENT TOGGLE */
        .pay-opts { display: flex; gap: 8px; flex-wrap: wrap; }
        .pay-opt { flex: 1; min-width: 100px; border: 1.5px solid rgba(201,168,76,.3); border-radius: 8px; padding: 10px 8px; text-align: center; cursor: pointer; transition: all .2s; background: var(--cream); }
        .pay-opt.active { border-color: var(--gold); background: var(--gold-pale); }
        .pay-opt .po-icon { font-size: 20px; }
        .pay-opt .po-label { font-size: 11px; font-weight: 600; color: var(--deep); margin-top: 3px; }

        /* CTA BUTTON */
        .cta-btn { width: 100%; padding: 16px; border-radius: 10px; border: none; font-size: 15px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans'; margin-top: 16px; position: relative; overflow: hidden; transition: transform .15s; }
        .cta-btn:active { transform: scale(.98); }
        .cta-btn:disabled { opacity: 0.7; cursor: not-allowed; animation: none; }
        .cta-primary { background: linear-gradient(90deg, #8B6914, var(--gold), #C9A84C, #8B6914); background-size: 200%; color: var(--deep); animation: shimmer 2.5s linear infinite; }
        @keyframes shimmer { 0%{background-position:0%} 100%{background-position:200%} }
        
        .cta-wa { background: #25D366; color: white; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; width: 100%; padding: 13px; border-radius: 10px; border: none; font-family: 'DM Sans'; font-weight: 600; letter-spacing: .5px; cursor: pointer; transition: opacity .2s; }
        .cta-wa:hover { opacity: .9; }

        /* TRUST STRIP */
        .trust-strip { display: flex; justify-content: space-around; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(201,168,76,.15); }
        .trust-item { text-align: center; }
        .trust-icon { font-size: 20px; }
        .trust-label { font-size: 10px; color: #8B6914; font-weight: 600; letter-spacing: .5px; margin-top: 3px; }

        /* RAMADHAN BADGE */
        .ramadhan-badge { text-align: center; margin-top: 20px; padding: 14px; background: linear-gradient(135deg, #0d4a2a, #1E6B3C); border-radius: 12px; position: relative; overflow: hidden; }
        .ramadhan-badge::before { content: '☪️'; position: absolute; font-size: 80px; opacity: .07; top: -10px; right: -10px; line-height: 1; }
        .rb-emoji { font-size: 24px; }
        .rb-text { color: white; font-family: 'Playfair Display', serif; font-size: 15px; margin-top: 4px; }
        .rb-sub { color: rgba(255,255,255,.65); font-size: 12px; margin-top: 3px; }

        /* Stock badge */
        .stock-badge { background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px 20px; font-size: 18px; color: #856404; font-weight: 800; text-align: center; margin-top: 16px; animation: blink-border 2s ease-in-out infinite; }
        @keyframes blink-border { 0%,100%{border-color:#ffc107} 50%{border-color:#fd7e14} }

        /* REVIEWS & FAQ */
        .review-section { background: white; border-radius: 12px; padding: 20px; margin-top: 24px; border: 1px solid rgba(201,168,76,.2); }
        .review-stars { color: #ffc107; font-size: 20px; margin-bottom: 8px; }
        .review-text { font-size: 14px; font-style: italic; color: var(--ink); }
        
        .faq-section { margin-top: 24px; }
        .faq-item { background: white; border-radius: 10px; padding: 16px; margin-bottom: 10px; border: 1px solid rgba(201,168,76,.15); }
        .faq-q { font-weight: 700; font-size: 14px; color: var(--deep); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
        .faq-a { font-size: 13px; color: #6b6045; line-height: 1.5; }
        .tester-img { width: 100%; border-radius: 10px; margin-top: 12px; border: 1px solid #eee; }
      `}</style>

      {/* LANG BAR */}
      <div className="lang-bar">
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={toggleLang}>
          {lang === 'id' ? 'EN 🇸🇬' : 'ID 🇮🇩'}
        </button>
      </div>

      {/* HEADER */}
      <header>
        <div className="logo-area">
          <div className="logo-icon">💍</div>
          <div style={{ display: lang === 'id' ? 'block' : 'none' }}>
            <div className="brand-name">Export Ring</div>
            <div className="brand-name" style={{ fontStyle: 'italic', fontSize: 'clamp(16px,3.5vw,24px)' }}>Ramadhan Gift</div>
            <div className="brand-sub">Perhiasan Premium · Koleksi Export Asia</div>
          </div>
          <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
            <div className="brand-name">Export Ring</div>
            <div className="brand-name" style={{ fontStyle: 'italic', fontSize: 'clamp(16px,3.5vw,24px)' }}>Ramadhan Gift</div>
            <div className="brand-sub">Premium Jewelry · Asia Export Collection</div>
          </div>
        </div>
      </header>

      {/* EXPORT STRIP */}
      <div className="export-banner">
        <div className="export-scroll">
          <span className="export-flag">🇸🇬 Singapore</span><span className="export-sep">·</span>
          <span className="export-flag">🇲🇾 Malaysia</span><span className="export-sep">·</span>
          <span className="export-flag">🇧🇳 Brunei</span><span className="export-sep">·</span>
          <span className="export-flag">🇹🇭 Thailand</span><span className="export-sep">·</span>
          <span className="export-flag">🇵🇭 Philippines</span><span className="export-sep">·</span>
          <span className="export-flag">🇯🇵 Japan</span><span className="export-sep">·</span>
          <span className="export-flag">🇰🇷 South Korea</span><span className="export-sep">·</span>
          <span className="export-flag">🇭🇰 Hong Kong</span><span className="export-sep">·</span>
          <span className="export-flag">🇹🇼 Taiwan</span><span className="export-sep">·</span>
          <span className="export-flag">🇨🇳 China</span><span className="export-sep">·</span>
          <span className="export-flag">🇮🇳 India</span><span className="export-sep">·</span>
          <span className="export-flag">🇦🇪 UAE</span><span className="export-sep">·</span>
          <span className="export-flag">🇸🇬 Singapore</span><span className="export-sep">·</span>
          <span className="export-flag">🇲🇾 Malaysia</span><span className="export-sep">·</span>
          <span className="export-flag">🇧🇳 Brunei</span><span className="export-sep">·</span>
          <span className="export-flag">🇹🇭 Thailand</span><span className="export-sep">·</span>
          <span className="export-flag">🇵🇭 Philippines</span><span className="export-sep">·</span>
          <span className="export-flag">🇯🇵 Japan</span><span className="export-sep">·</span>
        </div>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div className="product-section">
        
        {/* TIMER */}
        <div className="timer-wrap">
          <div className="timer-icon">⏰</div>
          <div>
            <div className="timer-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>🔥 Promo Berakhir Dalam</div>
            <div className="timer-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>🔥 Offer Ends In</div>
            <div className="timer-digits">
              <div className="digit-box">{String(timeLeft.h).padStart(2, '0')}</div>
              <div className="digit-sep">:</div>
              <div className="digit-box">{String(timeLeft.m).padStart(2, '0')}</div>
              <div className="digit-sep">:</div>
              <div className="digit-box">{String(timeLeft.s).padStart(2, '0')}</div>
            </div>
          </div>
        </div>

        {/* SINGLE RING MEDIA */}
        <div className="section-title" style={{ textAlign: 'center', marginTop: '24px' }}>💍 Single Ring Collection</div>
        <div className="media-area">
          <img src={singleHero1} alt="Single Ring" />
        </div>
        <div className="media-thumbs">
          <div className="thumb-img"><img src={singleThumb1} alt="Thumb 1" /></div>
          <div className="thumb-img"><img src={singleThumb2} alt="Thumb 2" /></div>
          <div className="thumb-img"><img src={singleThumb3} alt="Thumb 3" /></div>
        </div>
        <div className="video-container">
          <video src={singleVideo} controls autoPlay muted loop playsInline />
        </div>

        {/* COUPLE RING MEDIA */}
        <div className="section-title" style={{ textAlign: 'center', marginTop: '36px' }}>👩‍❤️‍👨 Couple Ring Collection</div>
        <div className="media-area">
          <img src={coupleHero1} alt="Couple Ring" />
        </div>
        <div className="media-thumbs">
          <div className="thumb-img"><img src={coupleHero1} alt="Thumb 1" /></div>
          <div className="thumb-img"><img src={coupleThumb1} alt="Thumb 2" /></div>
          <div className="thumb-img"><img src={coupleThumb2} alt="Thumb 3" /></div>
        </div>
        <div className="video-container">
          <video src={coupleVideo} controls autoPlay muted loop playsInline />
        </div>

        {/* PRODUCT TITLE */}
        <div className="product-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>Cincin Export Ramadhan Gift<br />Lapis White Gold + Silver 925</div>
        <div className="product-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>Export Ring — Ramadhan Gift<br />White Gold Plated + 925 Silver</div>
        <div className="product-tagline" style={{ display: lang === 'id' ? 'block' : 'none' }}>Moissanite 3 Carat · Kualitas Export Asia · Edisi Ramadhan</div>
        <div className="product-tagline" style={{ display: lang === 'en' ? 'block' : 'none' }}>Moissanite 3 Carat · Asia Export Grade · Ramadhan Edition</div>

        {/* PRICE BLOCK */}
        <div className="price-block">
          <div className="price-was" style={{ display: lang === 'id' ? 'block' : 'none' }}>Rp {wasPriceID.toLocaleString('id-ID')}</div>
          <div className="price-was" style={{ display: lang === 'en' ? 'block' : 'none' }}>SGD {wasPriceEN}</div>
          <div className="price-now" style={{ display: lang === 'id' ? 'block' : 'none' }}>Rp {priceID.toLocaleString('id-ID')}</div>
          <div className="price-now" style={{ display: lang === 'en' ? 'block' : 'none' }}>SGD {priceEN}</div>
          <div>
            <span className="price-save" style={{ display: lang === 'id' ? 'inline-block' : 'none' }}>HEMAT 75% · HANYA 24 JAM!</span>
            <span className="price-save" style={{ display: lang === 'en' ? 'inline-block' : 'none' }}>SAVE 75% · 24 HOURS ONLY!</span>
          </div>
          <div style={{ color: 'var(--gold-light)', fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>
            <span style={{ display: lang === 'id' ? 'inline' : 'none' }}>⭐ Senilai Rp {wasPriceID.toLocaleString('id-ID')} – Kualitas yang tidak bohong</span>
            <span style={{ display: lang === 'en' ? 'inline' : 'none' }}>⭐ Valued at SGD {wasPriceEN} – Unmatched quality at this price</span>
          </div>
        </div>

        {/* STOCK */}
        <div className="stock-badge" style={{ display: lang === 'id' ? 'block' : 'none' }}>⚠️ Sisa <span style={{ textDecoration: 'line-through' }}>100</span> <strong>{stock}</strong> pcs lagi !!</div>
        <div className="stock-badge" style={{ display: lang === 'en' ? 'block' : 'none' }}>⚠️ Limited Stock! Only <strong>{stock}</strong> pcs remaining today</div>

        {/* REVIEWS */}
        <div className="review-section">
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-text">
            {lang === 'id' 
              ? "Kualitasnya bener-bener mewah, kilaunya persis berlian asli. Sudah saya tes pake diamond tester dan tembus! Packaging juga sangat premium. Recommended banget untuk kado Ramadhan."
              : "The quality is truly luxurious, the brilliance is exactly like a real diamond. I tested it with a diamond tester and it passed! Premium packaging too. Highly recommended for a Ramadhan gift."
            }
          </div>
          <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Sarah W. 🇮🇩 (Verified Buyer)</div>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Kado ulang tahun pernikahan paling berkesan. Istri suka banget sama kilau Moissanite-nya. Beneran beda sama perhiasan biasa."
                : "Most memorable wedding anniversary gift. My wife loves the Moissanite's sparkle. It really stands out compared to regular jewelry."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Budi H. 🇮🇩 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Fast delivery to Singapore! Cincinnya bener-bener berkilau dan mewah. Gak nyesel beli di sini."
                : "Fast delivery to Singapore! The ring is truly sparkly and luxurious. No regrets buying here."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Mei Ling 🇸🇬 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Terbaik! Lolos diamond tester. Sangat puas dengan kualitinya. Penghantaran ke Malaysia sangat laju."
                : "Excellent! Passed the diamond tester. Very satisfied with the quality. Delivery to Malaysia was very fast."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Zulkifli 🇲🇾 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Kualiti premium. Sangat cantik buat kado tunang. Packaging pun eksklusif sangat."
                : "Premium quality. Very beautiful for an engagement gift. The packaging is also very exclusive."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Siti R. 🇧🇳 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Luxury packaging and real 925 silver. Moissanite-nya sangat jernih. Pass tester perfectamente!"
                : "Luxury packaging and real 925 silver. The moissanite is very clear. Passed the tester perfectly!"
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Omar K. 🇦🇪 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Desainnya sangat elegan. Pengiriman internasional sangat cepat ke Tokyo. Terima kasih!"
                : "Very elegant design. International shipping was fast to Tokyo. Thank you!"
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Yuki H. 🇯🇵 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Very happy with this purchase. Quality is top notch. Passed my diamond tester easily."
                : "Very happy with this purchase. Quality is top notch. Passed my diamond tester easily."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Michael T. 🇺🇸 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Cincinnya cantik sekali, ukurannya pas banget sesuai panduan. CS sangat responsif membantu."
                : "The ring is so beautiful, fits perfectly according to the guide. CS is very responsive."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Anita S. 🇦🇺 (Verified Buyer)</div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <div className="review-text">
              {lang === 'id' 
                ? "Sangat puas! Moissanite-nya bener-bener berkilau, bahkan di tempat redup. Gak nyesel beli couple ring buat tunangan."
                : "Very satisfied! The moissanite really sparkles, even in dim light. No regrets buying the couple ring for my engagement."
              }
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#8B6914' }}>— Riza A. 🇮🇩 (Verified Buyer)</div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <div className="section-title">❓ FAQ</div>
          
          <div className="faq-item">
            <div className="faq-q">📦 {lang === 'id' ? 'Berapa lama pengirimannya?' : 'How long is the delivery?'}</div>
            <div className="faq-a">{lang === 'id' ? 'Pengiriman memakan waktu 3-7 hari kerja tergantung lokasi Anda di Asia.' : 'Shipping takes 3-7 business days depending on your location in Asia.'}</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">📜 {lang === 'id' ? 'Apakah ada bukti Moissanite asli?' : 'Is there proof it is real Moissanite?'}</div>
            <div className="faq-a">
              {lang === 'id' 
                ? 'Setiap perhiasan kami dilengkapi dengan sertifikat keaslian Moissanite yang menjamin kualitas batu dan spesifikasinya.' 
                : 'Each piece of our jewelry comes with a certificate of Moissanite authenticity that guarantees the stone quality and specifications.'}
              <img src={certiImage} alt="Certificate" className="tester-img" />
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-q">💎 {lang === 'id' ? 'Apakah lolos Diamond Tester?' : 'Does it pass Diamond Tester?'}</div>
            <div className="faq-a">
              {lang === 'id' 
                ? 'Ya, batu Moissanite kami memiliki konduktivitas termal yang sama dengan berlian, sehingga dijamin lolos Diamond Tester.' 
                : 'Yes, our Moissanite stones have the same thermal conductivity as diamonds, guaranteed to pass the Diamond Tester.'}
              <img src={testpenImage} alt="Diamond Tester" className="tester-img" />
            </div>
          </div>
        </div>

        {/* KEUNGGULAN */}
        <div className="section-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>⚡ Kenapa Produk Ini Luar Biasa?</div>
        <div className="section-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>⚡ Why This Ring Is Exceptional</div>

        <div className="feature-grid">
          <div className="feature-card gold-card">
            <div style={{ fontSize: '32px' }}>💎</div>
            <div>
              <div className="fc-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>Moissanite 3 Carat · Kilau Melebihi Berlian</div>
              <div className="fc-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>Moissanite 3 Carat · Outshines Diamond</div>
              <div className="fc-desc" style={{ display: lang === 'id' ? 'block' : 'none' }}>Batu permata premium yang memiliki indeks bias lebih tinggi dari berlian asli. Ditangkap cahaya dari sudut manapun — selalu bersinar spektakuler.</div>
              <div className="fc-desc" style={{ display: lang === 'en' ? 'block' : 'none' }}>Premium gemstone with higher refractive index than real diamond. Catches light at every angle — always spectacular brilliance.</div>
            </div>
          </div>

          <div className="feature-card">
            <div className="fc-icon">🥈</div>
            <div className="fc-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>Silver 925<br />Bersertifikat</div>
            <div className="fc-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>Certified<br />925 Silver</div>
            <div className="fc-desc" style={{ display: lang === 'id' ? 'block' : 'none' }}>Perak murni 92.5% – standar perhiasan internasional. Anti-kusam, tahan lama.</div>
            <div className="fc-desc" style={{ display: lang === 'en' ? 'block' : 'none' }}>92.5% pure silver – international jewelry standard. Tarnish-resistant & durable.</div>
          </div>

          <div className="feature-card">
            <div className="fc-icon">✨</div>
            <div className="fc-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>Lapis<br />White Gold</div>
            <div className="fc-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>White Gold<br />Plating</div>
            <div className="fc-desc" style={{ display: lang === 'id' ? 'block' : 'none' }}>Lapisan white gold premium memberikan tampilan mewah seperti platinum.</div>
            <div className="fc-desc" style={{ display: lang === 'en' ? 'block' : 'none' }}>Premium white gold plating gives a platinum-level luxurious look.</div>
          </div>

          <div className="feature-card">
            <div className="fc-icon">🌏</div>
            <div className="fc-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>Kualitas<br />Export Asia</div>
            <div className="fc-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>Asia Export<br />Quality</div>
            <div className="fc-desc" style={{ display: lang === 'id' ? 'block' : 'none' }}>Diekspor ke 12+ negara Asia. Standar QC ketat & dikemas premium.</div>
            <div className="fc-desc" style={{ display: lang === 'en' ? 'block' : 'none' }}>Exported to 12+ Asian countries. Strict QC standards & premium packaging.</div>
          </div>
        </div>

        {/* RAMADHAN BADGE */}
        <div className="ramadhan-badge">
          <div className="rb-emoji">☪️ 🌙 ✨</div>
          <div className="rb-text" style={{ display: lang === 'id' ? 'block' : 'none' }}>Hadiah Terbaik Ramadhan 1446 H</div>
          <div className="rb-text" style={{ display: lang === 'en' ? 'block' : 'none' }}>The Perfect Ramadhan 1446 H Gift</div>
          <div className="rb-sub" style={{ display: lang === 'id' ? 'block' : 'none' }}>Untuk yang tercinta – kemewahan yang bisa dijangkau semua orang</div>
          <div className="rb-sub" style={{ display: lang === 'en' ? 'block' : 'none' }}>For your loved ones – luxury that everyone can afford</div>
        </div>

        {/* CHECKOUT FORM */}
        <div className="checkout-form">
          <div className="form-title" style={{ display: lang === 'id' ? 'block' : 'none' }}>📋 Isi Data Pengiriman</div>
          <div className="form-title" style={{ display: lang === 'en' ? 'block' : 'none' }}>📋 Order Details</div>

          {/* DYNAMIC FORM RENDER BASED ON LANG */}
          {lang === 'id' ? (
            <>
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input className="form-input" type="text" placeholder="Nama penerima" value={userName} onChange={e => setUserName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email (Opsional)</label>
                <input className="form-input" type="email" placeholder="contoh@email.com" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Nomor WhatsApp</label>
                <input className="form-input" type="tel" id="phone-input" placeholder="08..." value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Provinsi</label>
                <select className="form-input" value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)}>
                  <option value="">Pilih Provinsi</option>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Kota / Kabupaten</label>
                <input className="form-input" type="text" placeholder="Contoh: Jakarta Selatan" value={kota} onChange={e => setKota(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Kecamatan</label>
                <input className="form-input" type="text" placeholder="Contoh: Tebet" value={kecamatan} onChange={e => setKecamatan(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Alamat Lengkap</label>
                <input className="form-input" type="text" id="address-input" placeholder="Jl. Sudirman No. 123..." value={userAddress} onChange={e => setUserAddress(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Kode Pos</label>
                <input className="form-input" type="text" placeholder="12810" value={kodePos} onChange={e => setKodePos(e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" placeholder="Recipient name" value={userName} onChange={e => setUserName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp / Phone Number</label>
                <input className="form-input" type="tel" id="phone-input" placeholder="+65 / +60..." value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input className="form-input" type="text" placeholder="e.g. Singapore, Malaysia" value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">State / Province</label>
                <input className="form-input" type="text" placeholder="State/Region" value={kota} onChange={e => setKota(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" type="text" placeholder="City" value={kecamatan} onChange={e => setKecamatan(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input className="form-input" type="text" placeholder="Postal Code" value={kodePos} onChange={e => setKodePos(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input className="form-input" type="text" id="address-input" placeholder="Street name, Building, Unit No." value={userAddress} onChange={e => setUserAddress(e.target.value)} />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>Pilih Tipe Cincin</label>
            <label className="form-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>Select Ring Type</label>
            <div className="pay-opts">
              <div className={`pay-opt ${ringType === 'single' ? 'active' : ''}`} onClick={() => setRingType('single')}>
                <div className="po-icon">💍</div>
                <div className="po-label">Single Ring</div>
                <div style={{fontSize:'10px', color:'var(--gold)', marginTop:'2px'}}>{lang==='id'?'Rp 500.000':'SGD 45'}</div>
              </div>
              <div className={`pay-opt ${ringType === 'couple' ? 'active' : ''}`} onClick={() => setRingType('couple')}>
                <div className="po-icon">👩‍❤️‍👨</div>
                <div className="po-label">Couple Ring</div>
                <div style={{fontSize:'10px', color:'var(--gold)', marginTop:'2px'}}>{lang==='id'?'Rp 900.000':'SGD 80'}</div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                {lang === 'id' ? 'Ukuran Cincin' : 'Ring Size'}
              </label>
              <div style={{ display: 'flex', background: '#eee', borderRadius: '20px', padding: '2px' }}>
                <button 
                  onClick={() => setSizeStandard('US')}
                  style={{ 
                    border: 'none', 
                    background: sizeStandard === 'US' ? 'var(--deep)' : 'transparent', 
                    color: sizeStandard === 'US' ? 'white' : '#666',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >US</button>
                <button 
                  onClick={() => setSizeStandard('Indo')}
                  style={{ 
                    border: 'none', 
                    background: sizeStandard === 'Indo' ? 'var(--deep)' : 'transparent', 
                    color: sizeStandard === 'Indo' ? 'white' : '#666',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >Indo</button>
              </div>
            </div>
            <div className="size-row">
              {sizeMapping.map(item => {
                const isSoldOut = ['5', '9', '10'].includes(item.us);
                const label = sizeStandard === 'US' ? item.us : item.indo;
                return (
                  <button 
                    key={item.us} 
                    className={`size-btn ${size === item.us ? 'active' : ''} ${isSoldOut ? 'sold-out' : ''}`} 
                    onClick={() => !isSoldOut && setSize(item.us)}
                    disabled={isSoldOut}
                  >
                    <span>{label}</span>
                    {isSoldOut && <span className="so-tag">SOLD</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>Jumlah</label>
            <label className="form-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>Quantity</label>
            <div className="qty-row">
              <button className="qty-btn" onClick={() => changeQty(-1)}>−</button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" onClick={() => changeQty(1)}>+</button>
              <span style={{ fontSize: '12px', color: '#8B6914' }}>
                {lang === 'id' ? `= Rp ${(priceID * qty).toLocaleString('id-ID')}` : `= SGD ${priceEN * qty}`}
              </span>
            </div>
          </div>

          {/* PAYMENT METHOD (EN) */}
          {lang === 'en' && (
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <div className="pay-opts">
                <div className={`pay-opt ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                  <div className="po-icon">🚪</div>
                  <div className="po-label">COD</div>
                </div>
                <div className={`pay-opt ${paymentMethod === 'paypal' ? 'active' : ''}`} onClick={() => setPaymentMethod('paypal')}>
                  <div className="po-icon">💳</div>
                  <div className="po-label">PayPal / Card</div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#1E6B3C', marginTop: '6px', fontWeight: 600 }}>✅ COD available for Singapore, Malaysia & selected countries</div>
            </div>
          )}

          {/* PAYMENT METHOD ID */}
          {lang === 'id' && (
            <div className="form-group">
              <label className="form-label">Metode Pembayaran</label>
              <div className="pay-opts">
                <div className={`pay-opt ${paymentMethod === 'bca_manual' ? 'active' : ''}`} onClick={() => setPaymentMethod('bca_manual')}>
                  <div className="po-icon">🏦</div>
                  <div className="po-label">Manual Transfer BCA</div>
                </div>
                <div className={`pay-opt ${paymentMethod === 'qris' ? 'active' : ''}`} onClick={() => setPaymentMethod('qris')}>
                  <div className="po-icon">💠</div>
                  <div className="po-label">QRIS (GoPay/Dana/All Bank)</div>
                </div>
              </div>
              {paymentMethod === 'qris' && <div style={{fontSize:'11px', color:'#1E6B3C', marginTop:'6px', fontWeight:600}}>✅ Cukup Screenshot Bukti Bayar</div>}
            </div>
          )}

          {/* CTA BUTTONS */}
          <button className="cta-btn cta-primary" onClick={submitOrder} disabled={loading}>
            {loading ? 'MEMPROSES... ⏳' : (lang === 'id' ? `✨ ORDER NOW — HANYA Rp ${(priceID * qty).toLocaleString('id-ID')}` : `✨ ORDER NOW — SGD ${priceEN * qty} ONLY`)}
          </button>

          <button className="cta-wa" onClick={openWA}>
            <span>💬</span>
            <span style={{ display: lang === 'id' ? 'inline' : 'none' }}>Tanya Dulu via WhatsApp</span>
            <span style={{ display: lang === 'en' ? 'inline' : 'none' }}>Chat Us on WhatsApp</span>
          </button>

          <div className="trust-strip">
            <div className="trust-item">
              <div className="trust-icon">🔒</div>
              <div className="trust-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>Transaksi<br />Aman</div>
              <div className="trust-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>Secure<br />Payment</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🚚</div>
              <div className="trust-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>Free Ongkir<br />Seluruh Asia</div>
              <div className="trust-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>Free Ship<br />All Asia</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">↩️</div>
              <div className="trust-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>Garansi<br />30 Hari</div>
              <div className="trust-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>30-Day<br />Guarantee</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">⭐</div>
              <div className="trust-label" style={{ display: lang === 'id' ? 'block' : 'none' }}>5000+<br />Pembeli</div>
              <div className="trust-label" style={{ display: lang === 'en' ? 'block' : 'none' }}>5000+<br />Buyers</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
