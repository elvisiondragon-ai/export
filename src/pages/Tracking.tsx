import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Package, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const trackingUpdates = [
  {
    shipmentId: "SH-2024-001",
    container: "MSCU1234567",
    statusKey: "In Transit",
    statusId: "Dalam Perjalanan",
    locationKey: "Indian Ocean, International Waters",
    locationId: "Samudra Hindia, Perairan Internasional",
    lastUpdate: "2024-02-08 14:30 UTC",
    progress: 65,
    timeline: [
      { 
        statusKey: "Departed", 
        statusId: "Berangkat", 
        location: "Jakarta, Indonesia", 
        date: "2024-01-15", 
        completed: true 
      },
      { 
        statusKey: "Transited", 
        statusId: "Transit", 
        locationKey: "Port of Colombo, Sri Lanka", 
        locationId: "Pelabuhan Colombo, Sri Lanka", 
        date: "2024-01-28", 
        completed: true 
      },
      { 
        statusKey: "In Transit", 
        statusId: "Dalam Perjalanan", 
        locationKey: "Indian Ocean", 
        locationId: "Samudra Hindia", 
        date: "2024-02-08", 
        completed: true 
      },
      { 
        statusKey: "Expected", 
        statusId: "Diharapkan", 
        location: "New York, USA", 
        date: "2024-02-28", 
        completed: false 
      },
    ],
  },
  {
    shipmentId: "SH-2024-002",
    container: "CMAU9876543",
    statusKey: "At Port",
    statusId: "Di Pelabuhan",
    locationKey: "Port of Jebel Ali, Dubai",
    locationId: "Pelabuhan Jebel Ali, Dubai",
    lastUpdate: "2024-02-08 09:15 UTC",
    progress: 90,
    timeline: [
      { 
        statusKey: "Departed", 
        statusId: "Berangkat", 
        location: "Surabaya, Indonesia", 
        date: "2024-01-20", 
        completed: true 
      },
      { 
        statusKey: "Transited", 
        statusId: "Transit", 
        location: "Singapore", 
        date: "2024-01-25", 
        completed: true 
      },
      { 
        statusKey: "Arrived", 
        statusId: "Tiba", 
        location: "Dubai, UAE", 
        date: "2024-02-08", 
        completed: true 
      },
      { 
        statusKey: "Customs Clearance", 
        statusId: "Bea Cukai", 
        locationKey: "Processing", 
        locationId: "Proses", 
        date: "Pending", 
        completed: false 
      },
    ],
  },
  {
    shipmentId: "SH-2024-003",
    container: "MAEU4567890",
    statusKey: "Customs Clearance",
    statusId: "Bea Cukai",
    locationKey: "Port of Singapore",
    locationId: "Pelabuhan Singapura",
    lastUpdate: "2024-02-09 11:45 UTC",
    progress: 95,
    timeline: [
      { 
        statusKey: "Departed", 
        statusId: "Berangkat", 
        location: "Bali, Indonesia", 
        date: "2024-02-01", 
        completed: true 
      },
      { 
        statusKey: "Arrived", 
        statusId: "Tiba", 
        location: "Singapore", 
        date: "2024-02-05", 
        completed: true 
      },
      { 
        statusKey: "Customs Clearance", 
        statusId: "Bea Cukai", 
        locationKey: "Processing", 
        locationId: "Proses", 
        date: "2024-02-09", 
        completed: true 
      },
      { 
        statusKey: "Expected Delivery", 
        statusId: "Pengiriman Diharapkan", 
        locationKey: "Final Destination", 
        locationId: "Tujuan Akhir", 
        date: "2024-02-10", 
        completed: false 
      },
    ],
  },
];

const Tracking = () => {
  const { t } = useLocale();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleMemberOnly = () => {
    toast({
      title: "Sorry This access for Member Only",
      description: "Please login or contact administrator to access this feature.",
      variant: "destructive",
    });
  };

  const filteredShipments = trackingUpdates.filter(s => 
    s.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.container.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("Live Tracking", "Pelacakan Langsung")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            {t("Track Your Shipment", "Lacak Pengiriman Anda")}
          </h1>
        </motion.div>

        <div className="mx-auto mt-10 max-w-md">
          <div className="flex gap-2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Enter container or shipment ID...", "Masukkan ID kontainer atau pengiriman...")}
              className="flex-1 rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button 
              onClick={handleMemberOnly}
              className="gradient-gold rounded-lg px-5 py-3 text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          {filteredShipments.map((shipment, sIdx) => (
            <motion.div
              key={shipment.shipmentId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              className="gradient-card gold-border rounded-xl p-6 lg:p-8 gold-glow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">{shipment.shipmentId}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("Container", "Kontainer")}: {shipment.container}</p>
                </div>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                  {t(shipment.statusKey, shipment.statusId)}
                </span>
              </div>

              <div className="mb-10 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      {t(shipment.locationKey || "", shipment.locationId || "")}
                    </p>
                    <p className="text-sm text-muted-foreground">{t("Last updated", "Terakhir diperbarui")}: {shipment.lastUpdate}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className="gradient-gold h-full rounded-full transition-all duration-500 shadow-lg shadow-primary/20"
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm font-bold text-primary">{shipment.progress}% {t("Complete", "Selesai")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-display text-xl font-bold text-foreground mb-6">{t("Shipment Timeline", "Kronologi Pengiriman")}</h4>
                {shipment.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 ${event.completed ? 'border-primary bg-primary/20' : 'border-muted-foreground bg-transparent'}`}>
                        {event.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      {index < shipment.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${event.completed ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className={`font-bold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {t(event.statusKey || "", event.statusId || "") || (event as any).status}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t((event as any).locationKey || "", (event as any).locationId || "") || event.location}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
