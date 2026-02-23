import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LocaleProvider } from "@/contexts/LocaleContext";
import React, { Suspense, lazy } from 'react';

// Lightweight Components (Keep these static for instant shell)
import BottomNav from "@/components/BottomNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

// Lazy Load Pages (These will load later in background)
const Index = lazy(() => import("./pages/Index"));
const Shipment = lazy(() => import("./pages/Shipment"));
const Tracking = lazy(() => import("./pages/Tracking"));
const Revenue = lazy(() => import("./pages/Revenue"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ExportSurvey = lazy(() => import("./pages/ExportSurvey"));
const AnalyticsDashboard = lazy(() => import("./pages/Analytics"));

// Payment Pages (Heavy - Lazy Load)
const DrelfPaymentPage = lazy(() => import("./pages/co_en/drelf"));
const DrelfLanding = lazy(() => import("./pages/co_en/drelflp"));
const FitFactorPaymentPage = lazy(() => import("./pages/co_en/fitfactor"));
const HungryLaterPaymentPage = lazy(() => import("./pages/co_en/hungrylater"));
const JewelryPaymentPage = lazy(() => import("./pages/co_en/jewelry"));
const ParfumPaymentPage = lazy(() => import("./pages/co_en/parfum"));

// ID Payment Pages
const DrelfPaymentPageID = lazy(() => import("./pages/co_id/id_drelf"));
const FitFactorPaymentPageID = lazy(() => import("./pages/co_id/id_fitfactor"));
const HungryLaterPaymentPageID = lazy(() => import("./pages/co_id/id_hungrylater"));
const JewelryPaymentPageID = lazy(() => import("./pages/co_id/id_elroyaljewelry"));
const ParfumPaymentPageID = lazy(() => import("./pages/co_id/id_elroyaleparfum"));
const Lumina = lazy(() => import("./pages/fisik/lumina"));
const Bra = lazy(() => import("./pages/fisik/bra"));
const PackagePage = lazy(() => import("./pages/fisik/package"));
const Research = lazy(() => import("./pages/fisik/research"));
const RamadhanRing = lazy(() => import("./pages/fisik/ramadhanring"));

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

// A very light loading component
const PageLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isFisikRoute = (location.pathname.startsWith('/drelf') || 
                      location.pathname.startsWith('/id_drelf') ||
                      location.pathname.startsWith('/fitfactor') || 
                      location.pathname.startsWith('/id_fitfactor') ||
                      location.pathname.startsWith('/hungrylater') || 
                      location.pathname.startsWith('/id_hungrylater') ||
                      location.pathname.startsWith('/jewelry') || 
                      location.pathname.startsWith('/id_jewelry') ||
                      location.pathname.startsWith('/parfum') ||
                      location.pathname.startsWith('/id_parfum') ||
                      location.pathname.startsWith('/package') ||
                      location.pathname.startsWith('/research') ||
                      location.pathname.startsWith('/ramadhanring')) &&
                      !location.pathname.startsWith('/lumina') &&
                      !location.pathname.startsWith('/bra');
  
  const isAnalyticsRoute = location.pathname.startsWith('/analytics');

  return (
    <>
      {!isFisikRoute && !isAnalyticsRoute && <LanguageSwitcher />}
      {!isFisikRoute && !isAnalyticsRoute && <WhatsAppFloat />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/survey" element={<ExportSurvey />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/lumina" element={<Lumina />} />
          <Route path="/bra" element={<Bra />} />
          <Route path="/package" element={<PackagePage />} />
          <Route path="/research" element={<Research />} />
          <Route path="/ramadhanring" element={<RamadhanRing />} />
          
          {/* Fisik Routes */}
          <Route path="/drelf" element={<DrelfPaymentPage />} />
          <Route path="/id_drelf" element={<DrelfPaymentPageID />} />
          <Route path="/drelflp" element={<DrelfLanding />} />
          <Route path="/fitfactor" element={<FitFactorPaymentPage />} />
          <Route path="/id_fitfactor" element={<FitFactorPaymentPageID />} />
          <Route path="/hungrylater" element={<HungryLaterPaymentPage />} />
          <Route path="/id_hungrylater" element={<HungryLaterPaymentPageID />} />
          <Route path="/jewelry" element={<JewelryPaymentPage />} />
          <Route path="/id_jewelry" element={<JewelryPaymentPageID />} />
          <Route path="/parfum" element={<ParfumPaymentPage />} />
          <Route path="/id_parfum" element={<ParfumPaymentPageID />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
