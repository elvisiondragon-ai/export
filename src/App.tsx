import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LocaleProvider } from "@/contexts/LocaleContext";
import BottomNav from "@/components/BottomNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Index from "./pages/Index";
import Shipment from "./pages/Shipment";
import Tracking from "./pages/Tracking";
import Revenue from "./pages/Revenue";
import NotFound from "./pages/NotFound";
import ExportSurvey from "./pages/ExportSurvey";
import DrelfPaymentPage from "./fisik/drelf";
import DrelfLanding from "./fisik/drelflp";
import FitFactorPaymentPage from "./fisik/fitfactor";
import HungryLaterPaymentPage from "./fisik/hungrylater";
import JewelryPaymentPage from "./fisik/jewelry";
import ParfumPaymentPage from "./fisik/parfum";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import AnalyticsDashboard from "./pages/Analytics";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isFisikRoute = location.pathname.startsWith('/drelf') || 
                      location.pathname.startsWith('/fitfactor') || 
                      location.pathname.startsWith('/hungrylater') || 
                      location.pathname.startsWith('/jewelry') || 
                      location.pathname.startsWith('/parfum');
  
  const isAnalyticsRoute = location.pathname.startsWith('/analytics');

  return (
    <>
      {!isFisikRoute && !isAnalyticsRoute && <LanguageSwitcher />}
      {!isFisikRoute && !isAnalyticsRoute && <WhatsAppFloat />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/survey" element={<ExportSurvey />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        
        {/* Fisik Routes */}
        <Route path="/drelf" element={<DrelfPaymentPage />} />
        <Route path="/drelflp" element={<DrelfLanding />} />
        <Route path="/fitfactor" element={<FitFactorPaymentPage />} />
        <Route path="/hungrylater" element={<HungryLaterPaymentPage />} />
        <Route path="/jewelry" element={<JewelryPaymentPage />} />
        <Route path="/parfum" element={<ParfumPaymentPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isFisikRoute && !isAnalyticsRoute && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocaleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
          <AppContent />
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </LocaleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
