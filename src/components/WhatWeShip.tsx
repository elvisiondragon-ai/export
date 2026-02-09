import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import {
  Shirt, TreePalm, Sparkles, Gem, Coffee, Palette, Leaf,
  Package, Shell, Heart, Flame, Flower2, Droplets, Apple, Star
} from "lucide-react";

const products = [
  { icon: Shirt, en: "Fashion & Textiles", id: "Fashion & Tekstil" },
  { icon: TreePalm, en: "Coconut Products", id: "Produk Kelapa" },
  { icon: Sparkles, en: "Collagen & Beauty", id: "Kolagen & Kecantikan" },
  { icon: Gem, en: "Jewelry & Accessories", id: "Perhiasan & Aksesori" },
  { icon: Coffee, en: "Coffee & Tea", id: "Kopi & Teh" },
  { icon: Palette, en: "Handicrafts & Art", id: "Kerajinan & Seni" },
  { icon: Leaf, en: "Herbal & Supplements", id: "Herbal & Suplemen" },
  { icon: Package, en: "Packaged Foods", id: "Makanan Kemasan" },
  { icon: Shell, en: "Shell & Natural Crafts", id: "Kerang & Kerajinan Alam" },
  { icon: Heart, en: "Skincare & Wellness", id: "Perawatan Kulit & Wellness" },
  { icon: Flame, en: "Essential Oils", id: "Minyak Atsiri" },
  { icon: Flower2, en: "Dried Flowers & Decor", id: "Bunga Kering & Dekorasi" },
  { icon: Droplets, en: "Coconut Oil & Derivatives", id: "Minyak Kelapa & Turunannya" },
  { icon: Apple, en: "Tropical Fruits", id: "Buah Tropis" },
  { icon: Star, en: "Premium Spices", id: "Rempah Premium" },
];

const WhatWeShip = () => {
  const { t } = useLocale();

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(43_72%_52%/0.05),transparent_60%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("Our Products", "Produk Kami")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {t("What We Ship", "Apa yang Kami Kirim")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            {t(
              "From Indonesia's finest goods — all safe and certified for international shipping.",
              "Dari produk terbaik Indonesia — semua aman dan bersertifikat untuk pengiriman internasional."
            )}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="gradient-card gold-border rounded-xl p-4 text-center transition-all hover:gold-glow hover:border-primary/50"
            >
              <p.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-xs font-medium text-foreground">{t(p.en, p.id)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeShip;
