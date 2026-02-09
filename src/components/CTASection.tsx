import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";

const CTASection = () => {
  const { t } = useLocale();
  const phone = "62895325633487";

  return (
    <section className="relative py-24 border-t border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_72%_52%/0.08),transparent_70%)]" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {t("Ready to Go Global?", "Siap untuk Go Global?")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {t(
              "Whether you want to sell Indonesian products worldwide or source premium goods — we're your gateway.",
              "Apakah Anda ingin menjual produk Indonesia ke seluruh dunia atau mencari barang premium — kami adalah pintu gerbang Anda."
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi Renata, I would like to Join Export Global as Seller")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-gold rounded-lg px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              {t("I Want to Sell", "Saya Ingin Menjual")}
            </a>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi Renata, I would like to Join Export Global as Buyer")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary/10"
            >
              {t("I Want to Buy", "Saya Ingin Membeli")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
