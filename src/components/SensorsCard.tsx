import { Card } from "@/components/ui/card";
import { Thermometer, Droplets, Activity } from "lucide-react";

export function SensorsCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Sensores em Tempo Real</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-light rounded-lg">
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperatura</p>
              <p className="text-2xl font-bold text-card-foreground">22,5 °C</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-success">Normal</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-light rounded-lg">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Umidade</p>
              <p className="text-2xl font-bold text-card-foreground">45 %</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-success">Normal</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-light rounded-lg">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-bold text-success">Operacional</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
