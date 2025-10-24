import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  TooltipProps 
} from "recharts";

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
  retiradas: number;
  itensTotal: number;
}

// ===== COMPONENTE CUSTOMIZADO DE TOOLTIP =====

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-card-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            <span className="font-medium">{entry.name}:</span> {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ===== COMPONENTE PRINCIPAL =====

export function AnalyticsChart({ withdrawals }: AnalyticsChartProps) {
  
  // Agrupa retiradas por procedimento e calcula estatísticas
  const dataByProcedure: ChartData[] = withdrawals.reduce((acc, record) => {
    const existing = acc.find(item => item.name === record.procedure.name);
    const totalItems = record.procedure.items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (existing) {
      existing.retiradas += 1;
      existing.itensTotal += totalItems;
    } else {
      acc.push({ 
        name: record.procedure.name, 
        retiradas: 1,
        itensTotal: totalItems
      });
    }
    return acc;
  }, [] as ChartData[]);

  // Ordena por número de retiradas (decrescente)
  const sortedData = [...dataByProcedure].sort((a, b) => b.retiradas - a.retiradas);

  // Calcula estatísticas gerais
  const totalRetiradas = sortedData.reduce((sum, item) => sum + item.retiradas, 0);
  const totalItens = sortedData.reduce((sum, item) => sum + item.itensTotal, 0);

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          Análise Visual - Retiradas por Procedimento
        </h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">{totalRetiradas}</span> retiradas totais
          </span>
          <span>•</span>
          <span>
            <span className="font-medium text-foreground">{totalItens}</span> itens retirados
          </span>
        </div>
      </div>

      {sortedData.length === 0 ? (
        <div className="flex items-center justify-center h-[350px] text-muted-foreground">
          <p>Nenhum dado disponível para exibição</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={sortedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.3}
            />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              style={{ fontSize: '12px' }}
              allowDecimals={false}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
            />
            <Legend 
              wrapperStyle={{ 
                fontSize: '14px',
                color: 'hsl(var(--card-foreground))',
                paddingTop: '20px'
              }}
            />
            <Bar 
              dataKey="retiradas" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
              name="Número de Retiradas"
              maxBarSize={60}
            />
            <Bar 
              dataKey="itensTotal" 
              fill="hsl(var(--primary) / 0.5)" 
              radius={[8, 8, 0, 0]}
              name="Total de Itens"
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {sortedData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Mostrando {sortedData.length} procedimento{sortedData.length !== 1 ? 's' : ''} diferentes
          </p>
        </div>
      )}
    </Card>
  );
}