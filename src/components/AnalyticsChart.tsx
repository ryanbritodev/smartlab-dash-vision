import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  TooltipProps 
} from "recharts";
import { TrendingUp, Package } from "lucide-react";

// ===== TIPOS E INTERFACES =====

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

interface AnalyticsChartProps {
  withdrawals: WithdrawalRecord[];
}

interface ChartData {
  name: string;
  quantidade: number;
}

// ===== COMPONENTE CUSTOMIZADO DE TOOLTIP =====

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-primary/30 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-4 w-4 text-primary" />
          <p className="font-bold text-gray-900">{label}</p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{payload[0].value}</span>
          <span className="text-sm text-gray-600">retiradas</span>
        </div>
      </div>
    );
  }
  return null;
}

// ===== COMPONENTE PRINCIPAL =====

export function AnalyticsChart({ withdrawals }: AnalyticsChartProps) {
  
  // Conta quantas vezes cada procedimento foi retirado
  const procedureCount = withdrawals.reduce((acc, withdrawal) => {
    const procedureName = withdrawal.procedure.name;
    acc[procedureName] = (acc[procedureName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Converte para formato de array e ordena
  const chartData: ChartData[] = Object.entries(procedureCount)
    .map(([name, quantidade]) => ({ name, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);

  // Cores sólidas e vibrantes
  const COLORS = [
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#f59e0b', // amber-500
    '#10b981', // emerald-500
    '#06b6d4', // cyan-500
    '#f97316', // orange-500
    '#14b8a6', // teal-500
    '#a855f7', // purple-500
    '#6366f1', // indigo-500
    '#ef4444', // red-500
    '#84cc16', // lime-500
  ];

  // Calcula total de retiradas e procedimento mais popular
  const totalRetiradas = chartData.reduce((sum, item) => sum + item.quantidade, 0);
  const topProcedure = chartData[0];

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-card-foreground">
            Análise Visual - Retiradas por Procedimento
          </h3>
        </div>
        
        {/* Estatísticas em cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-medium text-primary mb-1">Total de Retiradas</p>
            <p className="text-2xl font-bold text-primary">{totalRetiradas}</p>
          </div>
          {topProcedure && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-medium text-primary mb-1">Mais Retirado</p>
              <p className="text-sm font-bold text-primary truncate">{topProcedure.name}</p>
              <p className="text-xs text-primary font-bold">{topProcedure.quantidade}x</p>
            </div>
          )}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[350px] text-muted-foreground">
          <Package className="h-16 w-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium">Nenhum dado disponível</p>
          <p className="text-sm text-gray-400">As retiradas aparecerão aqui</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                vertical={false}
              />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '11px', fontWeight: '500' }}
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fill: '#4b5563' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '11px', fontWeight: '500' }}
                allowDecimals={false}
                tick={{ fill: '#4b5563' }}
                label={{ 
                  value: 'Quantidade de Retiradas', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '12px', fill: '#6b7280', fontWeight: '600' }
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: '#f3f4f6', opacity: 0.5 }}
              />
              <Bar 
                dataKey="quantidade" 
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer com informações */}
      {chartData.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              <span className="font-semibold text-gray-700">{chartData.length}</span> procedimento{chartData.length !== 1 ? 's' : ''} diferentes
            </span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {COLORS.slice(0, Math.min(5, chartData.length)).map((color, i) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {chartData.length > 5 && (
                <span className="text-gray-400">+{chartData.length - 5}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}