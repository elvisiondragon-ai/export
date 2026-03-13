import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import fitfactorImage from '@/assets/fitfactor.jpg';
import qrisBcaImage from '@/assets/qrisbca.jpeg';
import { ArrowLeft, Copy, CreditCard, User, Mail, Phone, Home, Plus, Minus, Sparkles, BookOpen, Music, Zap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';
import { getFbcFbpCookies, getClientIp } from '@/utils/fbpixel';
import { WhatsAppButton } from '@/components/WhatsAppButton';

// --- Embedded Adress Component for Indonesia ---
const provinces = [
  "Aceh", "Sumatra Utara", "Sumatra Barat", "Riau", "Kepulauan Riau", "Jambi", "Sumatra Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung",
  "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Gorontalo", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Maluku Utara", "Maluku", "Papua Barat", "Papua Barat Daya", "Papua", "Papua Tengah", "Papua Pegunungan", "Papua Selatan"
];

const AdressID = ({
  selectedProvince, setSelectedProvince, userAddress, setUserAddress,
  kota, setKota, kecamatan, setKecamatan, kodePos, setKodePos
}: any) => (
  <>
    <div><Label htmlFor="selectedProvince"><Home className="inline-block w-4 h-4 mr-2" />Provinsi</Label>
      <Select onValueChange={setSelectedProvince} value={selectedProvince}>
        <SelectTrigger className="w-full"><SelectValue placeholder="Pilih Provinsi" /></SelectTrigger>
        <SelectContent><SelectGroup><SelectLabel>Provinsi di Indonesia</SelectLabel>
          {provinces.map((province) => (<SelectItem key={province} value={province}>{province}</SelectItem>))}
        </SelectGroup></SelectContent></Select></div>
    <div><Label htmlFor="kota"><Home className="inline-block w-4 h-4 mr-2" />Kota</Label><Input id="kota" value={kota} onChange={(e) => setKota(e.target.value)} placeholder="Contoh: Jakarta Timur" required /></div>
    <div><Label htmlFor="kecamatan"><Home className="inline-block w-4 h-4 mr-2" />Kecamatan</Label><Input id="kecamatan" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} placeholder="Contoh: Duren Sawit" required /></div>
    <div><Label htmlFor="userAddress"><Home className="inline-block w-4 h-4 mr-2" />Alamat Pengiriman</Label><Input id="userAddress" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder="Jl. Pahlawan No. 123" required /></div>
    <div><Label htmlFor="kodePos"><Home className="inline-block w-4 h-4 mr-2" />Kode Pos</Label><Input id="kodePos" value={kodePos} onChange={(e) => setKodePos(e.target.value)} placeholder="Contoh: 13440" required /></div>
  </>
);

export default function FitFactorPaymentPageID() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const affiliateRef = searchParams.get('id');
  const { toast } = useToast();
  const PIXEL_ID = '1797660474333865';

  const productName = 'FitFactor Herbal';
  const basePrice = 200000;

  const [quantity, setQuantity] = useState(3);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kodePos, setKodePos] = useState('');

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('QRIS');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

  const paymentMethods = [
    { code: 'BCA_MANUAL', name: 'Manual Transfer BCA', description: '' },
    { code: 'COD', name: 'Bayar di Tempat (COD)', description: 'Bayar saat barang sampai (Format Alamat Lengkap)' },
    { code: 'QRIS', name: 'QRIS', description: 'Bayar ke Semua Bank, DANA, OVO, SHOPEEPAY' },
    { code: 'BCAVA', name: 'BCA Virtual Account', description: 'Transfer via BCA Virtual Account' },
    { code: 'BNIVA', name: 'BNI Virtual Account', description: 'Transfer via BNI Virtual Account' },
    { code: 'BRIVA', name: 'BRI Virtual Account', description: 'Transfer via BRI Virtual Account' },
    { code: 'MANDIRIVA', name: 'Mandiri Virtual Account', description: 'Transfer via Mandiri Virtual Account' },
  ];

  const getTieredPrice = (qty: number) => {
    if (qty === 3) return 360000;
    if (qty === 6) return 660000;
    if (qty === 9) return 900000;
    return 200000 * qty;
  };

  const totalAmount = getTieredPrice(quantity);
  const originalTotalAmount = basePrice * quantity;
  const isAnyDiscountApplied = totalAmount < originalTotalAmount;
  const discountAmount = originalTotalAmount - totalAmount;

  const sendCapiEvent = async (eventName: string, eventData: any, eventId?: string) => {
    try {
      const { fbc, fbp } = getFbcFbpCookies();
      const userData: any = { client_user_agent: navigator.userAgent, fbc, fbp };
      if (userEmail) userData.em = userEmail;
      if (userName) userData.fn = userName.trim().split(/\s+/)[0];
      if (phoneNumber) userData.ph = phoneNumber;
      if (affiliateRef) userData.external_id = affiliateRef;
      await supabase.functions.invoke('capi-universal', { body: { pixelId: PIXEL_ID, eventName, customData: eventData, eventId, eventSourceUrl: window.location.href, userData } });
    } catch (err) { console.error('CAPI Error:', err); }
  };

  useEffect(() => {
    sendCapiEvent('AddToCart', { content_name: productName, value: totalAmount, currency: 'IDR' }, `addtocart-${Date.now()}`);
  }, []);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const copyToClipboard = (text: string) => { navigator.clipboard.writeText(text); toast({ title: "Berhasil Disalin" }); };

  const handleCreatePayment = async () => {
    if (!userName || !userEmail || !phoneNumber || !userAddress || !selectedProvince || !kota || !kecamatan || !kodePos) {
      toast({ title: "Data Tidak Lengkap", variant: "destructive" });
      return;
    }
    setLoading(true);
    sendCapiEvent('AddPaymentInfo', { content_name: productName, value: totalAmount, currency: 'IDR' }, `addpaymentinfo-${Date.now()}`);
    const fullAddress = `${userAddress}, ${kecamatan}, ${kota}, ${selectedProvince}, ${kodePos}`;
    const { fbc, fbp } = getFbcFbpCookies();
    const clientIp = await getClientIp();

    try {
      const { data, error } = await supabase.functions.invoke('tripay-create-payment', {
        body: {
          subscriptionType: 'fitfactor', paymentMethod: selectedPaymentMethod, userName, userEmail, phoneNumber,
          address: fullAddress, province: selectedProvince, kota, kecamatan, kodePos, amount: totalAmount, quantity: 1,
          productName: `${productName} (x${quantity})`, affiliateRef, fbc, fbp, clientIp
        }
      });
      if (data?.success) { setPaymentData(data); setShowPaymentInstructions(true); }
      else if (selectedPaymentMethod === 'BCA_MANUAL' || selectedPaymentMethod === 'COD') { 
        setPaymentData({ 
          paymentMethod: selectedPaymentMethod, 
          amount: totalAmount, 
          status: 'UNPAID', 
          tripay_reference: `${selectedPaymentMethod === 'COD' ? 'COD' : 'MANUAL'}-${Date.now()}` 
        }); 
        setShowPaymentInstructions(true); 
      }
      else { toast({ title: "Error", description: data?.error || error?.message || "Gagal", variant: "destructive" }); }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  if (showPaymentInstructions && paymentData) {
    return (
      <div className="min-h-screen bg-background pb-32 p-6">
        <Toaster /><Button variant="ghost" size="icon" onClick={() => setShowPaymentInstructions(false)}><ArrowLeft className="w-5 h-5" /></Button>
        <h1 className="text-2xl font-bold font-exo bg-gradient-primary bg-clip-text text-transparent mt-4 mb-6">Instruksi Pembayaran</h1>
        <div className="space-y-6">
          <Card><CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center"><Label className="text-muted-foreground font-bold">NOMOR REFERENSI</Label><span className="font-mono font-bold text-primary">{paymentData.tripay_reference}</span></div>
            <div className="flex justify-between items-center"><Label className="text-muted-foreground">Total Pembayaran</Label><span className="font-bold text-lg text-primary">{formatCurrency(paymentData.amount)}</span></div>
          </CardContent></Card>
          {paymentData.paymentMethod === 'BCA_MANUAL' && (
            <Card><CardHeader><CardTitle>Transfer Manual BCA</CardTitle></CardHeader><CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-secondary p-3 rounded-md"><span className="font-mono text-lg font-bold">7751146578</span><Button variant="ghost" size="icon" onClick={() => copyToClipboard('7751146578')}><Copy className="w-5 h-5" /></Button></div>
              <p className="font-bold text-center">Delia Mutia</p><div className="flex justify-center"><img src={qrisBcaImage} alt="QRIS BCA" className="w-64 h-64 border rounded-lg" /></div>
              <a href={`https://wa.me/62895325633487?text=${encodeURIComponent(`Halo kak, saya sudah bayar FitFactor. Ref: ${paymentData.tripay_reference}`)}`} target="_blank" rel="noopener noreferrer" className="w-full"><Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg"><FaWhatsapp className="mr-2" /> Konfirmasi CS</Button></a>
            </CardContent></Card>
          )}
          {paymentData.paymentMethod === 'COD' && (
            <Card><CardHeader><CardTitle>Pesanan COD Berhasil</CardTitle></CardHeader><CardContent className="space-y-4">
              <p className="text-center font-bold">Pesanan Anda telah kami terima dan akan segera diproses.</p>
              <p className="text-center text-sm text-muted-foreground">Tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi pengiriman. Pembayaran dilakukan saat barang sampai di rumah Anda.</p>
              <a href={`https://wa.me/62895325633487?text=${encodeURIComponent(`Halo Kak, saya sudah order FitFactor (x${quantity}) metode COD. Ref: ${paymentData.tripay_reference}`)}`} target="_blank" rel="noopener noreferrer" className="w-full"><Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg"><FaWhatsapp className="mr-2" /> Hubungi CS</Button></a>
            </CardContent></Card>
          )}
          {paymentData.payCode && (<Card><CardContent className="pt-6"><div className="flex items-center justify-between bg-secondary p-3 rounded-md"><span className="font-mono text-xl font-bold text-primary">{paymentData.payCode}</span><Button variant="ghost" size="icon" onClick={() => copyToClipboard(paymentData.payCode)}><Copy className="w-5 h-5" /></Button></div></CardContent></Card>)}
          {paymentData.qrUrl && (<Card><CardContent className="flex justify-center pt-6"><img src={paymentData.qrUrl} alt="QR" className="w-64 h-64 border rounded-lg" /></CardContent></Card>)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Toaster />
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => navigate('/')}><ArrowLeft className="w-5 h-5" /></Button><h1 className="text-2xl font-bold font-exo bg-gradient-primary bg-clip-text text-transparent">Checkout FitFactor</h1></div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Negara Tujuan: Indonesia</span>
            <div className="flex bg-secondary p-1 rounded-lg border border-gold/10"><button className="px-4 py-1.5 text-xs font-bold rounded-md bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-amber-950 shadow-md">IDR</button></div>
          </div>
        </div>
      </div>
      <div className="px-6 space-y-6">
        <Card><CardHeader><CardTitle>Rangkuman Pesanan</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="flex justify-center my-4"><img src={fitfactorImage} alt="FitFactor" className="w-48 h-48 object-contain" /></div>
          <Separator /><div className="flex justify-between items-center"><Label htmlFor="quantity" className="text-muted-foreground">Kuantitas</Label><div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleDecrement}><Minus className="h-4 w-4" /></Button>
            <span className="font-bold text-lg w-10 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={handleIncrement}><Plus className="h-4 w-4" /></Button>
          </div></div>
          <div className="text-sm font-medium text-blue-600 text-center bg-blue-50 p-2 rounded-md">{quantity < 3 ? "Beli 3 Box atau lebih untuk Harga Lebih Hemat!" : `✨ Bundle ${quantity} Box Berhasil: Diskon & FREE Ongkir aktif!`}</div>
          <Separator /><div className="flex justify-between items-center"><Label className="text-muted-foreground">Subtotal</Label><span className={isAnyDiscountApplied ? "line-through opacity-50" : "font-medium"}>{formatCurrency(originalTotalAmount)}</span></div>
          {isAnyDiscountApplied && <div className="flex justify-between items-center text-green-600 font-bold"><Label className="text-green-600">Diskon</Label><span>-{formatCurrency(discountAmount)}</span></div>}
          <div className="flex justify-between items-center"><Label className="text-muted-foreground">Ongkos Kirim</Label><span className="text-green-600 font-bold">FREE</span></div>
          <Separator /><div className="flex justify-between items-center"><div className="flex flex-col"><Label className="text-lg font-bold">Total Harga (IDR)</Label>
            {isAnyDiscountApplied && <span className="text-[10px] font-black text-green-600 animate-pulse tracking-widest bg-green-100 px-2 py-0.5 rounded-full w-fit mt-1 uppercase">✨ Discount Diaktifkan</span>}
          </div><div className="text-right"><span className={`font-bold text-xl text-primary`}>{formatCurrency(totalAmount)}</span></div>
          </div>
        </CardContent></Card>

        <div className="bg-slate-900 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl border border-slate-800">
          <h4 className="font-black text-white text-lg flex items-center gap-3 uppercase tracking-tight"><Sparkles className="h-5 w-5 text-primary" /> Apa yang Anda Dapatkan:</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-4"><div className="mt-1 bg-primary/20 p-1.5 rounded-full"><Zap className="h-4 w-4 text-primary" /></div><p className="text-base text-slate-200 font-medium leading-relaxed"><b className="text-white">{quantity} Botol Fit Factor Imun Booster</b> (30 kapsul · konsumsi 2 kapsul per hari)</p></li>
            <li className="flex items-start gap-4"><div className="mt-1 bg-primary/20 p-1.5 rounded-full"><BookOpen className="h-4 w-4 text-primary" /></div><p className="text-base text-slate-200 font-medium leading-relaxed"><b className="text-white">Panduan Konsumsi & Jadwal Minum</b> (digital, dikirim via WhatsApp setelah order)</p></li>
            <li className="flex items-start gap-4"><div className="mt-1 bg-primary/20 p-1.5 rounded-full"><Music className="h-4 w-4 text-primary" /></div><p className="text-base text-slate-200 font-medium leading-relaxed"><b className="text-white">Tips Gaya Hidup Sehat Pendukung Imunitas</b> (pola makan, tidur, dan aktivitas harian)</p></li>
          </ul>
          <div className="pt-6 space-y-2 border-t border-slate-800"><p className="text-sm font-black text-primary flex items-center gap-2 uppercase tracking-tighter"><Zap className="h-4 w-4" /> MENGAPA FORMULA INI BERBEDA:</p><p className="text-xs leading-relaxed text-slate-400 font-medium italic">"Fit Factor menggabungkan 5 tanaman herbal unggulan yang telah digunakan dalam pengobatan tradisional Indonesia selama ratusan tahun — kini diformulasikan dengan standar produksi modern dan telah mendapat sertifikasi BPOM, sehingga manfaatnya terjamin konsisten di setiap kapsul."</p></div>
        </div>

        <Card><CardHeader><CardTitle>Informasi Pengiriman</CardTitle></CardHeader><CardContent className="space-y-4">
          <Input placeholder="Nama Lengkap" value={userName} onChange={e => setUserName(e.target.value)} />
          <Input placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
          <Input placeholder="Nomor Telepon" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          <AdressID selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince} userAddress={userAddress} setUserAddress={setUserAddress} kota={kota} setKota={setKota} kecamatan={kecamatan} setKecamatan={setKecamatan} kodePos={kodePos} setKodePos={setKodePos} />
        </CardContent></Card>

        <Card><CardHeader><CardTitle>Metode Pembayaran</CardTitle></CardHeader><CardContent><RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-3">
          {paymentMethods.map((method) => (
            <Label key={method.code} htmlFor={method.code} className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-all ${selectedPaymentMethod === method.code ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-border'}`}>
              <div className="flex items-center space-x-3"><RadioGroupItem value={method.code} id={method.code} /><div className="flex-1"><span className="font-bold">{method.name}</span><p className="text-xs text-muted-foreground">{method.description || "Instan & Aman"}</p></div></div>
            </Label>))}
        </RadioGroup></CardContent></Card>

        <div className="fixed bottom-20 left-6 right-6">
          <Button onClick={handleCreatePayment} disabled={loading} className="w-full h-14 text-xl font-bold shadow-xl transition-all active:scale-95 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-amber-900 border-none hover:opacity-90">
            {loading ? <div className="w-6 h-6 border-4 border-amber-900/30 border-t-amber-900 rounded-full animate-spin mr-2" /> : <CreditCard className="w-4 h-4 mr-2" />}
            {loading ? 'Memproses...' : `Bayar Sekarang (${formatCurrency(totalAmount)})`}
          </Button>
        </div>
        <footer className="mt-8 px-6 text-center pb-10"><div className="pt-6 border-t border-slate-200"><p className="text-slate-500 text-xs font-semibold">© 2026 eL Vision Group. All Rights Reserved.</p></div></footer>
      </div><WhatsAppButton />
    </div>
  );
}
