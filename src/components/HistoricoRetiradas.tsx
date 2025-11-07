import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, ChevronDown, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { api, MOCK_DATA } from "../lib/apiConfig"; // Importar API configurada

// Tipos baseados na API
interface Item {
  id: string;
  name: string;
  quantity: number;
}

interface Procedure {
  id: string;
  name: string;
  items: Item[];
}

interface Transaction {
  employeeId: string;
  procedure: Procedure;
  timestamp: string;
}

// Tipo para dados enriquecidos (com informações do funcionário)
interface EnrichedTransaction extends Transaction {
  funcionarioNome?: string;
  funcionarioId: string;
  item: string;
  itensAdicionais: string[];
  procedimento: string;
  horario: string;
  data: string;
  observacoes: string;
  setor: string;
  timestampDate: Date;
}

// Lista de nomes disponíveis para atribuição aleatória
const availableDoctorNames = [
  "Enf. João Silva",
  "Enf. Maria Santos",
  "Enf. Carlos Oliveira",
  "Enf. Ana Paula Costa",
  "Enf. Pedro Henrique Lima",
  "Enf. Juliana Ferreira",
  "Enf. Roberto Almeida",
  "Enf. Camila Rodrigues",
  "Enf. Fernando Martins",
  "Enf. Patrícia Souza",
  "Enf. Ricardo Barbosa",
  "Enf. Beatriz Cardoso",
  "Enf. Marcos Vieira",
  "Enf. Renata Campos",
  "Enf. Leonardo Pereira",
  "Enf. Sandra Moreira",
  "Enf. Gustavo Ribeiro",
  "Enf. Luciana Monteiro",
  "Enf. André Carvalho",
  "Enf. Fernanda Nascimento",
  "Enf. Rafael Costa",
  "Enf. Mariana Alves",
  "Enf. Bruno Teixeira",
  "Enf. Larissa Gomes",
  "Enf. Thiago Mendes",
  "Enf. Gabriela Rocha",
  "Enf. Felipe Araújo",
  "Enf. Carolina Freitas",
  "Enf. Diego Soares",
  "Enf. Isabela Correia",
];

// Cache de mapeamento de IDs para nomes (mantido durante a sessão)
const employeeNames: Record<string, string> = {};

// Função para obter ou atribuir um nome para um employeeId
const getEmployeeName = (employeeId: string): string => {
  // Se já existe um nome atribuído, retorna ele
  if (employeeNames[employeeId]) {
    return employeeNames[employeeId];
  }
  
  // Pega os nomes já usados
  const usedNames = Object.values(employeeNames);
  
  // Encontra nomes ainda não utilizados
  const availableNames = availableDoctorNames.filter(name => !usedNames.includes(name));
  
  // Se ainda há nomes disponíveis, escolhe um aleatório
  if (availableNames.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames[randomIndex];
    employeeNames[employeeId] = selectedName;
    return selectedName;
  }
  
  // Se todos os nomes foram usados, reutiliza um aleatório
  const randomIndex = Math.floor(Math.random() * availableDoctorNames.length);
  const selectedName = availableDoctorNames[randomIndex];
  employeeNames[employeeId] = selectedName;
  return selectedName;
};

export function HistoricoRetiradas() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [transactions, setTransactions] = useState<EnrichedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Buscando transações via API configurada...');
      
      // Usar a API configurada em vez de fetch direto
      const data = await api.getTransactions();
      
      // Enriquecer dados com formatação
      const enrichedData: EnrichedTransaction[] = data.map((transaction: Transaction) => {
        const timestampDate = new Date(transaction.timestamp);
        const items = transaction.procedure.items;
        
        return {
          ...transaction,
          funcionarioId: transaction.employeeId.slice(0, 8),
          funcionarioNome: getEmployeeName(transaction.employeeId),
          item: items[0]?.name || "Item não especificado",
          itensAdicionais: items.slice(1).map(item => item.name),
          procedimento: transaction.procedure.name,
          horario: timestampDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          data: timestampDate.toLocaleDateString('pt-BR'),
          observacoes: `Procedimento realizado com ${items.length} ${items.length === 1 ? 'item' : 'itens'}.`,
          setor: "Laboratório Principal",
          timestampDate: timestampDate,
        };
      });
      
      // Ordenar por data mais recente primeiro
      enrichedData.sort((a, b) => b.timestampDate.getTime() - a.timestampDate.getTime());
      
      setTransactions(enrichedData);
      setUsingFallback(false);
      console.log('Transações carregadas com sucesso:', enrichedData.length);
      
    } catch (err) {
      console.warn('Falha na API, usando dados mockados:', err);
      
      // Fallback para dados mockados
      const mockData = MOCK_DATA.transactions as Transaction[];
      const enrichedMockData: EnrichedTransaction[] = mockData.map((transaction) => {
        const timestampDate = new Date(transaction.timestamp);
        const items = transaction.procedure.items;
        
        return {
          ...transaction,
          funcionarioId: transaction.employeeId.slice(0, 8),
          funcionarioNome: getEmployeeName(transaction.employeeId),
          item: items[0]?.name || "Item não especificado",
          itensAdicionais: items.slice(1).map(item => item.name),
          procedimento: transaction.procedure.name,
          horario: timestampDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          data: timestampDate.toLocaleDateString('pt-BR'),
          observacoes: `Procedimento realizado com ${items.length} ${items.length === 1 ? 'item' : 'itens'}.`,
          setor: "Laboratório Principal",
          timestampDate: timestampDate,
        };
      });
      
      enrichedMockData.sort((a, b) => b.timestampDate.getTime() - a.timestampDate.getTime());
      setTransactions(enrichedMockData);
      setUsingFallback(true);
      
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao buscar dados';
      setError(`⚠️ Modo offline: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const getAllItems = (registro: EnrichedTransaction) => {
    return [registro.item, ...registro.itensAdicionais];
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mr-3" />
          <span className="text-lg text-muted-foreground">Carregando histórico de retiradas...</span>
        </div>
      </Card>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar dados</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">{error}</p>
          <Button onClick={fetchTransactions} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma retirada registrada</h3>
          <p className="text-sm text-muted-foreground">Ainda não há retiradas no sistema.</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-card-foreground">Histórico de Retiradas</h3>
          {usingFallback && (
            <Badge variant="outline" className="text-xs text-yellow-600">
              Modo Demo
            </Badge>
          )}
        </div>
        <Button className="hover:bg-blue-400" onClick={fetchTransactions} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </div>

      {/* Aviso quando usando fallback mas com dados */}
      {error && transactions.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">Dados locais</p>
              <p className="text-xs text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

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
            {transactions.map((registro, index) => (
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
                                {registro.procedure.items.map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    {item.name} {item.quantity > 1 && `(${item.quantity}x)`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">Setor:</p>
                              <p className="text-sm text-muted-foreground">{registro.setor}</p>
                              <p className="text-sm font-semibold text-foreground mb-2 mt-3">ID do Procedimento:</p>
                              <p className="text-sm text-muted-foreground font-mono">{registro.procedure.id.slice(0, 13)}</p>
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

// Exportar também os dados para uso em relatórios (versão atualizada)
export const getTransactionsData = async (): Promise<EnrichedTransaction[]> => {
  try {
    console.log('Exportando dados de transações...');
    const data = await api.getTransactions();
    
    const enrichedData: EnrichedTransaction[] = data.map((transaction: Transaction) => {
      const timestampDate = new Date(transaction.timestamp);
      const items = transaction.procedure.items;
      
      return {
        ...transaction,
        funcionarioId: transaction.employeeId.slice(0, 8),
        funcionarioNome: getEmployeeName(transaction.employeeId),
        item: items[0]?.name || "Item não especificado",
        itensAdicionais: items.slice(1).map(item => item.name),
        procedimento: transaction.procedure.name,
        horario: timestampDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        data: timestampDate.toLocaleDateString('pt-BR'),
        observacoes: `Procedimento realizado com ${items.length} ${items.length === 1 ? 'item' : 'itens'}.`,
        setor: "Laboratório Principal",
        timestampDate: timestampDate,
      };
    });
    
    return enrichedData.sort((a, b) => b.timestampDate.getTime() - a.timestampDate.getTime());
  } catch (err) {
    console.warn('Erro ao exportar transações, usando dados locais:', err);
    // Fallback para dados mockados
    const mockData = MOCK_DATA.transactions as Transaction[];
    const enrichedMockData: EnrichedTransaction[] = mockData.map((transaction) => {
      const timestampDate = new Date(transaction.timestamp);
      const items = transaction.procedure.items;
      
      return {
        ...transaction,
        funcionarioId: transaction.employeeId.slice(0, 8),
        funcionarioNome: getEmployeeName(transaction.employeeId),
        item: items[0]?.name || "Item não especificado",
        itensAdicionais: items.slice(1).map(item => item.name),
        procedimento: transaction.procedure.name,
        horario: timestampDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        data: timestampDate.toLocaleDateString('pt-BR'),
        observacoes: `Procedimento realizado com ${items.length} ${items.length === 1 ? 'item' : 'itens'}.`,
        setor: "Laboratório Principal",
        timestampDate: timestampDate,
      };
    });
    
    return enrichedMockData.sort((a, b) => b.timestampDate.getTime() - a.timestampDate.getTime());
  }
};