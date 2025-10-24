import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  timestamp: string; // ISO 8601 format
}

interface HistoricoRetiradasProps {
  withdrawals: WithdrawalRecord[];
}

// ===== COMPONENTE PRINCIPAL =====

export function HistoricoRetiradas({ withdrawals }: HistoricoRetiradasProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  
  const toggleRow = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const dateStr = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return { time, date: dateStr };
  };

  const getMainItem = (items: ProcedureItem[]) => {
    return items[0]?.name || "N/A";
  };

  const getAdditionalItemsCount = (items: ProcedureItem[]) => {
    return items.length - 1;
  };

  const getTotalQuantity = (items: ProcedureItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Histórico de Retiradas
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium w-12"></th>
              <th className="px-4 py-3 text-left text-sm font-medium">Funcionário/ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Item Principal</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Procedimento</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Horário de Retirada</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {withdrawals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhuma retirada registrada
                </td>
              </tr>
            ) : (
              withdrawals.map((record, index) => {
                const { time, date } = formatDateTime(record.timestamp);
                const mainItem = getMainItem(record.procedure.items);
                const additionalCount = getAdditionalItemsCount(record.procedure.items);
                
                return (
                  <Collapsible
                    key={`${record.employeeId}-${index}`}
                    open={expandedRows.includes(index)}
                    onOpenChange={() => toggleRow(index)}
                    asChild
                  >
                    <>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <CollapsibleTrigger asChild>
                            <button 
                              className="hover:bg-muted p-1 rounded transition-colors"
                              aria-label={expandedRows.includes(index) ? "Recolher detalhes" : "Expandir detalhes"}
                            >
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
                            <p className="font-medium text-card-foreground">
                              {record.employeeName || record.employeeId}
                            </p>
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-primary" />
                            <span className="text-card-foreground">{mainItem}</span>
                            {additionalCount > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                +{additionalCount}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{record.procedure.name}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-card-foreground">{time}</p>
                              <p className="text-xs text-muted-foreground">{date}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <CollapsibleContent asChild>
                        <tr className="bg-muted/30">
                          <td></td>
                          <td colSpan={4} className="px-4 py-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <p className="text-sm font-semibold text-foreground mb-2">
                                    Todos os Itens Retirados:
                                  </p>
                                  <ul className="space-y-2">
                                    {record.procedure.items.map((item) => (
                                      <li 
                                        key={item.id} 
                                        className="text-sm text-muted-foreground flex items-center gap-2"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                        <span className="flex-1">
                                          {item.name}
                                        </span>
                                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                                          Qtd: {item.quantity}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">
                                      Informações do Procedimento:
                                    </p>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                      <p>
                                        <span className="font-medium">ID:</span> {record.procedure.id}
                                      </p>
                                      <p>
                                        <span className="font-medium">Total de itens únicos:</span>{" "}
                                        {record.procedure.items.length}
                                      </p>
                                      <p>
                                        <span className="font-medium">Quantidade total:</span>{" "}
                                        {getTotalQuantity(record.procedure.items)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}