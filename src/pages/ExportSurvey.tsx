import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";

type Role = "buyer" | "seller" | null;

const ExportSurvey = () => {
  const { t } = useLocale();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") as Role;
  
  const [phase, setPhase] = useState(initialRole ? 2 : 1);
  const [role, setRole] = useState<Role>(initialRole);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const phone = "62895325633487";

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setPhase(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let message = `Hi Renata, I have completed the Export Global Survey.

`;
    message += `*Role:* ${role === "buyer" ? "Global Buyer" : "Strategic Seller/Exporter"}

`;

    if (role === "buyer") {
      message += `*1. Requirement & Volume:* ${formData.requirement || "N/A"}
`;
      message += `*2. Financial Capability:* ${formData.financial || "N/A"}
`;
      message += `*3. Logistics & Urgency:* ${formData.logistics || "N/A"}
`;
      message += `*4. Compliance:* ${formData.compliance || "N/A"}
`;
    } else {
      message += `*1. Product & Market Intent:* ${formData.product || "N/A"}
`;
      message += `*2. Infrastructure & Access:* ${formData.infrastructure || "N/A"}
`;
      message += `*3. Supply Consistency:* ${formData.supply || "N/A"}
`;
      message += `*4. Pricing Strategy:* ${formData.pricing || "N/A"}
`;
    }

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">
                  {t("Phase 1: The Gateway Question", "Tahap 1: Pertanyaan Utama")}
                </h1>
                <p className="mt-4 text-muted-foreground">
                  {t("To best serve your vision, please identify your primary role:", "Untuk melayani visi Anda dengan baik, harap tentukan peran utama Anda:")}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card 
                  className="p-6 cursor-pointer hover:border-primary transition-all gold-border gradient-card"
                  onClick={() => handleRoleSelect("buyer")}
                >
                  <h3 className="text-xl font-bold text-primary mb-2">[A] Global Buyer</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Seeking high-quality commodities/products", "Mencari komoditas/produk berkualitas tinggi")}
                  </p>
                </Card>
                <Card 
                  className="p-6 cursor-pointer hover:border-primary transition-all gold-border gradient-card"
                  onClick={() => handleRoleSelect("seller")}
                >
                  <h3 className="text-xl font-bold text-primary mb-2">[B] Strategic Seller</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Seeking to scale production to global markets", "Berusaha meningkatkan produksi ke pasar global")}
                  </p>
                </Card>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setPhase(1)}
                  className="mb-4 text-muted-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("Back", "Kembali")}
                </Button>
                <h1 className="text-3xl font-bold text-foreground">
                  {role === "buyer" ? t("Buyer Path", "Jalur Pembeli") : t("Seller Path", "Jalur Penjual")}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {t("Please provide more details to help us assist you better.", "Harap berikan detail lebih lanjut untuk membantu kami melayani Anda lebih baik.")}
                </p>
              </div>

              <Card className="p-8 gold-border gradient-card space-y-6">
                {role === "buyer" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="requirement">{t("Requirement & Volume", "Kebutuhan & Volume")}</Label>
                      <Textarea 
                        id="requirement" 
                        name="requirement"
                        placeholder={t("What specific commodity and required monthly tonnage?", "Apa komoditas spesifik dan tonase bulanan yang dibutuhkan?")}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="financial">{t("Financial Capability", "Kemampuan Finansial")}</Label>
                      <Input 
                        id="financial" 
                        name="financial"
                        placeholder={t("Allocated budget range or target price per unit?", "Rentang anggaran atau target harga per unit?")}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logistics">{t("Logistics & Urgency", "Logistik & Urgensi")}</Label>
                      <Input 
                        id="logistics" 
                        name="logistics"
                        placeholder={t("Lead time and final destination port?", "Waktu pengiriman dan pelabuhan tujuan akhir?")}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compliance">{t("Compliance", "Kepatuhan")}</Label>
                      <Input 
                        id="compliance" 
                        name="compliance"
                        placeholder={t("Required certifications (ISO, Organic, Halal, etc.)?", "Sertifikasi yang diwajibkan (ISO, Organik, Halal, dll.)?")}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="product">{t("Product & Market Intent", "Produk & Niat Pasar")}</Label>
                      <Textarea 
                        id="product" 
                        name="product"
                        placeholder={t("Primary export product and target regions?", "Produk ekspor utama dan wilayah target?")}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="infrastructure">{t("Infrastructure & Access", "Infrastruktur & Akses")}</Label>
                      <Input 
                        id="infrastructure" 
                        name="infrastructure"
                        placeholder={t("Export licenses and warehouse facility description?", "Lisensi ekspor dan deskripsi fasilitas gudang?")}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supply">{t("Supply Consistency", "Konsistensi Pasokan")}</Label>
                      <Input 
                        id="supply" 
                        name="supply"
                        placeholder={t("Maximum monthly production/shipping capacity?", "Kapasitas produksi/pengiriman bulanan maksimum?")}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricing">{t("Pricing Strategy", "Strategi Harga")}</Label>
                      <Input 
                        id="pricing" 
                        name="pricing"
                        placeholder={t("Current offer price and packaging standards?", "Harga penawaran saat ini dan standar pengemasan?")}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <Button 
                  onClick={handleSubmit}
                  className="w-full gradient-gold text-primary-foreground font-bold"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("Send to WhatsApp", "Kirim ke WhatsApp")}
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExportSurvey;
