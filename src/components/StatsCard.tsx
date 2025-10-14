import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export function StatsCard({ title, value, icon: Icon, trend, variant = "default" }: StatsCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    success: "bg-success-light border-success",
    warning: "bg-warning-light border-warning",
    danger: "bg-destructive/10 border-destructive",
  };

  const iconStyles = {
    default: "text-primary bg-primary-light",
    success: "text-success bg-success-light",
    warning: "text-warning bg-warning-light",
    danger: "text-destructive bg-destructive/10",
  };

  return (
    <Card className={`p-6 border ${variantStyles[variant]} transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {trend && (
            <p className="text-sm text-muted-foreground">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
