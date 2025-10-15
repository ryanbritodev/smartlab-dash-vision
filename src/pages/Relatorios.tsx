import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  const [reportsList, setReportsList] = useState(reports);
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [unit, setUnit] = useState("");
  const { toast } = useToast();

  const handleGenerateReport = () => {
    if (!reportType || !month || !unit) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const newReport = {
      title: `Relatório ${reportType} - ${month}`,
      date: new Date().toLocaleDateString("pt-BR"),
      type: reportType,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
    };

    setReportsList([newReport, ...reportsList]);
    setOpen(false);
    setReportType("");
    setMonth("");
    setUnit("");

    toast({
      title: "Relatório gerado!",
      description: "O relatório foi gerado com sucesso e está disponível para download.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Relatórios</h1>
          <p className="text-muted-foreground">Acesse e baixe relatórios detalhados do sistema</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              Gerar Novo Relatório
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Gerar Novo Relatório</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para gerar um novo relatório do sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consumo Geral">Consumo Geral</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Eficiência">Eficiência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">Período</Label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Outubro 2024">Outubro 2024</SelectItem>
                    <SelectItem value="Setembro 2024">Setembro 2024</SelectItem>
                    <SelectItem value="Agosto 2024">Agosto 2024</SelectItem>
                    <SelectItem value="Julho 2024">Julho 2024</SelectItem>
                    <SelectItem value="Junho 2024">Junho 2024</SelectItem>
                    <SelectItem value="Maio 2024">Maio 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unidade</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas as Unidades</SelectItem>
                    <SelectItem value="Centro">SmartLab Centro</SelectItem>
                    <SelectItem value="Norte">SmartLab Norte</SelectItem>
                    <SelectItem value="Sul">SmartLab Sul</SelectItem>
                    <SelectItem value="Leste">SmartLab Leste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleGenerateReport}>
                Gerar Relatório
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reportsList.map((report, index) => (
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
