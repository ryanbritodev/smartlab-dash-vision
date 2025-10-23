import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const historicoData = [
  {
    funcionarioId: "F-2341",
    funcionarioNome: "Dr. João Silva",
    item: "Luvas Cirúrgicas",
    itensAdicionais: ["Máscara N95", "Álcool Gel"],
    procedimento: "Cirurgia Cardíaca",
    horario: "14:32",
    data: "23/10/2025",
  },
  {
    funcionarioId: "F-1892",
    funcionarioNome: "Enf. Maria Santos",
    item: "Seringa 10ml",
    itensAdicionais: [],
    procedimento: "Coleta de Sangue",
    horario: "13:15",
    data: "23/10/2025",
  },
  {
    funcionarioId: "F-3021",
    funcionarioNome: "Dr. Pedro Costa",
    item: "Cateter",
    itensAdicionais: ["Gaze Estéril", "Esparadrapo"],
    procedimento: "Cateterismo",
    horario: "12:48",
    data: "23/10/2025",
  },
  {
    funcionarioId: "F-2156",
    funcionarioNome: "Enf. Ana Paula",
    item: "Termômetro Digital",
    itensAdicionais: [],
    procedimento: "Triagem",
    horario: "11:20",
    data: "23/10/2025",
  },
  {
    funcionarioId: "F-2789",
    funcionarioNome: "Dr. Carlos Oliveira",
    item: "Kit Intubação",
    itensAdicionais: ["Tubo Endotraqueal", "Laringoscópio", "Fio Guia"],
    procedimento: "UTI - Emergência",
    horario: "10:05",
    data: "23/10/2025",
  },
];

export function HistoricoRetiradas() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Histórico de Retiradas</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium">Funcionário/ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Item</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Procedimento</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Horário de Retirada</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {historicoData.map((registro, index) => (
              <tr key={index} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{registro.funcionarioNome}</p>
                    <p className="text-sm text-muted-foreground">{registro.funcionarioId}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {registro.itensAdicionais.length > 0 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <Package className="h-4 w-4 text-primary" />
                            <span>{registro.item}</span>
                            <Badge variant="secondary" className="text-xs">
                              +{registro.itensAdicionais.length}
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="font-semibold mb-2">Itens retirados:</p>
                          <ul className="space-y-1">
                            <li>• {registro.item}</li>
                            {registro.itensAdicionais.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span>{registro.item}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{registro.procedimento}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{registro.horario}</p>
                      <p className="text-xs text-muted-foreground">{registro.data}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
