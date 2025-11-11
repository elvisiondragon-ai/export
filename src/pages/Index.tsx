import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import KPICard from "@/components/KPICard";
import { Ship, FileText, AlertCircle, DollarSign, TrendingUp, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const recentShipments = [
    { id: "SH-2024-001", route: "Dubai → New York", status: "In Transit", eta: "2024-01-15" },
    { id: "SH-2024-002", route: "Shanghai → Dubai", status: "At Port", eta: "2024-01-10" },
    { id: "SH-2024-003", route: "Mumbai → London", status: "Customs", eta: "2024-01-12" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Dashboard Overview" />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Shipments"
            value={12}
            icon={Ship}
            variant="success"
          />
          <KPICard
            title="Pending Documents"
            value={5}
            icon={FileText}
            variant="warning"
          />
          <KPICard
            title="Requires Payment"
            value={3}
            icon={DollarSign}
            variant="info"
          />
          <KPICard
            title="This Month"
            value="$287K"
            icon={TrendingUp}
            variant="default"
          />
        </div>

        {/* Recent Shipments */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Recent Shipments</h2>
          </div>
          <div className="space-y-3">
            {recentShipments.map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{shipment.id}</p>
                  <p className="text-sm text-muted-foreground">{shipment.route}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {shipment.status}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">ETA: {shipment.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-left">
              <Ship className="h-6 w-6 text-accent mb-2" />
              <p className="font-semibold text-foreground">New Shipment</p>
              <p className="text-sm text-muted-foreground">Create shipment order</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-left">
              <FileText className="h-6 w-6 text-accent mb-2" />
              <p className="font-semibold text-foreground">Upload Document</p>
              <p className="text-sm text-muted-foreground">Add to vault</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-left">
              <AlertCircle className="h-6 w-6 text-accent mb-2" />
              <p className="font-semibold text-foreground">Track Shipment</p>
              <p className="text-sm text-muted-foreground">Real-time updates</p>
            </button>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
