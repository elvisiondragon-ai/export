import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Ship, MapPin } from "lucide-react";

const Shipments = () => {
  const shipments = [
    {
      id: "SH-2024-001",
      origin: "Dubai, UAE",
      destination: "New York, USA",
      status: "In Transit",
      container: "MSCU1234567",
      vessel: "MSC OSLO",
      departure: "2024-01-01",
      arrival: "2024-01-15",
    },
    {
      id: "SH-2024-002",
      origin: "Shanghai, China",
      destination: "Dubai, UAE",
      status: "At Port",
      container: "CMAU9876543",
      vessel: "CMA CGM PARIS",
      departure: "2023-12-28",
      arrival: "2024-01-10",
    },
    {
      id: "SH-2024-003",
      origin: "Mumbai, India",
      destination: "London, UK",
      status: "Customs Clearance",
      container: "MAEU4567890",
      vessel: "MAERSK ATLANTA",
      departure: "2023-12-25",
      arrival: "2024-01-12",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "At Port":
        return "bg-accent/10 text-accent border-accent/20";
      case "Customs Clearance":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Shipment Management" />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">All Shipments</h2>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Shipment
          </Button>
        </div>

        <div className="grid gap-4">
          {shipments.map((shipment) => (
            <Card key={shipment.id} className="p-6 hover:shadow-elevated transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Ship className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">{shipment.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Route</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        <p className="font-medium text-foreground">
                          {shipment.origin} → {shipment.destination}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vessel</p>
                      <p className="font-medium text-foreground">{shipment.vessel}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Container</p>
                      <p className="font-mono text-sm font-medium text-foreground">{shipment.container}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ETA</p>
                      <p className="font-medium text-foreground">{shipment.arrival}</p>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                    Track
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Shipments;
