import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const units = [
  { name: "Unidade A", consumption: 85 },
  { name: "Unidade B", consumption: 65 },
  { name: "Unidade C", consumption: 45 },
];

export function UnitConsumption() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Consumo por Unidade</h3>
      <div className="space-y-6">
        {units.map((unit) => (
          <div key={unit.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-card-foreground">{unit.name}</span>
              <span className="text-sm text-muted-foreground">{unit.consumption}%</span>
            </div>
            <Progress value={unit.consumption} className="h-3" />
          </div>
        ))}
      </div>
    </Card>
  );
}
