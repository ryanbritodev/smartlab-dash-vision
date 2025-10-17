import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Eye, BarChart3, TrendingUp, Users, Clock } from "lucide-react";
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
import jsPDF from "jspdf";

const reports = [
  {
    title: "Relatório Mensal - Junho 2025",
    date: "01/07/2025",
    type: "Consumo Geral",
    size: "2.4 MB",
    summary: "Análise completa do consumo de insumos laboratoriais com foco em eficiência e redução de desperdícios.",
    metrics: {
      totalDispensers: 847,
      consumoTotal: "12.450 L",
      disponibilidade: "98.5%",
      tempoResposta: "2.3 horas",
      economia: "R$ 45.230,00",
      reducaoDesperdicio: "15.2%"
    },
    highlights: [
      "Redução de 15% no consumo de reagentes",
      "Aumento de 12% na eficiência operacional",
      "3 dispensers com manutenção preventiva realizada"
    ],
    trends: "Melhoria consistente nos indicadores de eficiência com destaque para redução no tempo de resposta."
  },
  {
    title: "Relatório Mensal - Maio 2025",
    date: "01/06/2025",
    type: "Consumo Geral",
    size: "2.1 MB",
    summary: "Relatório mensal com análise comparativa e identificação de oportunidades de otimização.",
    metrics: {
      totalDispensers: 832,
      consumoTotal: "13.150 L",
      disponibilidade: "97.8%",
      tempoResposta: "2.7 horas",
      economia: "R$ 38.450,00",
      reducaoDesperdicio: "13.5%"
    },
    highlights: [
      "Implementação de novo protocolo de consumo",
      "Treinamento de equipe concluído",
      "2 dispensers novos instalados"
    ],
    trends: "Crescimento positivo na adoção de boas práticas com redução gradual de desperdícios."
  },
  {
    title: "Análise de Dispensers - Q2 2025",
    date: "15/06/2025",
    type: "Manutenção",
    size: "1.8 MB",
    summary: "Relatório técnico de manutenção preventiva e corretiva dos dispensers do sistema.",
    metrics: {
      totalDispensers: 847,
      consumoTotal: "8.920 L",
      disponibilidade: "99.1%",
      tempoResposta: "1.8 horas",
      economia: "R$ 28.750,00",
      reducaoDesperdicio: "18.7%"
    },
    highlights: [
      "15 manutenções preventivas realizadas",
      "Taxa de disponibilidade acima da meta",
      "Zero paradas não programadas"
    ],
    trends: "Alta confiabilidade do sistema com manutenção proativa mostrando resultados positivos."
  },
  {
    title: "Relatório de Eficiência - Abril 2025",
    date: "01/05/2025",
    type: "Performance",
    size: "3.2 MB",
    summary: "Análise de performance operacional com métricas de eficiência e produtividade.",
    metrics: {
      totalDispensers: 820,
      consumoTotal: "14.230 L",
      disponibilidade: "96.3%",
      tempoResposta: "3.1 horas",
      economia: "R$ 32.180,00",
      reducaoDesperdicio: "11.8%"
    },
    highlights: [
      "Otimização de rotas de manutenção",
      "Atualização de firmware em 45 dispensers",
      "Redução de 20% no tempo de resposta"
    ],
    trends: "Melhoria progressiva nos indicadores de performance após implementação de melhorias."
  }
];

const Relatorios = () => {
  const [reportsList, setReportsList] = useState(reports);
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [unit, setUnit] = useState("");
  const { toast } = useToast();

  const handlePreviewReport = (report) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  const handleDownloadReport = (report) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("SmartLab", 20, 25);
    
    doc.setFontSize(12);
    doc.text(report.title, 20, 35);
    
    // Reset color
    doc.setTextColor(0, 0, 0);
    
    // Report info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Data de Geração: ${report.date}`, 20, 55);
    doc.text(`Tipo: ${report.type}`, 20, 62);
    
    // Content sections
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Resumo Executivo", 20, 80);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    const summaryText = report.summary;
    doc.text(summaryText, 20, 90, { maxWidth: 170 });
    
    // Mock data section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Principais Indicadores", 20, 115);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    const metrics = [
      `• Total de Dispensers Ativos: ${report.metrics.totalDispensers}`,
      `• Consumo Total do Período: ${report.metrics.consumoTotal}`,
      `• Taxa de Disponibilidade: ${report.metrics.disponibilidade}`,
      `• Tempo Médio de Resposta: ${report.metrics.tempoResposta}`,
      `• Economia Gerada: ${report.metrics.economia}`,
      `• Redução de Desperdício: ${report.metrics.reducaoDesperdicio}`
    ];
    
    let yPosition = 125;
    metrics.forEach(metric => {
      doc.text(metric, 25, yPosition);
      yPosition += 8;
    });
    
    // Analysis section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Análise de Tendências", 20, yPosition + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    const analysisText = report.trends;
    doc.text(analysisText, 20, yPosition + 20, { maxWidth: 170 });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("SmartLab - Sistema de Gestão Inteligente de Laboratórios", 20, 280);
    doc.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`, 20, 285);
    
    // Save PDF
    doc.save(`${report.title.replace(/\s+/g, '_')}.pdf`);
    
    toast({
      title: "Download iniciado!",
      description: "O relatório PDF foi baixado com sucesso.",
    });
  };

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
      summary: `Relatório gerado automaticamente para ${month} contendo análise detalhada de ${reportType.toLowerCase()} na unidade ${unit}.`,
      metrics: {
        totalDispensers: Math.floor(Math.random() * 200) + 800,
        consumoTotal: `${(Math.random() * 10 + 8).toFixed(3)} L`,
        disponibilidade: `${(Math.random() * 5 + 95).toFixed(1)}%`,
        tempoResposta: `${(Math.random() * 2 + 1.5).toFixed(1)} horas`,
        economia: `R$ ${(Math.random() * 30000 + 20000).toFixed(2)}`,
        reducaoDesperdicio: `${(Math.random() * 10 + 10).toFixed(1)}%`
      },
      highlights: [
        "Relatório gerado automaticamente pelo sistema",
        "Dados consolidados em tempo real",
        "Análise comparativa com período anterior"
      ],
      trends: "Os dados refletem o estado atual do sistema com métricas atualizadas automaticamente."
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

  const PreviewDialog = () => (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Prévia do Relatório
          </DialogTitle>
          <DialogDescription>
            Visualize os detalhes do relatório antes de fazer o download
          </DialogDescription>
        </DialogHeader>

        {selectedReport && (
          <div className="space-y-6 py-4">
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedReport.date}</span>
                    </div>
                    <span>•</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {selectedReport.type}
                    </span>
                    <span>•</span>
                    <span>{selectedReport.size}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedReport.summary}</p>
            </div>

            {/* Métricas Principais */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Principais Indicadores
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Dispensers Ativos</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.metrics.totalDispensers}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-600">Consumo Total</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.metrics.consumoTotal}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-600">Disponibilidade</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.metrics.disponibilidade}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Tempo de Resposta</span>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.metrics.tempoResposta}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Economia Gerada</span>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.metrics.economia}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Redução de Desperdício</span>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.metrics.reducaoDesperdicio}</p>
                </div>
              </div>
            </div>

            {/* Destaques */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Destaques do Período</h3>
              <div className="space-y-3">
                {selectedReport.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tendências */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Análise de Tendências</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700">{selectedReport.trends}</p>
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-4 border-t ">
              <Button variant="outline" className="hover:bg-primary/10 hover:text-primary" onClick={() => setPreviewOpen(false)}>
                Fechar
              </Button>
              <Button 
                className="gap-2 " 
                onClick={() => {
                  handleDownloadReport(selectedReport);
                  setPreviewOpen(false);
                }}
              >
                <Download className="h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Relatórios</h1>
          <p className="text-muted-foreground">Acesse, visualize e baixe relatórios detalhados do sistema</p>
        </div>
        
       {/* Diálogo de Gerar Novo Relatório (original mantido) */}
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
                  <SelectItem value="Outubro 2025">Outubro 2025</SelectItem>
                  <SelectItem value="Setembro 2025">Setembro 2025</SelectItem>
                  <SelectItem value="Agosto 2025">Agosto 2025</SelectItem>
                  <SelectItem value="Julho 2025">Julho 2025</SelectItem>
                  <SelectItem value="Junho 2025">Junho 2025</SelectItem>
                  <SelectItem value="Maio 2025">Maio 2025</SelectItem>
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
            <Button 
              variant="outline" 
              className="hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleGenerateReport}
            >
              Gerar Relatório
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>

      <PreviewDialog />

      <div className="grid grid-cols-1 gap-4">
        {reportsList.map((report, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
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
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2 hover:bg-primary/10 hover:text-primary border-border"
                  onClick={() => handlePreviewReport(report)}
                >
                  <Eye className="h-4 w-4" />
                  Visualizar
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 hover:bg-primary/10 hover:text-primary border-border" 
                  onClick={() => handleDownloadReport(report)}
                >
                  <Download className="h-4 w-4" />
                  Baixar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Relatorios;