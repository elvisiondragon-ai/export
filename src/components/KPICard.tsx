import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "info";
}

const KPICard = ({ title, value, icon: Icon, variant = "default" }: KPICardProps) => {
  const variantStyles = {
    default: "bg-card",
    success: "bg-accent/10 border-accent/20",
    warning: "bg-orange-50 border-orange-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div className={cn(
      "p-6 rounded-xl border shadow-card transition-all hover:shadow-elevated",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          variant === "success" && "bg-accent/20",
          variant === "warning" && "bg-orange-100",
          variant === "info" && "bg-blue-100",
          variant === "default" && "bg-muted"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            variant === "success" && "text-accent",
            variant === "warning" && "text-orange-600",
            variant === "info" && "text-blue-600",
            variant === "default" && "text-foreground"
          )} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
