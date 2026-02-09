import React, { createContext, useContext, useState } from "react";

type Language = "en" | "id";
type Currency = "USD" | "IDR";

interface LocaleContextType {
  lang: Language;
  currency: Currency;
  toggleLang: () => void;
  toggleCurrency: () => void;
  t: (en: string, id: string) => string;
  formatPrice: (usd: number) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const USD_TO_IDR = 15800;

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  const toggleLang = () => setLang((l) => (l === "en" ? "id" : "en"));
  const toggleCurrency = () => setCurrency((c) => (c === "USD" ? "IDR" : "USD"));
  const t = (en: string, id: string) => (lang === "en" ? en : id);
  const formatPrice = (usd: number) => {
    if (currency === "USD") return `$${usd.toLocaleString("en-US")}`;
    const idr = usd * USD_TO_IDR;
    return `Rp ${idr.toLocaleString("id-ID")}`;
  };

  return (
    <LocaleContext.Provider value={{ lang, currency, toggleLang, toggleCurrency, t, formatPrice }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
};
