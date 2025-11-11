import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Ship, FileText, Map, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/shipments", icon: Ship, label: "Shipments" },
  { to: "/documents", icon: FileText, label: "Documents" },
  { to: "/tracking", icon: Map, label: "Tracking" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50">
      <div className="flex justify-around items-center h-16 max-w-7xl mx-auto px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            activeClassName="text-accent bg-accent/10"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
