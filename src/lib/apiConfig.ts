// apiConfig.ts - Configuração da API com suporte a Proxy CORS

// Opção 1: Usar proxy CORS público (apenas para desenvolvimento/testes)
const USE_CORS_PROXY = true; // Altere para false quando CORS for configurado no backend
const CORS_PROXY = 'https://corsproxy.io/?'; // Alternativas: 'https://cors-anywhere.herokuapp.com/'

// URLs base da API
const API_BASE_URL = 'https://api.smartlab-next.space';

// Função auxiliar para adicionar proxy se necessário
const getUrl = (endpoint: string): string => {
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  return USE_CORS_PROXY ? `${CORS_PROXY}${encodeURIComponent(fullUrl)}` : fullUrl;
};

// Configuração de fetch com tratamento de erro
export const fetchWithErrorHandling = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = getUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    return response;
  } catch (error) {
    console.error(`Erro ao fazer requisição para ${endpoint}:`, error);
    throw error;
  }
};

// Endpoints da API
export const API_ENDPOINTS = {
  MONITORING: '/laboratory/monitoring',
  TRANSACTIONS: '/transactions/',
};

// Funções específicas para cada endpoint
export const api = {
  // Buscar dados de monitoramento (sensores)
  getMonitoring: async () => {
    try {
      const response = await fetchWithErrorHandling(API_ENDPOINTS.MONITORING);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar dados de monitoramento:', error);
      throw error;
    }
  },

  // Buscar transações
  getTransactions: async () => {
    try {
      const response = await fetchWithErrorHandling(API_ENDPOINTS.TRANSACTIONS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  },
};

// Dados mockados para fallback
export const MOCK_DATA = {
  monitoring: {
    humidity: {
      status: "Normal",
      unit: "%",
      value: 53
    },
    operationalStatus: "Operacional",
    temperature: {
      status: "Normal",
      unit: "°C",
      value: 24.7
    }
  },
  
  transactions: [
    {
      employeeId: "3cfba964-545e-4e68-adaa-867ab2b0d155",
      procedure: {
        id: "a2e5fa7a-2784-4071-a65c-db8faac3f8df",
        items: [
          {
            id: "a5fc7a2e-a4a6-414a-87d6-b95fe2ea3dd3",
            name: "Luvas descartáveis",
            quantity: 1
          },
          {
            id: "7386b220-d207-41d1-90d4-c6f548579df8",
            name: "Gaze estéril",
            quantity: 1
          }
        ],
        name: "Curativo simples"
      },
      timestamp: new Date().toISOString()
    }
  ]
};

export default api;