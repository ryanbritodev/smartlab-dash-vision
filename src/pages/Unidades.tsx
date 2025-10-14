import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Activity, Thermometer } from "lucide-react";

const units = [
  {
    name: "Unidade A",
    location: "São Paulo - SP",
    dispensers: 15,
    status: "operational",
    temperature: "22°C",
    consumption: "85%",
  },
  {
    name: "Unidade B",
    location: "Rio de Janeiro - RJ",
    dispensers: 12,
    status: "operational",
    temperature: "23°C",
    consumption: "65%",
  },
  {
    name: "Unidade C",
    location: "Belo Horizonte - MG",
    dispensers: 9,
    status: "alert",
    temperature: "24°C",
    consumption: "45%",
  },
];

const Unidades = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Unidades</h1>
        <p className="text-muted-foreground">Gerencie todas as unidades do sistema SmartLab</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <Card key={unit.name} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-card-foreground mb-1">{unit.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{unit.location}</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  unit.status === "operational"
                    ? "border-success text-success bg-success-light"
                    : "border-warning text-warning bg-warning-light"
                }
              >
                {unit.status === "operational" ? "Operacional" : "Alerta"}
              </Badge>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Dispensers</span>
                </div>
                <span className="font-semibold text-card-foreground">{unit.dispensers}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Thermometer className="h-4 w-4" />
                  <span className="text-sm">Temperatura</span>
                </div>
                <span className="font-semibold text-card-foreground">{unit.temperature}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Consumo</span>
                </div>
                <span className="font-semibold text-card-foreground">{unit.consumption}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Unidades;
