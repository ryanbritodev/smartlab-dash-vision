import { Activity, Package, Users, AlertTriangle } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { SectionsChart } from "@/components/SectionsChart";
import { UnitConsumption } from "@/components/UnitConsumption";
import { SensorsCard } from "@/components/SensorsCard";
import { DispensersTable } from "@/components/DispensersTable";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Home</h1>
        <p className="text-muted-foreground">Dashboard de indicadores do SmartLab</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Unidades"
          value="12"
          icon={Users}
          trend="+2 este mês"
        />
        <StatsCard
          title="Dispensers Ativos"
          value="36"
          icon={Package}
          variant="success"
          trend="100% operacionais"
        />
        <StatsCard
          title="Consumo Médio"
          value="225"
          icon={Activity}
          trend="+12% vs mês anterior"
        />
        <StatsCard
          title="Alertas"
          value="1"
          icon={AlertTriangle}
          variant="warning"
          trend="Nível baixo detectado"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConsumptionChart />
        <SectionsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UnitConsumption />
        <SensorsCard />
      </div>

      <DispensersTable />
    </div>
  );
};

export default Dashboard;
