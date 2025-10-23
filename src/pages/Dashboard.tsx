import { Thermometer, Droplets, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HistoricoRetiradas } from "@/components/HistoricoRetiradas";
import { AnalyticsChart } from "@/components/AnalyticsChart";

function SensorsCard() {
  const sensors = [
    { name: "Temperatura", value: "22,5 °C", status: "Normal", icon: Thermometer },
    { name: "Umidade", value: "45 %", status: "Normal", icon: Droplets },
    { name: "Status", value: "Operacional", status: "Normal", icon: Activity },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Sensores em Tempo Real</h3>
      <div className="space-y-6">
        {sensors.map((sensor, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-light rounded-lg">
                <sensor.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{sensor.name}</p>
                <p className="text-xl font-bold text-card-foreground">{sensor.value}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-success">{sensor.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Home</h1>
        <p className="text-muted-foreground">Dashboard de indicadores do SmartLab</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorsCard />
        <AnalyticsChart />
      </div>

      <HistoricoRetiradas />
    </div>
  );
}
