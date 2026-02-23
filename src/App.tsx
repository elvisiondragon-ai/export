import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { LocaleProvider, useLocale } from "@/contexts/LocaleContext";
import React, { Suspense, lazy, useEffect } from 'react';

// Lightweight Components (Keep these static for instant shell)
import BottomNav from "@/components/BottomNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

// Lazy Load Pages (These will load later in background)
const lazyWithPreload = (factory: () => Promise<{ default: React.ComponentType<any> }>) => {
  const Component = lazy(factory);
  (Component as any).preload = factory;
  return Component;
};

const Index = lazyWithPreload(() => import("./pages/Index"));
const Shipment = lazyWithPreload(() => import("./pages/Shipment"));
const Tracking = lazyWithPreload(() => import("./pages/Tracking"));
const Revenue = lazyWithPreload(() => import("./pages/Revenue"));
const NotFound = lazyWithPreload(() => import("./pages/NotFound"));
const ExportSurvey = lazyWithPreload(() => import("./pages/ExportSurvey"));
const AnalyticsDashboard = lazyWithPreload(() => import("./pages/Analytics"));

// Payment Pages (Heavy - Lazy Load)
const DrelfPaymentPage = lazyWithPreload(() => import("./pages/co_en/drelf"));
const DrelfLanding = lazyWithPreload(() => import("./pages/co_en/drelflp"));
const FitFactorPaymentPage = lazyWithPreload(() => import("./pages/co_en/fitfactor"));
const HungryLaterPaymentPage = lazyWithPreload(() => import("./pages/co_en/hungrylater"));
const JewelryPaymentPage = lazyWithPreload(() => import("./pages/co_en/jewelry"));
const ParfumPaymentPage = lazyWithPreload(() => import("./pages/co_en/parfum"));

// ID Payment Pages
const DrelfPaymentPageID = lazyWithPreload(() => import("./pages/co_id/id_drelf"));
const FitFactorPaymentPageID = lazyWithPreload(() => import("./pages/co_id/id_fitfactor"));
const HungryLaterPaymentPageID = lazyWithPreload(() => import("./pages/co_id/id_hungrylater"));
const JewelryPaymentPageID = lazyWithPreload(() => import("./pages/co_id/id_elroyaljewelry"));
const ParfumPaymentPageID = lazyWithPreload(() => import("./pages/co_id/id_elroyaleparfum"));
const Lumina = lazyWithPreload(() => import("./pages/fisik/lumina"));
const Bra = lazyWithPreload(() => import("./pages/fisik/bra"));
const PackagePage = lazyWithPreload(() => import("./pages/fisik/package"));
const Research = lazyWithPreload(() => import("./pages/fisik/research"));
const RamadhanRing = lazyWithPreload(() => import("./pages/fisik/ramadhanring"));

export { 
  Index, Shipment, Tracking, Revenue, ExportSurvey, AnalyticsDashboard,
  DrelfPaymentPage, DrelfLanding, FitFactorPaymentPage, HungryLaterPaymentPage, JewelryPaymentPage, ParfumPaymentPage,
  DrelfPaymentPageID, FitFactorPaymentPageID, HungryLaterPaymentPageID, JewelryPaymentPageID, ParfumPaymentPageID,
  Lumina, Bra, PackagePage, Research, RamadhanRing
};

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
  const [searchParams] = useSearchParams();
  const { setLang } = useLocale();

  // Auto-detect Language from URL Parameters (?en or ?id)
  useEffect(() => {
    if (searchParams.has('en')) {
      setLang('en');
    } else if (searchParams.has('id')) {
      setLang('id');
    }
  }, [searchParams, setLang]);
  
  // List of physical product/heavy landing pages that shouldn't show global nav/switcher
  const fisikPaths = [
    '/drelf', '/id_drelf', '/fitfactor', '/id_fitfactor', 
    '/hungrylater', '/id_hungrylater', '/jewelry', '/id_jewelry', 
    '/parfum', '/id_parfum', '/package', '/research', '/ramadhanring'
  ];
  
  const isFisikRoute = fisikPaths.some(path => location.pathname.startsWith(path)) &&
                      !location.pathname.startsWith('/lumina') &&
                      !location.pathname.startsWith('/bra');
  
  const isAnalyticsRoute = location.pathname.startsWith('/analytics');

  return (
    <>
      {/* App Shell (Visible instantly) */}
      {!isFisikRoute && !isAnalyticsRoute && <LanguageSwitcher />}
      {!isFisikRoute && !isAnalyticsRoute && <WhatsAppFloat />}
      
      {/* Page Content (Lazy loaded in chunks) */}
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
          
          {/* Fisik/Payment Routes */}
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
