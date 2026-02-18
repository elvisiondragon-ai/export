const APP_VERSION = '2026.02.17.01'; // <-- Change this number to force an update

if (typeof window !== 'undefined' && localStorage.getItem('v_cache') !== APP_VERSION) {
  // 1. Clear all Service Workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
  }

  // 2. Clear all Browser Caches
  if ('caches' in window) {
    caches.keys().then(names => names.forEach(n => caches.delete(n)));
  }

  // 3. Update version and Hard Reload
  localStorage.setItem('v_cache', APP_VERSION);
  window.location.reload();
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
