import { useState } from "react";
import { Activity, Package, Users, AlertTriangle, Maximize2, X, Thermometer, Droplets, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// Table components will be rendered with standard HTML
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Pie, PieChart, Cell, Legend, Bar, BarChart } from "recharts";

// StatsCard com expansão
function StatsCard({ title, value, icon: Icon, trend, variant = "default", onExpand }) {
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
    <Card className={`p-6 border ${variantStyles[variant]} transition-all hover:shadow-lg group cursor-pointer relative`} onClick={onExpand}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {trend && <p className="text-sm text-muted-foreground">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

// ConsumptionChart com expansão
function ConsumptionChart({ isExpanded = false, onExpand }) {
  const data = [
    { month: "Jan", value: 100 },
    { month: "Fev", value: 130 },
    { month: "Mar", value: 150 },
    { month: "Abr", value: 175 },
    { month: "Mai", value: 200 },
    { month: "Jun", value: 225 },
  ];

  const expandedData = [
    { month: "Jan", value: 100, target: 120 },
    { month: "Fev", value: 130, target: 140 },
    { month: "Mar", value: 150, target: 160 },
    { month: "Abr", value: 175, target: 170 },
    { month: "Mai", value: 200, target: 190 },
    { month: "Jun", value: 225, target: 210 },
    { month: "Jul", value: 240, target: 230 },
    { month: "Ago", value: 255, target: 250 },
    { month: "Set", value: 270, target: 270 },
    { month: "Out", value: 290, target: 280 },
    { month: "Nov", value: 310, target: 300 },
    { month: "Dez", value: 330, target: 320 },
  ];

  return (
    <Card className="p-6 group cursor-pointer relative hover:shadow-lg transition-all" onClick={onExpand}>
      {!isExpanded && (
        <button
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded-md z-10"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      )}
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        {isExpanded ? "Consumo ao Longo do Tempo - Últimos 12 meses" : "Últimos 6 meses"}
      </h3>
      <ResponsiveContainer width="100%" height={isExpanded ? 400 : 300}>
        <LineChart data={isExpanded ? expandedData : data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
          <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 6 }} activeDot={{ r: 8 }} name="Consumo Real" />
          {isExpanded && <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'hsl(var(--chart-2))', r: 4 }} name="Meta" />}
        </LineChart>
      </ResponsiveContainer>
      {isExpanded && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Média Mensal</p>
            <p className="text-2xl font-bold text-card-foreground">225</p>
            <p className="text-xs text-muted-foreground mt-1">unidades</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Pico Máximo</p>
            <p className="text-2xl font-bold text-card-foreground">330</p>
            <p className="text-xs text-muted-foreground mt-1">em Dezembro</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Crescimento</p>
            <p className="text-2xl font-bold text-success">+46%</p>
            <p className="text-xs text-muted-foreground mt-1">vs ano anterior</p>
          </div>
        </div>
      )}
    </Card>
  );
}

// SectionsChart com expansão
function SectionsChart({ isExpanded = false, onExpand }) {
  const data = [
    { name: "Recebimento", value: 30, color: "hsl(var(--chart-1))" },
    { name: "Armazenamento", value: 35, color: "hsl(var(--chart-2))" },
    { name: "Distribuição", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Descarte", value: 15, color: "hsl(var(--chart-4))" },
  ];

  return (
    <Card className="p-6 group cursor-pointer relative hover:shadow-lg transition-all" onClick={onExpand}>
      {!isExpanded && (
        <button
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded-md z-10"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      )}
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Seções</h3>
      <ResponsiveContainer width="100%" height={isExpanded ? 400 : 300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isExpanded ? 80 : 60}
            outerRadius={isExpanded ? 140 : 100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value) => <span className="text-sm text-card-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      {isExpanded && (
        <div className="mt-6 space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold">{item.value}%</span>
                <p className="text-xs text-muted-foreground">{Math.floor(item.value * 2.25)} unidades</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// UnitConsumption com expansão
function UnitConsumption({ isExpanded = false, onExpand }) {
  const units = [
    { name: "Unidade A", consumption: 85 },
    { name: "Unidade B", consumption: 65 },
    { name: "Unidade C", consumption: 45 },
  ];

  const allUnits = [
    ...units,
    { name: "Unidade D", consumption: 78 },
    { name: "Unidade E", consumption: 92 },
    { name: "Unidade F", consumption: 55 },
    { name: "Unidade G", consumption: 40 },
    { name: "Unidade H", consumption: 70 },
  ];

  const displayUnits = isExpanded ? allUnits : units;

  return (
    <Card className="p-6 group cursor-pointer relative hover:shadow-lg transition-all" onClick={onExpand}>
      {!isExpanded && (
        <button
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded-md z-10"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      )}
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Consumo por Unidade</h3>
      <div className={`space-y-6 ${isExpanded ? 'max-h-96 overflow-y-auto pr-2' : ''}`}>
        {displayUnits.map((unit) => (
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

// SensorsCard com expansão
function SensorsCard({ isExpanded = false, onExpand }) {
  const sensors = [
    { name: "Temperatura", value: "22,5 °C", status: "Normal", icon: Thermometer },
    { name: "Umidade", value: "45 %", status: "Normal", icon: Droplets },
    { name: "Status", value: "Operacional", status: "Normal", icon: Activity },
  ];

  const allSensors = [
    ...sensors,
    { name: "Pressão", value: "1013 hPa", status: "Normal", icon: Activity },
    { name: "CO₂", value: "420 ppm", status: "Normal", icon: Activity },
    { name: "Luminosidade", value: "450 lux", status: "Normal", icon: Activity },
  ];

  const displaySensors = isExpanded ? allSensors : sensors;

  return (
    <Card className="p-6 group cursor-pointer relative hover:shadow-lg transition-all" onClick={onExpand}>
      {!isExpanded && (
        <button
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded-md z-10"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      )}
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Sensores em Tempo Real</h3>
      <div className="space-y-6">
        {displaySensors.map((sensor, i) => (
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

// DispensersTable com expansão
function DispensersTable({ isExpanded = false, onExpand }) {
  const dispensers = [
    { unit: "Unidade A", location: "Enfermaria 1", level: "Alto", status: "operational" },
    { unit: "Unidade B", location: "Enfermaria 2", level: "Médio", status: "operational" },
    { unit: "Unidade C", location: "Enfermaria 3", level: "Baixo", status: "alert" },
  ];

  const allDispensers = [
    ...dispensers,
    { unit: "Unidade D", location: "Enfermaria 4", level: "Alto", status: "operational" },
    { unit: "Unidade E", location: "UTI 1", level: "Médio", status: "operational" },
    { unit: "Unidade F", location: "UTI 2", level: "Alto", status: "operational" },
    { unit: "Unidade G", location: "Pronto Socorro", level: "Baixo", status: "alert" },
    { unit: "Unidade H", location: "Recepção", level: "Alto", status: "operational" },
  ];

  const displayDispensers = isExpanded ? allDispensers : dispensers;

  return (
    <Card className="p-6 group cursor-pointer relative hover:shadow-lg transition-all" onClick={onExpand}>
      {!isExpanded && (
        <button
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded-md z-10"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      )}
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Dispensers</h3>
      <div className={`overflow-x-auto ${isExpanded ? 'max-h-96 overflow-y-auto' : ''}`}>
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium">Unidade</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Local</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Nível</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {displayDispensers.map((dispenser, index) => (
              <tr key={index} className="hover:bg-muted/50">
                <td className="px-4 py-3 font-medium">{dispenser.unit}</td>
                <td className="px-4 py-3">{dispenser.location}</td>
                <td className="px-4 py-3">{dispenser.level}</td>
                <td className="px-4 py-3">
                  {dispenser.status === "operational" ? (
                    <Badge variant="outline" className="border-success text-success bg-success-light">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operacional
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-warning text-warning bg-warning-light">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Alerta
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// Dashboard Principal
export default function Dashboard() {
  const [expandedComponent, setExpandedComponent] = useState(null);

  const handleExpand = (component) => {
    setExpandedComponent(component);
  };

  const handleClose = () => {
    setExpandedComponent(null);
  };

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
          onExpand={() => handleExpand('units')}
        />
        <StatsCard
          title="Dispensers Ativos"
          value="36"
          icon={Package}
          variant="success"
          trend="100% operacionais"
          onExpand={() => handleExpand('dispensers-stats')}
        />
        <StatsCard
          title="Consumo Médio"
          value="225"
          icon={Activity}
          trend="+12% vs mês anterior"
          onExpand={() => handleExpand('consumption-stats')}
        />
        <StatsCard
          title="Alertas"
          value="1"
          icon={AlertTriangle}
          variant="warning"
          trend="Nível baixo detectado"
          onExpand={() => handleExpand('alerts')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConsumptionChart onExpand={() => handleExpand('consumption')} />
        <SectionsChart onExpand={() => handleExpand('sections')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UnitConsumption onExpand={() => handleExpand('units-consumption')} />
        <SensorsCard onExpand={() => handleExpand('sensors')} />
      </div>

      <DispensersTable onExpand={() => handleExpand('dispensers')} />

      {/* Modais */}
      <Dialog open={expandedComponent === 'consumption'} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Consumo ao Longo do Tempo - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <ConsumptionChart isExpanded={true} onExpand={() => {}} />
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'sections'} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Consumo por Seção - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <SectionsChart isExpanded={true} onExpand={() => {}} />
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'units-consumption'} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Consumo por Unidade - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <UnitConsumption isExpanded={true} onExpand={() => {}} />
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'sensors'} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sensores em Tempo Real - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <SensorsCard isExpanded={true} onExpand={() => {}} />
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'dispensers'} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Todos os Dispensers</DialogTitle>
          </DialogHeader>
          <DispensersTable isExpanded={true} onExpand={() => {}} />
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'units'} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Total de Unidades - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-primary-light border-primary">
                <p className="text-sm text-muted-foreground mb-1">Total de Unidades</p>
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground mt-1">100% ativas</p>
              </Card>
              <Card className="p-4 bg-success-light border-success">
                <p className="text-sm text-muted-foreground mb-1">Novas este Mês</p>
                <p className="text-3xl font-bold text-success">+2</p>
                <p className="text-xs text-muted-foreground mt-1">20% crescimento</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Média de Consumo</p>
                <p className="text-3xl font-bold">187</p>
                <p className="text-xs text-muted-foreground mt-1">unidades/mês</p>
              </Card>
            </div>
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Lista Completa de Unidades</h4>
              <div className="space-y-2">
                {['Unidade A', 'Unidade B', 'Unidade C', 'Unidade D', 'Unidade E', 'Unidade F', 'Unidade G', 'Unidade H', 'Unidade I', 'Unidade J', 'Unidade K', 'Unidade L'].map((unit, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="font-medium">{unit}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 200 + 100)} unidades/mês</span>
                      <Badge variant="outline" className="border-success text-success bg-success-light">Ativa</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'dispensers-stats'} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dispensers Ativos - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-success-light border-success">
                <p className="text-sm text-muted-foreground mb-1">Total Ativos</p>
                <p className="text-3xl font-bold text-success">36</p>
                <p className="text-xs text-muted-foreground mt-1">de 36 totais</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Taxa Operacional</p>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-xs text-muted-foreground mt-1">0 em manutenção</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Tempo Médio Online</p>
                <p className="text-3xl font-bold">99.8%</p>
                <p className="text-xs text-muted-foreground mt-1">últimos 30 dias</p>
              </Card>
            </div>
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Status por Localização</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { location: 'Enfermaria', ativos: 12, total: 12 },
                  { location: 'UTI', ativos: 8, total: 8 },
                  { location: 'Pronto Socorro', ativos: 6, total: 6 },
                  { location: 'Recepção', ativos: 4, total: 4 },
                  { location: 'Ambulatório', ativos: 6, total: 6 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="location" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="ativos" fill="hsl(var(--success))" name="Ativos" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'consumption-stats'} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Consumo Médio - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-primary-light border-primary">
                <p className="text-sm text-muted-foreground mb-1">Consumo Médio</p>
                <p className="text-3xl font-bold text-primary">225</p>
                <p className="text-xs text-muted-foreground mt-1">unidades/dia</p>
              </Card>
              <Card className="p-4 bg-success-light border-success">
                <p className="text-sm text-muted-foreground mb-1">Crescimento</p>
                <p className="text-3xl font-bold text-success">+12%</p>
                <p className="text-xs text-muted-foreground mt-1">vs mês anterior</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Projeção Mensal</p>
                <p className="text-3xl font-bold">6.750</p>
                <p className="text-xs text-muted-foreground mt-1">unidades</p>
              </Card>
            </div>
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Consumo por Período do Dia</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { periodo: 'Manhã\n(6h-12h)', consumo: 95 },
                  { periodo: 'Tarde\n(12h-18h)', consumo: 75 },
                  { periodo: 'Noite\n(18h-00h)', consumo: 45 },
                  { periodo: 'Madrugada\n(0h-6h)', consumo: 10 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="periodo" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="consumo" fill="hsl(var(--primary))" name="Unidades" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Métricas Adicionais</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Pico Diário</p>
                  <p className="text-2xl font-bold">289 unidades</p>
                  <p className="text-xs text-muted-foreground mt-1">Registrado em 10/10</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Menor Consumo</p>
                  <p className="text-2xl font-bold">187 unidades</p>
                  <p className="text-xs text-muted-foreground mt-1">Registrado em 15/10</p>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={expandedComponent === 'alerts'} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Alertas - Visão Detalhada</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-warning-light border-warning">
                <p className="text-sm text-muted-foreground mb-1">Alertas Ativos</p>
                <p className="text-3xl font-bold text-warning">1</p>
                <p className="text-xs text-muted-foreground mt-1">requer atenção</p>
              </Card>
              <Card className="p-4 bg-success-light border-success">
                <p className="text-sm text-muted-foreground mb-1">Resolvidos Hoje</p>
                <p className="text-3xl font-bold text-success">3</p>
                <p className="text-xs text-muted-foreground mt-1">100% atendidos</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Tempo Médio</p>
                <p className="text-3xl font-bold">45min</p>
                <p className="text-xs text-muted-foreground mt-1">para resolução</p>
              </Card>
            </div>
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Alertas Ativos</h4>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-warning bg-warning-light/20 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <span className="font-semibold">Nível Baixo Detectado</span>
                    </div>
                    <Badge variant="outline" className="border-warning text-warning bg-warning-light">Ativo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Dispenser na Unidade C - Enfermaria 3</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Detectado há 2h 15min</span>
                    <span>•</span>
                    <span>Nível atual: 15%</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Histórico de Alertas (Últimas 24h)</h4>
              <div className="space-y-2">
                {[
                  { tipo: 'Nível Baixo', unidade: 'Unidade A', status: 'Resolvido', tempo: '3h atrás' },
                  { tipo: 'Manutenção', unidade: 'Unidade E', status: 'Resolvido', tempo: '5h atrás' },
                  { tipo: 'Nível Baixo', unidade: 'Unidade B', status: 'Resolvido', tempo: '8h atrás' }
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-medium text-sm">{alert.tipo} - {alert.unidade}</p>
                        <p className="text-xs text-muted-foreground">{alert.tempo}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-success text-success bg-success-light text-xs">{alert.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}