import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Activity, Thermometer, ChevronRight, Droplet, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const units = [
  {
    id: 1,
    name: "Unidade A",
    location: "São Paulo - SP",
    address: "Av. Paulista, 1100 - Bela Vista",
    dispensers: 15,
    status: "operational",
    temperature: "22°C",
    consumption: "85%",
    humidity: "65%",
    dispensersList: [
      { id: "D001", section: "Recepção", level: 85, status: "ok" },
      { id: "D002", section: "Laboratório A", level: 60, status: "ok" },
      { id: "D003", section: "Laboratório B", level: 20, status: "low" },
      { id: "D004", section: "Sala de Espera", level: 90, status: "ok" },
    ],
    lastMaintenance: "15/09/2025",
    nextMaintenance: "15/11/2025",
  },
  {
    id: 2,
    name: "Unidade B",
    location: "Rio de Janeiro - RJ",
    address: "Rua das Laranjeiras, 350 - Laranjeiras",
    dispensers: 12,
    status: "operational",
    temperature: "23°C",
    consumption: "65%",
    humidity: "70%",
    dispensersList: [
      { id: "D005", section: "Recepção", level: 75, status: "ok" },
      { id: "D006", section: "Laboratório A", level: 50, status: "ok" },
      { id: "D007", section: "Laboratório B", level: 45, status: "ok" },
    ],
    lastMaintenance: "20/09/2025",
    nextMaintenance: "20/11/2025",
  },
  {
    id: 3,
    name: "Unidade C",
    location: "Belo Horizonte - MG",
    address: "Av. Afonso Pena, 1500 - Centro",
    dispensers: 9,
    status: "alert",
    temperature: "24°C",
    consumption: "45%",
    humidity: "55%",
    dispensersList: [
      { id: "D008", section: "Recepção", level: 15, status: "critical" },
      { id: "D009", section: "Laboratório A", level: 35, status: "low" },
      { id: "D010", section: "Sala de Espera", level: 80, status: "ok" },
    ],
    lastMaintenance: "10/09/2025",
    nextMaintenance: "10/11/2025",
  },
];

const Unidades = () => {
  const [selectedUnit, setSelectedUnit] = useState<typeof units[0] | null>(null);

  const getDispenserStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "text-success";
      case "low":
        return "text-warning";
      case "critical":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getDispenserStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-4 w-4" />;
      case "low":
      case "critical":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Unidades</h1>
        <p className="text-muted-foreground">Gerencie todas as unidades do sistema SmartLab</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <Card 
            key={unit.id} 
            className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedUnit(unit)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-card-foreground mb-1">{unit.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{unit.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
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

      <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedUnit && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between pr-5">
                  {selectedUnit.name}
                  <Badge
                    variant="outline"
                    className={
                      selectedUnit.status === "operational"
                        ? "border-success text-success bg-success-light"
                        : "border-warning text-warning bg-warning-light"
                    }
                  >
                    {selectedUnit.status === "operational" ? "Operacional" : "Alerta"}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedUnit.address}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Informações Gerais */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Thermometer className="h-4 w-4" />
                      <span className="text-sm">Temperatura</span>
                    </div>
                    <p className="text-xl font-bold text-card-foreground">{selectedUnit.temperature}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Droplet className="h-4 w-4" />
                      <span className="text-sm">Umidade</span>
                    </div>
                    <p className="text-xl font-bold text-card-foreground">{selectedUnit.humidity}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm">Dispensers</span>
                    </div>
                    <p className="text-xl font-bold text-card-foreground">{selectedUnit.dispensers}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm">Consumo</span>
                    </div>
                    <p className="text-xl font-bold text-card-foreground">{selectedUnit.consumption}</p>
                  </Card>
                </div>

                {/* Lista de Dispensers */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Dispensers da Unidade</h3>
                  <div className="space-y-3">
                    {selectedUnit.dispensersList.map((dispenser) => (
                      <Card key={dispenser.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={getDispenserStatusColor(dispenser.status)}>
                              {getDispenserStatusIcon(dispenser.status)}
                            </div>
                            <div>
                              <p className="font-semibold text-card-foreground">{dispenser.id}</p>
                              <p className="text-sm text-muted-foreground">{dispenser.section}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium">{dispenser.level}%</span>
                        </div>
                        <Progress value={dispenser.level} className="h-2" />
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Manutenção */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Manutenção</h3>
                  <Card className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Última Manutenção</p>
                        <p className="font-semibold text-card-foreground">{selectedUnit.lastMaintenance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Próxima Manutenção</p>
                        <p className="font-semibold text-card-foreground">{selectedUnit.nextMaintenance}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Unidades;
