import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { TrendingUp, Package, Globe, Users, ArrowUpRight, ArrowDownRight, FileText, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Revenue = () => {
  const { t, formatPrice } = useLocale();
  const { toast } = useToast();

  const handleMemberOnly = () => {
    toast({
      title: "Sorry This access for Member Only",
      description: "Please login or contact administrator to access this feature.",
      variant: "destructive",
    });
  };

  const totalRevenue = 523000;

  const stats = [
    {
      label: t("Total Revenue", "Total Pendapatan"),
      value: formatPrice(totalRevenue),
      change: "+12.5%",
      up: true,
      icon: TrendingUp,
    },
    {
      label: t("Active Shipments", "Pengiriman Aktif"),
      value: "1,247",
      change: "+8.3%",
      up: true,
      icon: Package,
    },
    {
      label: t("Countries Served", "Negara Dilayani"),
      value: "34",
      change: "+2",
      up: true,
      icon: Globe,
    },
    {
      label: t("Active Partners", "Mitra Aktif"),
      value: "186",
      change: "+15.2%",
      up: true,
      icon: Users,
    },
  ];

  const monthlyData = [
    { month: t("Jan", "Jan"), revenue: 56000 },
    { month: t("Feb", "Feb"), revenue: 62000 },
    { month: t("Mar", "Mar"), revenue: 0 },
    { month: t("Apr", "Apr"), revenue: 0 },
    { month: t("May", "Mei"), revenue: 0 },
    { month: t("Jun", "Jun"), revenue: 0 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue)) || 100000;

  const revenueByRegion = [
    { regionKey: "Middle East", regionId: "Timur Tengah", revenue: 185600, percentage: 35.5, growth: "+15.2%" },
    { regionKey: "North America", regionId: "Amerika Utara", revenue: 162400, percentage: 31.0, growth: "+22.8%" },
    { regionKey: "Asia Pacific", regionId: "Asia Pasifik", revenue: 104800, percentage: 20.0, growth: "+18.5%" },
    { regionKey: "Europe", regionId: "Eropa", revenue: 52400, percentage: 10.0, growth: "+12.3%" },
    { regionKey: "Others", regionId: "Lainnya", revenue: 18200, percentage: 3.5, growth: "+8.1%" },
  ];

  const topProducts = [
    { name: t("Fashion & Textiles", "Fashion & Tekstil"), revenue: 142000, pct: 27 },
    { name: t("Coconut Products", "Produk Kelapa"), revenue: 98000, pct: 19 },
    { name: t("Coffee & Tea", "Kopi & Teh"), revenue: 87000, pct: 17 },
    { name: t("Collagen & Beauty", "Kolagen & Kecantikan"), revenue: 76000, pct: 15 },
    { name: t("Jewelry", "Perhiasan"), revenue: 64000, pct: 12 },
    { name: t("Others", "Lainnya"), revenue: 56000, pct: 10 },
  ];

  const recentTransactions = [
    {
      id: "SH-2026-001",
      customer: "Global Imports LLC",
      amount: 45600,
      date: "2026-02-08",
      statusKey: "Completed",
      statusId: "Selesai",
    },
    {
      id: "SH-2026-002",
      customer: "Dubai Trade Co.",
      amount: 32800,
      date: "2026-02-07",
      statusKey: "Completed",
      statusId: "Selesai",
    },
    {
      id: "SH-2026-003",
      customer: "Singapore Ventures",
      amount: 28500,
      date: "2026-02-06",
      statusKey: "Processing",
      statusId: "Proses",
    },
    {
      id: "SH-2026-004",
      customer: "European Distributors",
      amount: 52100,
      date: "2026-02-05",
      statusKey: "Completed",
      statusId: "Selesai",
    },
    {
      id: "SH-2026-005",
      customer: "US Retail Group",
      amount: 38900,
      date: "2026-02-04",
      statusKey: "Pending",
      statusId: "Menunggu",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
              {t("Global Revenue 2026", "Pendapatan Global 2026")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
              {t("Revenue Overview", "Ikhtisar Pendapatan")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {t("From 1 January 2026", "Dari 1 Januari 2026")}
            </p>
          </div>
          <Button 
            onClick={handleMemberOnly}
            className="gradient-gold text-primary-foreground font-bold hover:opacity-90 transition-all"
          >
            <Download className="mr-2 h-4 w-4" />
            {t("Download Report", "Unduh Laporan")}
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card gold-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-primary" />
                <span className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-green-400" : "text-red-400"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="gradient-card gold-border rounded-xl p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("Monthly Revenue 2026", "Pendapatan Bulanan 2026")}
            </h3>
            <div className="mt-6 flex items-end gap-3" style={{ height: 180 }}>
              {monthlyData.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{d.revenue > 0 ? `${formatPrice(d.revenue / 1000)}k` : '-'}</span>
                  <div
                    className="w-full rounded-t gradient-gold transition-all"
                    style={{ height: `${(d.revenue / maxRevenue) * 140}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Revenue by Region */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="gradient-card gold-border rounded-xl p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              {t("Revenue by Region", "Pendapatan per Region")}
            </h3>
            <div className="space-y-4">
              {revenueByRegion.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{t(item.regionKey, item.regionId)}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-green-400">{item.growth}</span>
                      <span className="font-bold text-primary">{formatPrice(item.revenue)}</span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="gradient-gold h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="gradient-card gold-border rounded-xl p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("Revenue by Product", "Pendapatan per Produk")}
            </h3>
            <div className="mt-6 space-y-4">
              {topProducts.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{p.name}</span>
                    <span className="text-muted-foreground">{formatPrice(p.revenue)}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full gradient-gold transition-all"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="gradient-card gold-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {t("Recent Transactions", "Transaksi Terkini")}
              </h3>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-primary">{transaction.id}</p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-primary/20 bg-primary/5 text-primary">
                        {t(transaction.statusKey, transaction.statusId)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{transaction.customer}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-foreground">{formatPrice(transaction.amount)}</p>
                    <p className="text-[10px] text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
