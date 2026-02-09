import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { TrendingUp, Package, Globe, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Revenue = () => {
  const { t, formatPrice } = useLocale();

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
    { month: t("Sep", "Sep"), revenue: 38000 },
    { month: t("Oct", "Okt"), revenue: 42000 },
    { month: t("Nov", "Nov"), revenue: 51000 },
    { month: t("Dec", "Des"), revenue: 48000 },
    { month: t("Jan", "Jan"), revenue: 56000 },
    { month: t("Feb", "Feb"), revenue: 62000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  const topProducts = [
    { name: t("Fashion & Textiles", "Fashion & Tekstil"), revenue: 142000, pct: 27 },
    { name: t("Coconut Products", "Produk Kelapa"), revenue: 98000, pct: 19 },
    { name: t("Coffee & Tea", "Kopi & Teh"), revenue: 87000, pct: 17 },
    { name: t("Collagen & Beauty", "Kolagen & Kecantikan"), revenue: 76000, pct: 15 },
    { name: t("Jewelry", "Perhiasan"), revenue: 64000, pct: 12 },
    { name: t("Others", "Lainnya"), revenue: 56000, pct: 10 },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("Global Revenue", "Pendapatan Global")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            {t("Revenue Overview", "Ikhtisar Pendapatan")}
          </h1>
        </motion.div>

        {/* Stats Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Chart + Top Products */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="gradient-card gold-border rounded-xl p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("Monthly Revenue", "Pendapatan Bulanan")}
            </h3>
            <div className="mt-6 flex items-end gap-3" style={{ height: 180 }}>
              {monthlyData.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{formatPrice(d.revenue)}</span>
                  <div
                    className="w-full rounded-t gradient-gold transition-all"
                    style={{ height: `${(d.revenue / maxRevenue) * 140}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
        </div>
      </div>
    </div>
  );
};

export default Revenue;
