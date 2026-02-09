import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, DollarSign } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, currency, toggleLang, toggleCurrency, t } = useLocale();
  const location = useLocation();

  const links = [
    { to: "/", label: t("Home", "Beranda") },
    { to: "/shipment", label: t("Shipment", "Pengiriman") },
    { to: "/tracking", label: t("Tracking", "Pelacakan") },
    { to: "/revenue", label: t("Revenue", "Pendapatan") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-gold-gradient">eL Vision</span>
          <span className="hidden text-xs font-sans text-muted-foreground sm:block">Export Global</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                isActive(l.to) ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Globe className="h-3 w-3" />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <DollarSign className="h-3 w-3" />
            {currency}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="ml-2 text-foreground md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(l.to)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
