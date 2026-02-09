import { useLocale } from "@/contexts/LocaleContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

const GlobalShipping = () => {
  const { t } = useLocale();

  const regions = [
    t("North America", "Amerika Utara"),
    t("Europe", "Eropa"),
    t("Middle East", "Timur Tengah"),
    t("East Asia", "Asia Timur"),
    t("Southeast Asia", "Asia Tenggara"),
    t("Australia & Oceania", "Australia & Oseania"),
    t("Africa", "Afrika"),
    t("South America", "Amerika Selatan"),
  ];

  return (
    <section className="relative py-24 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Globe className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {t("We Ship Globally from Indonesia", "Kami Mengirim ke Seluruh Dunia dari Indonesia")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            {t(
              "With exclusive partnerships with leading shipping companies worldwide, we ensure your goods arrive fast and safe.",
              "Dengan kemitraan eksklusif bersama perusahaan pengiriman terkemuka dunia, kami memastikan barang Anda tiba cepat dan aman."
            )}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
          {regions.map((r, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-foreground"
            >
              {r}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalShipping;
