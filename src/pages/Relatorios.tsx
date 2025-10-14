import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

const reports = [
  {
    title: "Relatório Mensal - Junho 2024",
    date: "01/07/2024",
    type: "Consumo Geral",
    size: "2.4 MB",
  },
  {
    title: "Relatório Mensal - Maio 2024",
    date: "01/06/2024",
    type: "Consumo Geral",
    size: "2.1 MB",
  },
  {
    title: "Análise de Dispensers - Q2 2024",
    date: "15/06/2024",
    type: "Manutenção",
    size: "1.8 MB",
  },
  {
    title: "Relatório de Eficiência - Abril 2024",
    date: "01/05/2024",
    type: "Performance",
    size: "3.2 MB",
  },
];

const Relatorios = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Relatórios</h1>
          <p className="text-muted-foreground">Acesse e baixe relatórios detalhados do sistema</p>
        </div>
        <Button size="lg" className="gap-2">
          <FileText className="h-5 w-5" />
          Gerar Novo Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-1">{report.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{report.date}</span>
                    </div>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Baixar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Relatorios;
