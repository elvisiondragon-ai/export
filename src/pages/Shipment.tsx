import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { FileText, Package, ClipboardList, Shield, Truck, CheckCircle } from "lucide-react";

const documents = [
  { icon: FileText, en: "Commercial Invoice", id: "Faktur Komersial" },
  { icon: ClipboardList, en: "Packing List", id: "Daftar Kemasan" },
  { icon: Shield, en: "Certificate of Origin", id: "Sertifikat Asal" },
  { icon: Package, en: "Bill of Lading (B/L)", id: "Bill of Lading (B/L)" },
  { icon: Truck, en: "Shipping Instruction", id: "Instruksi Pengiriman" },
  { icon: CheckCircle, en: "Customs Declaration", id: "Deklarasi Bea Cukai" },
];

const Shipment = () => {
  const { t } = useLocale();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("Shipment", "Pengiriman")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            {t("Shipment & Documents", "Pengiriman & Dokumen")}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            {t(
              "We handle all required export documents to ensure smooth international shipping.",
              "Kami menangani semua dokumen ekspor yang diperlukan untuk memastikan pengiriman internasional yang lancar."
            )}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card gold-border rounded-xl p-6 gold-glow"
            >
              <doc.icon className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">{t(doc.en, doc.id)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("Prepared and verified by our team", "Disiapkan dan diverifikasi oleh tim kami")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipment;
