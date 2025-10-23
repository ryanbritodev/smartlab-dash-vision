import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataByProcedure = [
  { name: "Cirurgia", retiradas: 45 },
  { name: "Triagem", retiradas: 78 },
  { name: "UTI", retiradas: 32 },
  { name: "Coleta", retiradas: 65 },
  { name: "Cateterismo", retiradas: 28 },
];

export function AnalyticsChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Análise Visual - Retiradas por Procedimento
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dataByProcedure}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--card-foreground))' }}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: '14px',
              color: 'hsl(var(--card-foreground))'
            }}
          />
          <Bar 
            dataKey="retiradas" 
            fill="hsl(var(--primary))" 
            radius={[8, 8, 0, 0]}
            name="Número de Retiradas"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
