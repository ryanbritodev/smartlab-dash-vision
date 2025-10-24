import { useState, useEffect } from "react";
import { Thermometer, Droplets, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HistoricoRetiradas } from "@/components/HistoricoRetiradas";
import { AnalyticsChart } from "@/components/AnalyticsChart";

// ===== TIPOS E INTERFACES =====

export interface SensorData {
  temperature: {
    value: number;
    unit: string;
    status: string;
  };
  humidity: {
    value: number;
    unit: string;
    status: string;
  };
  operationalStatus: string;
}

export interface ProcedureItem {
  id: string;
  name: string;
  quantity: number;
}

export interface Procedure {
  id: string;
  name: string;
  items: ProcedureItem[];
}

export interface WithdrawalRecord {
  employeeId: string;
  employeeName?: string;
  procedure: Procedure;
  timestamp: string;
}

// ===== DADOS MOCKADOS =====

const mockSensorData: SensorData = {
  temperature: {
    value: 22.5,
    unit: "°C",
    status: "Normal"
  },
  humidity: {
    value: 45,
    unit: "%",
    status: "Normal"
  },
  operationalStatus: "Operacional"
};

const mockWithdrawals: WithdrawalRecord[] = [
  {
    employeeId: "F-2341",
    employeeName: "Dr. João Silva",
    procedure: {
      id: "P-1001",
      name: "Cirurgia Cardíaca",
      items: [
        { id: "I-001", name: "Luvas Cirúrgicas", quantity: 2 },
        { id: "I-002", name: "Máscara N95", quantity: 1 },
        { id: "I-003", name: "Álcool Gel", quantity: 1 }
      ]
    },
    timestamp: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    employeeId: "F-1892",
    employeeName: "Enf. Maria Santos",
    procedure: {
      id: "P-2002",
      name: "Coleta de Sangue",
      items: [
        { id: "I-004", name: "Seringa 10ml", quantity: 3 }
      ]
    },
    timestamp: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    employeeId: "F-3021",
    employeeName: "Dr. Pedro Costa",
    procedure: {
      id: "P-3003",
      name: "Cateterismo",
      items: [
        { id: "I-005", name: "Cateter", quantity: 1 },
        { id: "I-006", name: "Gaze Estéril", quantity: 5 },
        { id: "I-007", name: "Esparadrapo", quantity: 1 }
      ]
    },
    timestamp: new Date(Date.now() - 180 * 60000).toISOString()
  },
  {
    employeeId: "F-2156",
    employeeName: "Enf. Ana Paula",
    procedure: {
      id: "P-4004",
      name: "Triagem",
      items: [
        { id: "I-008", name: "Termômetro Digital", quantity: 1 }
      ]
    },
    timestamp: new Date(Date.now() - 720 * 60000).toISOString()
  },
  {
    employeeId: "F-2789",
    employeeName: "Dr. Carlos Oliveira",
    procedure: {
      id: "P-5005",
      name: "UTI - Emergência",
      items: [
        { id: "I-009", name: "Kit Intubação", quantity: 1 },
        { id: "I-010", name: "Tubo Endotraqueal", quantity: 1 },
        { id: "I-011", name: "Laringoscópio", quantity: 1 },
        { id: "I-012", name: "Fio Guia", quantity: 1 }
      ]
    },
    timestamp: new Date(Date.now() - 2880 * 60000).toISOString()
  },
  {
    employeeId: "F-3456",
    employeeName: "Enf. Roberto Lima",
    procedure: {
      id: "P-6006",
      name: "Curativos",
      items: [
        { id: "I-013", name: "Bandagem Elástica", quantity: 2 },
        { id: "I-014", name: "Tesoura Cirúrgica", quantity: 1 }
      ]
    },
    timestamp: new Date(Date.now() - 4320 * 60000).toISOString()
  },
  {
    employeeId: "F-1234",
    employeeName: "Dr. Fernando Alves",
    procedure: {
      id: "P-7007",
      name: "Consulta",
      items: [
        { id: "I-015", name: "Estetoscópio", quantity: 1 }
      ]
    },
    timestamp: new Date(Date.now() - 10080 * 60000).toISOString()
  }
];

// ===== COMPONENTE SENSORSCARD =====

function SensorsCard({ data }: { data: SensorData }) {
  const sensors = [
    { 
      name: "Temperatura", 
      value: `${data.temperature.value} ${data.temperature.unit}`, 
      status: data.temperature.status, 
      icon: Thermometer 
    },
    { 
      name: "Umidade", 
      value: `${data.humidity.value} ${data.humidity.unit}`, 
      status: data.humidity.status, 
      icon: Droplets 
    },
    { 
      name: "Status", 
      value: data.operationalStatus, 
      status: "Normal", 
      icon: Activity 
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Sensores em Tempo Real</h3>
      <div className="space-y-6">
        {sensors.map((sensor, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <sensor.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{sensor.name}</p>
                <p className="text-xl font-bold text-card-foreground">{sensor.value}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">{sensor.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ===== COMPONENTE PRINCIPAL =====

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>(mockSensorData);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(mockWithdrawals);
  const [loading, setLoading] = useState(false);

  // Simula chamada à API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // ===== INTEGRAÇÃO COM API REAL =====
        // Descomente as linhas abaixo e comente os mocks para usar a API real
        
        // const sensorResponse = await fetch('/api/sensors');
        // const sensorData = await sensorResponse.json();
        // setSensorData(sensorData);
        
        // const withdrawalsResponse = await fetch('/api/withdrawals');
        // const withdrawalsData = await withdrawalsResponse.json();
        // setWithdrawals(withdrawalsData);
        
        // ===== DADOS MOCKADOS =====
        setSensorData(mockSensorData);
        setWithdrawals(mockWithdrawals);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Home</h1>
        <p className="text-muted-foreground">Dashboard de indicadores do SmartLab</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorsCard data={sensorData} />
        <AnalyticsChart withdrawals={withdrawals} />
      </div>

      <HistoricoRetiradas withdrawals={withdrawals} />
    </div>
  );
}