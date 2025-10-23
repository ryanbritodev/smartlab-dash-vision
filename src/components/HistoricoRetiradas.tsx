import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const historicoData = [
  {
    funcionarioId: "F-2341",
    funcionarioNome: "Dr. João Silva",
    item: "Luvas Cirúrgicas",
    itensAdicionais: ["Máscara N95", "Álcool Gel"],
    procedimento: "Cirurgia Cardíaca",
    horario: "14:32",
    data: "23/10/2025",
    observacoes: "Procedimento de alta complexidade. Materiais estéreis verificados antes da retirada.",
    setor: "Centro Cirúrgico - Sala 3",
  },
  {
    funcionarioId: "F-1892",
    funcionarioNome: "Enf. Maria Santos",
    item: "Seringa 10ml",
    itensAdicionais: [],
    procedimento: "Coleta de Sangue",
    horario: "13:15",
    data: "23/10/2025",
    observacoes: "Coleta de rotina para exames laboratoriais.",
    setor: "Laboratório - Sala 1",
  },
  {
    funcionarioId: "F-3021",
    funcionarioNome: "Dr. Pedro Costa",
    item: "Cateter",
    itensAdicionais: ["Gaze Estéril", "Esparadrapo"],
    procedimento: "Cateterismo",
    horario: "12:48",
    data: "23/10/2025",
    observacoes: "Procedimento programado. Paciente preparado conforme protocolo.",
    setor: "Hemodinâmica",
  },
  {
    funcionarioId: "F-2156",
    funcionarioNome: "Enf. Ana Paula",
    item: "Termômetro Digital",
    itensAdicionais: [],
    procedimento: "Triagem",
    horario: "11:20",
    data: "23/10/2025",
    observacoes: "Triagem de urgência. Equipamento higienizado após uso.",
    setor: "Pronto Socorro",
  },
  {
    funcionarioId: "F-2789",
    funcionarioNome: "Dr. Carlos Oliveira",
    item: "Kit Intubação",
    itensAdicionais: ["Tubo Endotraqueal", "Laringoscópio", "Fio Guia"],
    procedimento: "UTI - Emergência",
    horario: "10:05",
    data: "23/10/2025",
    observacoes: "Emergência respiratória. Kit completo utilizado conforme protocolo de segurança.",
    setor: "UTI - Leito 12",
  },
];

export function HistoricoRetiradas() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getAllItems = (registro: typeof historicoData[0]) => {
    return [registro.item, ...registro.itensAdicionais];
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Histórico de Retiradas</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium w-12"></th>
              <th className="px-4 py-3 text-left text-sm font-medium">Funcionário/ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Item</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Procedimento</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Horário de Retirada</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {historicoData.map((registro, index) => (
              <Collapsible
                key={index}
                open={expandedRows.includes(index)}
                onOpenChange={() => toggleRow(index)}
                asChild
              >
                <>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <CollapsibleTrigger asChild>
                        <button className="hover:bg-muted p-1 rounded transition-colors">
                          {expandedRows.includes(index) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </CollapsibleTrigger>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{registro.funcionarioNome}</p>
                        <p className="text-sm text-muted-foreground">{registro.funcionarioId}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        <span>{registro.item}</span>
                        {registro.itensAdicionais.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            +{registro.itensAdicionais.length}
                          </Badge>
                        )}
                      </div>
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
                  <CollapsibleContent asChild>
                    <tr className="bg-muted/30">
                      <td></td>
                      <td colSpan={4} className="px-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">Todos os Itens Retirados:</p>
                              <ul className="space-y-1">
                                {getAllItems(registro).map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">Setor:</p>
                              <p className="text-sm text-muted-foreground">{registro.setor}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">Observações:</p>
                            <p className="text-sm text-muted-foreground">{registro.observacoes}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
