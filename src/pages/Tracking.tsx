import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Ship, Package, CheckCircle2 } from "lucide-react";

const Tracking = () => {
  const trackingUpdates = [
    {
      shipmentId: "SH-2024-001",
      container: "MSCU1234567",
      status: "In Transit",
      location: "Red Sea, International Waters",
      lastUpdate: "2024-01-08 14:30 UTC",
      progress: 65,
      timeline: [
        { status: "Departed", location: "Dubai, UAE", date: "2024-01-01", completed: true },
        { status: "Transited", location: "Suez Canal", date: "2024-01-05", completed: true },
        { status: "In Transit", location: "Red Sea", date: "2024-01-08", completed: true },
        { status: "Expected", location: "New York, USA", date: "2024-01-15", completed: false },
      ],
    },
    {
      shipmentId: "SH-2024-002",
      container: "CMAU9876543",
      status: "At Port",
      location: "Port of Jebel Ali, Dubai",
      lastUpdate: "2024-01-08 09:15 UTC",
      progress: 90,
      timeline: [
        { status: "Departed", location: "Shanghai, China", date: "2023-12-28", completed: true },
        { status: "Transited", location: "Singapore", date: "2024-01-02", completed: true },
        { status: "Arrived", location: "Dubai, UAE", date: "2024-01-08", completed: true },
        { status: "Customs", location: "Clearance", date: "Pending", completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Live Tracking" />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Track Your Shipment</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter container number or shipment ID..."
              className="flex-1"
            />
            <Button className="gap-2">
              <Search className="h-4 w-4" />
              Track
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          {trackingUpdates.map((shipment) => (
            <Card key={shipment.shipmentId} className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{shipment.shipmentId}</h3>
                  <p className="text-sm text-muted-foreground">Container: {shipment.container}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  {shipment.status}
                </span>
              </div>

              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">{shipment.location}</p>
                    <p className="text-sm text-muted-foreground">Last updated: {shipment.lastUpdate}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{shipment.progress}% Complete</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Shipment Timeline</h4>
                {shipment.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {event.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-muted bg-background" />
                      )}
                      {index < shipment.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${event.completed ? 'bg-accent' : 'bg-muted'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="font-semibold text-foreground">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Tracking;
