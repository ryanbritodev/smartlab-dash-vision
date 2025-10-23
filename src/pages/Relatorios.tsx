import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Eye, User, Package, Clock } from "lucide-react";
import { useState } from "react";
import { historicoData } from "@/components/HistoricoRetiradas";
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

const initialReports = [
  {
    title: "Relatório de Retiradas - Últimos 30 dias",
    date: "23/10/2025",
    type: "Histórico de Retiradas",
    periodo: "Últimos 30 dias",
    retiradas: historicoData.slice(0, 5),
  },
  {
    title: "Relatório de Retiradas - Últimos 7 dias",
    date: "23/10/2025",
    type: "Histórico de Retiradas",
    periodo: "Últimos 7 dias",
    retiradas: historicoData.slice(0, 3),
  },
  {
    title: "Relatório de Retiradas - Últimas 24 horas",
    date: "23/10/2025",
    type: "Histórico de Retiradas",
    periodo: "Últimas 24 horas",
    retiradas: historicoData.slice(0, 2),
  },
];

const Relatorios = () => {
  const [reportsList, setReportsList] = useState(initialReports);
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
    doc.text(`Período: ${report.periodo}`, 20, 62);
    doc.text(`Tipo: ${report.type}`, 20, 69);
    
    // Content sections
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Histórico de Retiradas", 20, 85);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Total de Retiradas no Período: ${report.retiradas.length}`, 20, 95);
    
    // Table header
    let yPosition = 110;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 8, "F");
    
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("Funcionário/ID", 22, yPosition);
    doc.text("Itens", 80, yPosition);
    doc.text("Procedimento", 130, yPosition);
    doc.text("Horário", 165, yPosition);
    
    yPosition += 10;
    doc.setFont(undefined, 'normal');
    
    // Table content
    report.retiradas.forEach((retirada, index) => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      
      // Funcionário
      doc.text(retirada.funcionarioNome, 22, yPosition);
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text(retirada.funcionarioId, 22, yPosition + 4);
      
      // Itens
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      const allItems = [retirada.item, ...retirada.itensAdicionais];
      const itemsText = allItems.length > 1 ? `${retirada.item} +${retirada.itensAdicionais.length}` : retirada.item;
      doc.text(itemsText, 80, yPosition, { maxWidth: 45 });
      
      // Procedimento
      doc.text(retirada.procedimento, 130, yPosition, { maxWidth: 30 });
      
      // Horário
      doc.text(retirada.horario, 165, yPosition);
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text(retirada.data, 165, yPosition + 4);
      
      yPosition += 12;
      
      // Separator line
      doc.setDrawColor(220, 220, 220);
      doc.line(20, yPosition - 2, 190, yPosition - 2);
      yPosition += 3;
    });
    
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
    if (!month) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione um período.",
        variant: "destructive",
      });
      return;
    }

    const periodLabels = {
      "30min": "Últimos 30 minutos",
      "1hora": "Última hora",
      "24horas": "Últimas 24 horas",
      "7dias": "Últimos 7 dias",
      "30dias": "Últimos 30 dias",
      "personalizado": "Período Personalizado"
    };

    // Filtrar retiradas baseado no período (aqui simulamos com quantidade de registros)
    let filteredRetiradas = [...historicoData];
    
    switch(month) {
      case "30min":
      case "1hora":
        filteredRetiradas = historicoData.slice(0, 1);
        break;
      case "24horas":
        filteredRetiradas = historicoData.slice(0, 2);
        break;
      case "7dias":
        filteredRetiradas = historicoData.slice(0, 3);
        break;
      case "30dias":
      case "personalizado":
        filteredRetiradas = historicoData;
        break;
    }

    const newReport = {
      title: `Relatório de Retiradas - ${periodLabels[month]}`,
      date: new Date().toLocaleDateString("pt-BR"),
      type: "Histórico de Retiradas",
      periodo: periodLabels[month],
      retiradas: filteredRetiradas,
    };

    setReportsList([newReport, ...reportsList]);
    setOpen(false);
    setMonth("");

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
                    <span className="text-gray-600">Período: {selectedReport.periodo}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Relatório detalhado do histórico de retiradas de materiais, incluindo informações de funcionários, itens, procedimentos e horários.
              </p>
            </div>

            {/* Estatísticas Resumidas */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resumo do Período</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Total de Retiradas</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedReport.retiradas.length}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-600">Funcionários</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(selectedReport.retiradas.map(r => r.funcionarioId)).size}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-600">Total de Itens</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedReport.retiradas.reduce((acc, r) => acc + 1 + r.itensAdicionais.length, 0)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">Procedimentos</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(selectedReport.retiradas.map(r => r.procedimento)).size}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabela de Retiradas */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Detalhamento das Retiradas</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium">Funcionário/ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Itens</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Procedimento</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Horário</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                      {selectedReport.retiradas.map((retirada, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-gray-900">{retirada.funcionarioNome}</p>
                              <p className="text-sm text-gray-600">{retirada.funcionarioId}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-gray-900">{retirada.item}</p>
                              {retirada.itensAdicionais.length > 0 && (
                                <p className="text-sm text-gray-600">
                                  +{retirada.itensAdicionais.length} {retirada.itensAdicionais.length === 1 ? 'item adicional' : 'itens adicionais'}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {retirada.procedimento}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-gray-900">{retirada.horario}</p>
                              <p className="text-xs text-gray-600">{retirada.data}</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" className="hover:bg-primary/10 hover:text-primary" onClick={() => setPreviewOpen(false)}>
                Fechar
              </Button>
              <Button 
                className="gap-2" 
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
              <Label htmlFor="period">Período Temporal</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">Últimos 30 minutos</SelectItem>
                  <SelectItem value="1hora">Última hora</SelectItem>
                  <SelectItem value="24horas">Últimas 24 horas</SelectItem>
                  <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="personalizado">Período Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {month === "personalizado" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Início</Label>
                  <Input type="date" id="startDate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Fim</Label>
                  <Input type="date" id="endDate" />
                </div>
              </div>
            )}
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
                    <span>{report.retiradas.length} retiradas</span>
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