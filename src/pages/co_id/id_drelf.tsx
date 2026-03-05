import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import drelfImage from '@/assets/drelf.png';
import drelf1 from '@/assets/drelf/1.webp';
import drelf2 from '@/assets/drelf/2.webp';
import drelf3 from '@/assets/drelf/3.webp';
import drelf20 from '@/assets/drelf/drelf_umur20_v2_1772719855712.png';
import drelf30 from '@/assets/drelf/drelf_umur30_v1.png';
import drelf40 from '@/assets/drelf/drelf_umur40_v1.png';
import drelf50 from '@/assets/drelf/drelf_umur50_v1.png';
import drelf60 from '@/assets/drelf/drelf_umur60_v2_1772719902099.png';
import qrisBcaImage from '@/assets/qrisbca.jpeg';
import { ArrowLeft, Copy, CreditCard, User, Mail, Phone, Home, Plus, Minus, BookOpen, Music, Zap } from 'lucide-react';
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
    <div>
      <Label htmlFor="selectedProvince"><Home className="inline-block w-4 h-4 mr-2" />Provinsi</Label>
      <Select onValueChange={setSelectedProvince} value={selectedProvince}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Provinsi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Provinsi di Indonesia</SelectLabel>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>{province}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="kota"><Home className="inline-block w-4 h-4 mr-2" />Kota</Label>
      <Input id="kota" value={kota} onChange={(e) => setKota(e.target.value)} placeholder="Contoh: Jakarta Timur" required />
    </div>
    <div>
      <Label htmlFor="kecamatan"><Home className="inline-block w-4 h-4 mr-2" />Kecamatan</Label>
      <Input id="kecamatan" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} placeholder="Contoh: Duren Sawit" required />
    </div>
    <div>
      <Label htmlFor="userAddress"><Home className="inline-block w-4 h-4 mr-2" />Alamat Pengiriman</Label>
      <Input id="userAddress" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder="Jl. Pahlawan No. 123" required />
    </div>
    <div>
      <Label htmlFor="kodePos"><Home className="inline-block w-4 h-4 mr-2" />Kode Pos</Label>
      <Input id="kodePos" value={kodePos} onChange={(e) => setKodePos(e.target.value)} placeholder="Contoh: 13440" required />
    </div>
  </>
);

export default function DrelfPaymentPageID() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const affiliateRef = searchParams.get('id');
  const { toast } = useToast();
  const PIXEL_ID = '1749197952320359';

  const productName = 'Drelf Collagen';
  const price = 600000;

  const [quantity, setQuantity] = useState(1);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kodePos, setKodePos] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('QRIS');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

  // --- CAPI Helper ---
  const sendCapiEvent = async (eventName: string, eventData: any, eventId?: string) => {
    try {
      const { fbc, fbp } = getFbcFbpCookies();
      const userData: any = {
        client_user_agent: navigator.userAgent,
        fbc,
        fbp
      };

      if (userEmail) userData.em = userEmail;
      if (userName) {
        const nameParts = userName.trim().split(/\s+/);
        userData.fn = nameParts[0];
        if (nameParts.length > 1) userData.ln = nameParts.slice(1).join(' ');
      }
      if (phoneNumber) userData.ph = phoneNumber;
      if (affiliateRef) userData.external_id = affiliateRef;

      await supabase.functions.invoke('capi-universal', {
        body: {
          pixelId: PIXEL_ID,
          eventName,
          customData: eventData,
          eventId: eventId,
          eventSourceUrl: window.location.href,
          userData
        }
      });
    } catch (err) {
      console.error('CAPI Error:', err);
    }
  };

  useEffect(() => {
    // Track AddToCart on Page Load (CAPI Only)
    const eventId = `addtocart-${Date.now()}`;
    sendCapiEvent('AddToCart', {
      content_name: 'Drelf Collagen ID',
      value: price,
      currency: 'IDR'
    }, eventId);
  }, []);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(isPromoApplied ? 3 : 1, prev - 1));

  const originalTotalAmount = price * quantity;
  const autoDiscountPercentage = 0;
  const activeDiscountPercentage = isPromoApplied ? discountPercentage : autoDiscountPercentage;
  const isAnyDiscountApplied = activeDiscountPercentage > 0;

  const discountAmount = originalTotalAmount * activeDiscountPercentage;
  const totalAmount = originalTotalAmount - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FEMININE') {
      setDiscountPercentage(0.7);
      setIsPromoApplied(true);
      if (quantity < 3) setQuantity(3);
      toast({ title: "Kode Promo Berhasil!", description: "Diskon 70% diterapkan." });
    } else {
      setDiscountPercentage(0);
      setIsPromoApplied(false);
      toast({ title: "Kode Promo Tidak Valid", variant: "destructive" });
    }
  };

  const paymentMethods = [
    { code: 'BCA_MANUAL', name: 'Manual Transfer BCA', description: '' },
    { code: 'QRIS', name: 'QRIS', description: 'Bayar ke Semua Bank, DANA, OVO, SHOPEEPAY' },
    { code: 'BCAVA', name: 'BCA Virtual Account', description: 'Transfer via BCA Virtual Account' },
    { code: 'BNIVA', name: 'BNI Virtual Account', description: 'Transfer via BNI Virtual Account' },
    { code: 'BRIVA', name: 'BRI Virtual Account', description: 'Transfer via BRI Virtual Account' },
    { code: 'MANDIRIVA', name: 'Mandiri Virtual Account', description: 'Transfer via Mandiri Virtual Account' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Berhasil Disalin" });
  };

  const handleCreatePayment = async () => {
    if (!userName || !userEmail || !phoneNumber || !userAddress || !selectedProvince || !kota || !kecamatan || !kodePos) {
      toast({ title: "Data Tidak Lengkap", variant: "destructive" });
      return;
    }

    setLoading(true);

    // Track AddPaymentInfo (CAPI Only)
    const apiEventId = `addpaymentinfo-${Date.now()}`;
    sendCapiEvent('AddPaymentInfo', {
      content_name: productName,
      value: totalAmount,
      currency: 'IDR'
    }, apiEventId);

    const fullAddress = `${userAddress}, ${kecamatan}, ${kota}, ${selectedProvince}, ${kodePos}`;
    const { fbc, fbp } = getFbcFbpCookies();
    const clientIp = await getClientIp();

    try {
      const { data, error } = await supabase.functions.invoke('tripay-create-payment', {
        body: {
          subscriptionType: 'drelf',
          paymentMethod: selectedPaymentMethod,
          userName, userEmail, phoneNumber,
          address: fullAddress, province: selectedProvince, kota, kecamatan, kodePos,
          amount: totalAmount,
          quantity,
          productName: productName + (isPromoApplied ? ' (Promo FEMININE)' : (autoDiscountPercentage > 0 ? ' (Promo 50%)' : '')),
          affiliateRef: isPromoApplied ? null : affiliateRef,
          fbc, fbp, clientIp
        }
      });

      if (data?.success) {
        setPaymentData(data);
        setShowPaymentInstructions(true);
      } else if (selectedPaymentMethod === 'BCA_MANUAL') {
        setPaymentData({ paymentMethod: 'BCA_MANUAL', amount: totalAmount, status: 'UNPAID', tripay_reference: `MANUAL-${Date.now()}` });
        setShowPaymentInstructions(true);
      } else {
        toast({ title: "Error", description: data?.error || error?.message || "Gagal", variant: "destructive" });
      }
    } catch (error: any) {
      console.error(error);
      if (selectedPaymentMethod === 'BCA_MANUAL') {
        setPaymentData({ paymentMethod: 'BCA_MANUAL', amount: totalAmount, status: 'UNPAID', tripay_reference: `MANUAL-${Date.now()}` });
        setShowPaymentInstructions(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (showPaymentInstructions && paymentData) {
    return (
      <div className="min-h-screen bg-background pb-32">
        <Toaster />
        <div className="max-w-md mx-auto">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setShowPaymentInstructions(false)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold font-exo bg-gradient-primary bg-clip-text text-transparent">
                Instruksi Pembayaran
              </h1>
            </div>
          </div>

          <div className="px-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detail Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-muted-foreground font-bold">NOMOR REFERENSI</Label>
                  <span className="font-mono font-bold text-primary">{paymentData.tripay_reference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-muted-foreground">Status</Label>
                  <span className={`font-medium ${paymentData.status === 'UNPAID' ? 'text-orange-500' : 'text-green-500'}`}>
                    {paymentData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-muted-foreground">Metode Pembayaran</Label>
                  <span className="font-medium">{paymentData.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-muted-foreground">Total Pembayaran</Label>
                  <span className="font-bold text-lg text-primary">{formatCurrency(paymentData.amount)}</span>
                </div>
              </CardContent>
            </Card>

            {paymentData.paymentMethod === 'BCA_MANUAL' && (
              <Card>
                <CardHeader>
                  <CardTitle>Transfer Manual BCA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Nomor Rekening</Label>
                    <div className="flex items-center justify-between bg-secondary p-3 rounded-md">
                      <span className="font-mono text-lg font-bold">7751146578</span>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard('7751146578')}>
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Atas Nama</Label>
                    <div className="flex items-center justify-between bg-secondary p-3 rounded-md">
                      <span className="font-bold">Delia Mutia</span>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard('Delia Mutia')}>
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img src={qrisBcaImage} alt="QRIS BCA" className="w-64 h-64 border rounded-lg" />
                  </div>
                  <div className="my-12">
                    <a
                      href={`https://wa.me/62895325633487?text=${encodeURIComponent(`Halo kak, saya sudah bayar Drelf. Ref: ${paymentData.tripay_reference}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg">
                        <FaWhatsapp className="mr-2" /> Konfirmasi ke CS
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentData.payCode && (
              <Card>
                <CardHeader>
                  <CardTitle>Nomor Virtual Account / Kode Bayar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between bg-secondary p-3 rounded-md">
                    <span className="font-mono text-xl font-bold text-primary">{paymentData.payCode}</span>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(paymentData.payCode)}>
                      <Copy className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentData.qrUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <img src={paymentData.qrUrl} alt="QR Code" className="w-64 h-64 border rounded-lg" />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Toaster />
      <div className="max-w-md mx-auto">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold font-exo bg-gradient-primary bg-clip-text text-transparent">
                Checkout Drelf
              </h1>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Negara Tujuan: Indonesia</span>
              <div className="flex bg-secondary p-1 rounded-lg border border-gold/10">
                <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-amber-950 shadow-md">
                  IDR
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rangkuman Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-muted-foreground">Produk</Label>
                <span className="font-medium">{productName}</span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x justify-start md:justify-center">
                <div className="min-w-[80%] md:min-w-[350px] max-w-[350px] aspect-square snap-center flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                  <img src={drelfImage} alt="Drelf Product" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-[80%] md:min-w-[350px] max-w-[350px] aspect-square snap-center flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                  <img src={drelf1} alt="Drelf Detail 1" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="min-w-[80%] md:min-w-[350px] max-w-[350px] aspect-square snap-center flex justify-center items-center bg-slate-50 rounded-2xl p-4">
                  <img src={drelf2} alt="Drelf Detail 2" className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div className="flex justify-between items-center">
                <Label className="font-bold text-base">Jumlah</Label>
                <div className="flex items-center gap-3 bg-secondary rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-background border border-border shadow-sm active:scale-95 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-black text-lg">{quantity}</span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <Label className="text-lg font-bold">Total Harga (IDR)</Label>
                  {isAnyDiscountApplied && (
                    <span className="text-[10px] font-black text-green-600 animate-pulse tracking-widest bg-green-100 px-2 py-0.5 rounded-full w-fit mt-1 uppercase">
                      ✨ Discount Diaktifkan
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className={`font-bold text-xl text-primary`}>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isPromoApplied && (
            <div className="px-2">
              <Button
                variant="outline"
                className="w-full border-2 border-pink-500 bg-pink-600 hover:bg-pink-700 text-white font-black py-3 px-4 h-auto flex flex-col gap-1 shadow-[0_0_20px_rgba(219,39,119,0.4)] animate-pulse active:scale-95 transition-all rounded-2xl"
                onClick={() => {
                  setDiscountPercentage(0.7);
                  setIsPromoApplied(true);
                  setQuantity(3);
                  toast({
                    title: "Selamat discount 70% Aktif !",
                    description: "Diskon 70% diterapkan untuk 3 pcs (Hanya Rp 540.000!)"
                  });
                }}
              >
                <span className="text-base flex items-center justify-center gap-2 text-center w-full leading-tight">
                  🎁 Klik Untuk Promo DarkFeminine
                </span>
                <span className="text-[10px] uppercase tracking-widest opacity-90 italic font-black text-center">Discount 70% untuk per 3 pcs !</span>
              </Button>
            </div>
          )}

          {/* WHAT YOU GET SECTION - OUTSIDE OF CARD */}
          <div className="bg-slate-900 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl border border-slate-800">
            <h4 className="font-black text-white text-lg flex items-center gap-3 uppercase tracking-tight">
              ✨ Apa yang Anda Dapatkan:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { img: drelf20, label: "Umur 20+" },
                { img: drelf30, label: "Umur 30+" },
                { img: drelf40, label: "Umur 40+" },
                { img: drelf50, label: "Umur 50+" },
                { img: drelf60, label: "Umur 60+" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                    <div className="h-1 w-8 bg-primary/30 rounded-full" />
                  </div>
                </div>
              ))}

              <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                <img src={drelf2} alt="Drelf Result 1" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                <img src={drelf3} alt="Drelf Result 2" className="w-full h-full object-cover" />
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-primary/20 p-1.5 rounded-full"><Zap className="h-4 w-4 text-primary" /></div>
                <p className="text-base text-slate-200 font-medium leading-relaxed"><b className="text-white">10 Sachet Drelf Premium Collagen</b> (Konsumsi max 1x sehari untuk hasil optimal).</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-primary/20 p-1.5 rounded-full"><BookOpen className="h-4 w-4 text-primary" /></div>
                <p className="text-base text-slate-200 font-medium leading-relaxed"><b className="text-white">Exclusive Beauty Booklet Guidance</b> (Panduan lengkap ritual kecantikan harian).</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-primary/20 p-1.5 rounded-full"><Music className="h-4 w-4 text-primary" /></div>
                <p className="text-base text-slate-200 font-medium leading-relaxed"><b className="text-white">Beauty Hypnosis Audio Ritual</b> (Digital Access yang dikirimkan saat barang sampai).</p>
              </li>
            </ul>

            <div className="pt-6 space-y-2 border-t border-slate-800">
              <p className="text-sm font-black text-primary flex items-center gap-2 uppercase tracking-tighter">
                <Zap className="h-4 w-4" /> High Technology Synchronization
              </p>
              <p className="text-xs leading-relaxed text-slate-400 font-medium italic">
                "Minum Drelf sambil mendengarkan audio hypnosis pendek akan membantu tubuh masuk ke fase deep relaxation. Dalam kondisi ini, nutrisi kolagen terserap sempurna ke seluruh sel tubuh secara lebih cepat dan efektif."
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-2">
                <p className="text-amber-900 text-[10px] font-bold">
                  🛡️ BPOM RI 271282014100002 (HSA equivalent) by PT. SKA
                </p>
                <p className="text-amber-800 text-[10px] leading-relaxed">
                  Satu box berisi 10 sachet. Dosis rekomendasi: 1 sachet per hari. 3 box untuk persediaan 1 bulan agar kecantikan tetap terjaga secara alami.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Informasi Pengiriman</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="userName"><User className="inline-block w-4 h-4 mr-2" />Nama Lengkap</Label>
                <Input id="userName" name="name" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Nama Lengkap" required />
              </div>
              <div>
                <Label htmlFor="userEmail"><Mail className="inline-block w-4 h-4 mr-2" />Email</Label>
                <Input id="userEmail" name="email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="email@example.com" required />
              </div>
              <div>
                <Label htmlFor="phoneNumber"><Phone className="inline-block w-4 h-4 mr-2" />Nomor Telepon</Label>
                <Input id="phoneNumber" name="tel" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="0812..." required />
              </div>
              <AdressID
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
                userAddress={userAddress}
                setUserAddress={setUserAddress}
                kota={kota}
                setKota={setKota}
                kecamatan={kecamatan}
                setKecamatan={setKecamatan}
                kodePos={kodePos}
                setKodePos={setKodePos}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Metode Pembayaran</CardTitle></CardHeader>
            <CardContent>
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-3">
                {paymentMethods.map((method) => (
                  <Label
                    key={method.code}
                    htmlFor={method.code}
                    className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-all ${selectedPaymentMethod === method.code
                      ? 'border-primary shadow-lg ring-1 ring-primary'
                      : 'border-border'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={method.code} id={method.code} />
                      <div className="flex-1">
                        <span className="font-bold">{method.name}</span>
                        <p className="text-xs text-muted-foreground">{method.description || "Instan & Aman"}</p>
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="fixed bottom-20 left-0 right-0 flex justify-center px-6 z-50">
            <div className="w-full max-w-md">
              <Button
                onClick={handleCreatePayment}
                disabled={loading}
                className="w-full h-14 text-xl font-bold shadow-xl transition-all active:scale-95 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-amber-950 border-none hover:opacity-90"
              >
                {loading ? <div className="w-6 h-6 border-4 border-amber-950/30 border-t-amber-950 rounded-full animate-spin mr-2" /> : <CreditCard className="w-4 h-4 mr-2" />}
                {loading ? 'Memproses...' : `Bayar Sekarang (${formatCurrency(totalAmount)})`}
              </Button>
            </div>
          </div>

          <footer className="mt-8 px-6 text-center pb-10">
            <div className="pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-xs font-semibold">
                © 2026 eL Vision Group. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}
