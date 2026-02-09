import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Package, MapPin, Clock, CheckCircle2 } from "lucide-react";

const mockStatuses = [
  { status: "Order Confirmed", date: "2026-02-01", done: true },
  { status: "Customs Cleared", date: "2026-02-03", done: true },
  { status: "In Transit", date: "2026-02-05", done: true },
  { status: "Arrived at Port", date: "2026-02-07", done: false },
  { status: "Delivered", date: "—", done: false },
];

const Tracking = () => {
  const { t } = useLocale();
  const [trackingId, setTrackingId] = useState("");
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("Tracking", "Pelacakan")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            {t("Track Your Shipment", "Lacak Pengiriman Anda")}
          </h1>
        </motion.div>

        <div className="mx-auto mt-10 max-w-md">
          <div className="flex gap-2">
            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder={t("Enter tracking number...", "Masukkan nomor pelacakan...")}
              className="flex-1 rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              onClick={() => setShowResult(true)}
              className="gradient-gold rounded-lg px-5 py-3 text-primary-foreground transition-all hover:opacity-90"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-12 max-w-lg"
          >
            <div className="gradient-card gold-border rounded-xl p-6">
              <div className="mb-6 flex items-center gap-3">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("Tracking ID", "ID Pelacakan")}</p>
                  <p className="font-semibold text-foreground">{trackingId || "ELV-2026-00123"}</p>
                </div>
              </div>

              <div className="space-y-4">
                {mockStatuses.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {s.done ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${s.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {s.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
