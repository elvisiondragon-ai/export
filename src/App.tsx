import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Index from "./pages/Index";
import Shipment from "./pages/Shipment";
import Tracking from "./pages/Tracking";
import Revenue from "./pages/Revenue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocaleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <WhatsAppFloat />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
