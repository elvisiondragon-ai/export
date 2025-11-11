import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, DollarSign, Clock, TrendingUp } from "lucide-react";

const Reports = () => {
  const financialSummary = [
    { label: "Total Revenue", value: "$847,290", change: "+12.5%", trend: "up" },
    { label: "Total Costs", value: "$563,180", change: "+8.3%", trend: "up" },
    { label: "Net Profit", value: "$284,110", change: "+18.7%", trend: "up" },
    { label: "Avg. Shipment Cost", value: "$12,350", change: "-3.2%", trend: "down" },
  ];

  const performanceMetrics = [
    { metric: "On-Time Delivery", value: "94.5%", status: "excellent" },
    { metric: "Avg. Transit Time", value: "14.2 days", status: "good" },
    { metric: "Document Accuracy", value: "98.1%", status: "excellent" },
    { metric: "Customs Clearance", value: "2.8 days", status: "good" },
  ];

  const recentReports = [
    {
      id: "RPT-2024-001",
      title: "Q4 2023 Financial Summary",
      type: "Financial",
      date: "2024-01-01",
      size: "3.2 MB",
    },
    {
      id: "RPT-2023-052",
      title: "December 2023 Performance",
      type: "Performance",
      date: "2023-12-31",
      size: "1.8 MB",
    },
    {
      id: "RPT-2023-051",
      title: "Annual Trade Analysis 2023",
      type: "Analysis",
      date: "2023-12-28",
      size: "5.4 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Reports & Analytics" />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Report Generator</h2>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate New Report
          </Button>
        </div>

        {/* Financial Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Financial Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialSummary.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-foreground mb-1">{item.value}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className={`h-4 w-4 ${item.trend === 'up' ? 'text-accent rotate-0' : 'text-orange-500 rotate-180'}`} />
                  <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-accent' : 'text-orange-500'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Performance Metrics</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceMetrics.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{item.metric}</p>
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'excellent' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reports */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Recent Reports</h3>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{report.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Reports;
