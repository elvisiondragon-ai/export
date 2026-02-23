import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Ship, Map, BarChart3 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import * as Pages from "@/App";

const BottomNav = () => {
  const { t } = useLocale();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: t("Home", "Home"), component: Pages.Index },
    { to: "/shipment", icon: Ship, label: t("Shipment", "Shipment"), component: Pages.Shipment },
    { to: "/tracking", icon: Map, label: t("Tracking", "Tracking"), component: Pages.Tracking },
    { to: "/revenue", icon: BarChart3, label: t("Shipment", "Shipment"), component: Pages.Revenue },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-primary/20 z-50">
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all text-muted-foreground hover:text-primary group"
            activeClassName="text-primary bg-primary/5"
            onMouseEnter={() => (item.component as any).preload?.()}
          >
            <item.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="text-[11px] font-bold tracking-wide uppercase">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;