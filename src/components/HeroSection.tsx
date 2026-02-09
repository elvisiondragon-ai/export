import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import { Zap, DollarSign, Award } from "lucide-react";

const HeroSection = () => {
  const { t } = useLocale();

  const pillars = [
    { icon: Zap, label: t("Fast Delivery", "Pengiriman Cepat"), desc: t("Exclusive global shipping partners", "Mitra pengiriman global eksklusif") },
    { icon: DollarSign, label: t("Reasonable Price", "Harga Terjangkau"), desc: t("Competitive international rates", "Tarif internasional kompetitif") },
    { icon: Award, label: t("Precise Quality", "Kualitas Presisi"), desc: t("Handled with utmost care", "Ditangani dengan sangat hati-hati") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_72%_52%/0.08),transparent_60%)]" />
      
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-primary">
            eL Vision Group
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            <span className="text-gold-gradient">Export Global</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            {t(
              "We ship globally from Indonesia — connecting your products to the world with speed, precision, and care.",
              "Kami mengirim ke seluruh dunia dari Indonesia — menghubungkan produk Anda ke dunia dengan kecepatan, presisi, dan perhatian."
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href={`https://wa.me/62895325633487?text=${encodeURIComponent("Hi Renata, I would like to Join Export Global as Seller")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-gold rounded-lg px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[0_0_30px_hsl(43_72%_52%/0.3)]"
          >
            {t("Join as Seller", "Gabung sebagai Penjual")}
          </a>
          <a
            href={`https://wa.me/62895325633487?text=${encodeURIComponent("Hi Renata, I would like to Join Export Global as Buyer")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary/10"
          >
            {t("Join as Buyer", "Gabung sebagai Pembeli")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-20 grid max-w-3xl gap-6 sm:grid-cols-3"
        >
          {pillars.map((p, i) => (
            <div key={i} className="gradient-card gold-border rounded-xl p-6 text-center gold-glow">
              <p.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">{p.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
