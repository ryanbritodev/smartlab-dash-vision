import { Card } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Recebimento", value: 30, color: "hsl(var(--chart-1))" },
  { name: "Armazenamento", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Distribuição", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Descarte", value: 15, color: "hsl(var(--chart-4))" },
];

export function SectionsChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Seções</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
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
    </Card>
  );
}
