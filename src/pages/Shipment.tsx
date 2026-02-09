import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { FileText, Package, Ship, MapPin, Eye, Download, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const shipments = [
  {
    id: "SH-2024-001",
    origin: "Jakarta, Indonesia",
    destination: "New York, USA",
    statusKey: "In Transit",
    statusId: "Dalam Perjalanan",
    container: "MSCU1234567",
    vessel: "MSC OSAKA",
    departure: "2024-01-15",
    arrival: "2024-02-28",
    value: 45600,
  },
  {
    id: "SH-2024-002",
    origin: "Surabaya, Indonesia",
    destination: "Dubai, UAE",
    statusKey: "At Port",
    statusId: "Di Pelabuhan",
    container: "CMAU9876543",
    vessel: "CMA CGM JAKARTA",
    departure: "2024-01-20",
    arrival: "2024-02-15",
    value: 32800,
  },
  {
    id: "SH-2024-003",
    origin: "Bali, Indonesia",
    destination: "Singapore",
    statusKey: "Customs Clearance",
    statusId: "Bea Cukai",
    container: "MAEU4567890",
    vessel: "MAERSK BALI",
    departure: "2024-02-01",
    arrival: "2024-02-10",
    value: 28500,
  },
];

const documents = [
  {
    id: "DOC-001",
    name: "Bill of Lading - SH-2024-001",
    typeKey: "Bill of Lading",
    typeId: "Surat Muatan",
    shipment: "SH-2024-001",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
  },
  {
    id: "DOC-002",
    name: "Commercial Invoice - SH-2024-001",
    typeKey: "Commercial Invoice",
    typeId: "Faktur Komersial",
    shipment: "SH-2024-001",
    uploadDate: "2024-01-15",
    size: "1.8 MB",
  },
  {
    id: "DOC-003",
    name: "Packing List - SH-2024-002",
    typeKey: "Packing List",
    typeId: "Daftar Kemasan",
    shipment: "SH-2024-002",
    uploadDate: "2024-01-20",
    size: "956 KB",
  },
  {
    id: "DOC-004",
    name: "Certificate of Origin - SH-2024-002",
    typeKey: "Certificate",
    typeId: "Sertifikat",
    shipment: "SH-2024-002",
    uploadDate: "2024-01-20",
    size: "1.2 MB",
  },
  {
    id: "DOC-005",
    name: "Export Declaration - SH-2024-003",
    typeKey: "Export Declaration",
    typeId: "Deklarasi Ekspor",
    shipment: "SH-2024-003",
    uploadDate: "2024-02-01",
    size: "1.5 MB",
  },
];

const Shipment = () => {
  const { t, formatPrice } = useLocale();
  const { toast } = useToast();

  const handleMemberOnly = () => {
    toast({
      title: "Sorry This access for Member Only",
      description: "Please login or contact administrator to access this feature.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("Shipment Management", "Manajemen Pengiriman")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            {t("Shipments & Documents", "Pengiriman & Dokumen")}
          </h1>
        </motion.div>

        {/* Shipments Section */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Active Shipments", "Pengiriman Aktif")}
            </h2>
            <Button 
              onClick={handleMemberOnly}
              className="gradient-gold text-primary-foreground font-bold hover:opacity-90 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t("New Shipment", "Pengiriman Baru")}
            </Button>
          </div>

          <div className="grid gap-6">
            {shipments.map((shipment, i) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="gradient-card gold-border rounded-xl p-6 gold-glow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <Ship className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">{shipment.id}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {t(shipment.statusKey, shipment.statusId)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground">
                        {formatPrice(shipment.value)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{t("Route", "Rute")}</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium text-foreground">
                            {shipment.origin} → {shipment.destination}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{t("Vessel", "Kapal")}</p>
                        <p className="text-sm font-medium text-foreground">{shipment.vessel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{t("Container", "Kontainer")}</p>
                        <p className="font-mono text-sm font-medium text-foreground">{shipment.container}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{t("ETA", "Estimasi Tiba")}</p>
                        <p className="text-sm font-medium text-foreground">{shipment.arrival}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <Button 
                      onClick={handleMemberOnly}
                      variant="outline" 
                      size="sm" 
                      className="flex-1 lg:flex-none gold-border hover:bg-primary/5"
                    >
                      {t("View Details", "Lihat Detail")}
                    </Button>
                    <Button 
                      onClick={handleMemberOnly}
                      variant="outline" 
                      size="sm" 
                      className="flex-1 lg:flex-none gold-border hover:bg-primary/5"
                    >
                      {t("Track", "Lacak")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Shipment Documents", "Dokumen Pengiriman")}
            </h2>
            <Button 
              onClick={handleMemberOnly}
              className="gradient-gold text-primary-foreground font-bold hover:opacity-90 transition-all"
            >
              <Upload className="mr-2 h-4 w-4" />
              {t("Upload Document", "Unggah Dokumen")}
            </Button>
          </div>

          <div className="grid gap-4">
            {documents.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="gradient-card gold-border rounded-xl p-5 hover:bg-primary/5 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 truncate">{doc.name}</h3>
                      <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground">
                          {t(doc.typeKey, doc.typeId)}
                        </span>
                        <span>•</span>
                        <span>{t("Shipment", "Pengiriman")}: {doc.shipment}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{t("Uploaded", "Diunggah")}: {doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleMemberOnly}
                      variant="outline" 
                      size="sm" 
                      className="gap-2 gold-border hover:bg-primary/5"
                    >
                      <Eye className="h-4 w-4" />
                      {t("View", "Lihat")}
                    </Button>
                    <Button 
                      onClick={handleMemberOnly}
                      variant="outline" 
                      size="sm" 
                      className="gap-2 gold-border hover:bg-primary/5"
                    >
                      <Download className="h-4 w-4" />
                      {t("Download", "Unduh")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;