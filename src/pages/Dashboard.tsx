import { useState, useEffect } from "react";
import { Thermometer, Droplets, Activity, RefreshCw, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoricoRetiradas } from "@/components/HistoricoRetiradas";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { api, MOCK_DATA } from "../lib/apiConfig"; // Importar API configurada

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

// ===== COMPONENTE SENSORSCARD =====

function SensorsCard({ data, onRefresh, loading }: { 
  data: SensorData; 
  onRefresh: () => void;
  loading: boolean;
}) {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'normal' || statusLower === 'operacional') {
      return 'text-green-600';
    }
    if (statusLower === 'alerta' || statusLower === 'warning') {
      return 'text-yellow-600';
    }
    if (statusLower === 'crítico' || statusLower === 'critical' || statusLower === 'inoperante') {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const sensors = [
    { 
      name: "Temperatura", 
      value: `${data.temperature.value} ${data.temperature.unit}`, 
      status: data.temperature.status, 
      icon: Thermometer,
      color: getStatusColor(data.temperature.status)
    },
    { 
      name: "Umidade", 
      value: `${data.humidity.value} ${data.humidity.unit}`, 
      status: data.humidity.status, 
      icon: Droplets,
      color: getStatusColor(data.humidity.status)
    },
    { 
      name: "Status Operacional", 
      value: data.operationalStatus, 
      status: data.operationalStatus, 
      icon: Activity,
      color: getStatusColor(data.operationalStatus)
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Sensores em Tempo Real</h3>
        <Button 
          className="hover:bg-blue-400"
          onClick={onRefresh} 
          variant="outline" 
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
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
              <p className={`text-sm font-medium ${sensor.color}`}>{sensor.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ===== COMPONENTE PRINCIPAL =====

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchSensorData = async () => {
    try {
      // Usar API configurada com proxy
      const data = await api.getMonitoring();
      setSensorData(data);
      setLastUpdate(new Date());
      setUsingFallback(false);
    } catch (err) {
      console.error('Erro ao buscar dados dos sensores:', err);
      // Fallback para dados mockados
      setSensorData(MOCK_DATA.monitoring as SensorData);
      setUsingFallback(true);
      throw err;
    }
  };

  const fetchWithdrawals = async () => {
    try {
      // Usar API configurada com proxy
      const data = await api.getTransactions();
      setWithdrawals(data);
    } catch (err) {
      console.error('Erro ao buscar transações:', err);
      // Fallback para dados mockados
      setWithdrawals(MOCK_DATA.transactions as WithdrawalRecord[]);
      setUsingFallback(true);
      throw err;
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchSensorData(),
        fetchWithdrawals()
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados';
      setError(errorMessage);
      console.error('Detalhes do erro:', err);
      
      // Verifica se é um erro de CORS/Network
      if (errorMessage.includes('NetworkError') || errorMessage.includes('Failed to fetch')) {
        setError('⚠️ Problema de CORS detectado. Configure CORS no backend ou ative USE_CORS_PROXY no apiConfig.ts');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    // Atualizar automaticamente a cada 10 segundos
    const interval = setInterval(() => {
      fetchAllData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading && !sensorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados do laboratório...</p>
        </div>
      </div>
    );
  }

  if (error && !sensorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar dados</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <div className="space-y-2 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
              <p className="text-xs text-yellow-800 font-semibold">💡 Soluções:</p>
              <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                <li>Configure CORS no backend (solução ideal)</li>
                <li>Ou ative USE_CORS_PROXY no apiConfig.ts</li>
                <li>Consulte o arquivo SOLUÇÃO_CORS.md</li>
              </ul>
            </div>
            <Button onClick={fetchAllData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Home</h1>
          <p className="text-muted-foreground">
            Dashboard de indicadores do SmartLab
            {lastUpdate && (
              <span className="ml-2 text-xs">
                • Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
              </span>
            )}
            {usingFallback && (
              <span className="ml-2 text-xs text-yellow-600 font-semibold">
                • Usando dados mockados (CORS bloqueado)
              </span>
            )}
          </p>
        </div>
        <Button 
          className="hover:bg-blue-400"
          onClick={fetchAllData} 
          variant="outline"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar Tudo
        </Button>
      </div>

      {error && sensorData && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-800">Aviso: Problema de conexão detectado</p>
              <p className="text-xs text-yellow-700 mt-1">{error}</p>
              <p className="text-xs text-yellow-600 mt-2">
                📖 Consulte o arquivo <code className="bg-yellow-100 px-1 py-0.5 rounded">SOLUÇÃO_CORS.md</code> para resolver definitivamente.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sensorData && (
          <SensorsCard 
            data={sensorData} 
            onRefresh={fetchSensorData}
            loading={loading}
          />
        )}
        <AnalyticsChart withdrawals={withdrawals} />
      </div>

      <HistoricoRetiradas />
    </div>
  );
}