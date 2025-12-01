import axios from 'axios';

// ==================== INSTÂNCIA PRINCIPAL COM JWT ====================
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
});

export const fastApi = axios.create({
  baseURL: 'http://localhost:8000',
});

interface TryOnResponse {
  message: string;
  url: string | null;
}

interface FixClothesResponse {
  message: string;
  url: string | null;
}

export interface TryOnHistoryItem {
  id: number;
  imageUrl: string;
  createdAt: string;
}

// Interceptor de Request - Adiciona o token JWT
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers ?? {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Erro ao ler token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Response - Trata erro 401 (não autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('token');
        } catch {}
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== FUNÇÃO processTryOn ====================

export async function processTryOn(
  dressFile: File,
  modelFile: File
): Promise<TryOnResponse> {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(dressFile.type)) {
    throw new Error('Formato da roupa inválido. Use JPG, PNG ou WEBP');
  }
  if (!allowedTypes.includes(modelFile.type)) {
    throw new Error('Formato da modelo inválido. Use JPG, PNG ou WEBP');
  }
  if (dressFile.size > maxSize) {
    throw new Error('Imagem da roupa muito grande (máx: 10MB)');
  }
  if (modelFile.size > maxSize) {
    throw new Error('Imagem da modelo muito grande (máx: 10MB)');
  }

  const formData = new FormData();
  formData.append('dress', dressFile);
  formData.append('model', modelFile);

  try {
    // ✅ Agora chamamos o Spring Boot (correto)
    const response = await api.post<TryOnResponse>('/tryon', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const data = response.data;

    // ✅ A URL já deve vir pronta do backend — apenas retornamos
    return {
      message: data.message,
      url: data.url,
    };

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      if (message) throw new Error(message);
      throw new Error('Erro ao processar try-on');
    }

    console.error('Erro inesperado:', error);
    throw new Error('Erro na comunicação com o servidor.');
  }
}

export async function getTryOnHistory(): Promise<TryOnHistoryItem[]> {
  try {
    const response = await api.get<TryOnHistoryItem[]>('/tryon/history');

    return response.data.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
    }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      if (message) throw new Error(message);
      throw new Error('Erro ao buscar histórico');
    }
    throw new Error('Erro ao buscar histórico. Verifique sua conexão.');
  }
}


// ==================== SERVIÇOS DE AUTENTICAÇÃO ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  telefone: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  token?: string;
}

// Interface para o payload do JWT decodificado (baseado no seu JWT real)
export interface JwtPayload {
  iss: string;              // Issuer: "integrationApi"
  sub: string;              // Subject: email do usuário
  id: number;               // ID do usuário
  email: string;            // Email do usuário
  username: string;         // Nome de usuário
  telefone: string;         // Telefone do usuário
  role: string;             // Role: "ROLE_ADMIN", "ROLE_USER", etc
  iat: number;              // Issued at timestamp
  exp: number;              // Expiration timestamp
}

// Serviço de Login
export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/user/login', data);
  return response.data;
};

// Serviço de Registro
export const registerService = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/user/register', data);
  return response.data;
};

// Função para fazer logout
export const logout = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
};

// Função para verificar se está autenticado
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('token');
      return !!token;
    } catch {
      return false;
    }
  }
  return false;
};

// ==================== FUNÇÕES DE USUÁRIO ====================

// Função para decodificar o JWT e extrair informações do usuário
export const getUserFromToken = (): JwtPayload | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as JwtPayload;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

// Função helper para pegar o ID do usuário
export const getUserId = (): number | null => {
  const user = getUserFromToken();
  return user?.id ?? null;
};

// Função helper para pegar o username
export const getUsername = (): string | null => {
  const user = getUserFromToken();
  return user?.username ?? null;
};

// Função helper para pegar o email do usuário
export const getUserEmail = (): string | null => {
  const user = getUserFromToken();
  return user?.email ?? null;
};

// Função helper para pegar o telefone do usuário
export const getUserPhone = (): string | null => {
  const user = getUserFromToken();
  return user?.telefone ?? null;
};

// Função helper para pegar o role do usuário
export const getUserRole = (): string | null => {
  const user = getUserFromToken();
  return user?.role ?? null;
};

// Função helper para verificar se é admin
export const isAdmin = (): boolean => {
  const role = getUserRole();
  return role === 'ROLE_ADMIN';
};

// Função helper para verificar se o token está expirado
export const isTokenExpired = (): boolean => {
  const user = getUserFromToken();
  if (!user?.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > user.exp;
};

// ==================== SERVIÇOS DE CRÉDITOS ====================

export interface UserCreditsResponse {
  user_id: number;
  credits: number;
}

// Buscar créditos do usuário autenticado
export const getUserCredits = async (): Promise<UserCreditsResponse> => {
  const response = await api.get<UserCreditsResponse>('/user/credits');
  return response.data;
};

export function resolveImageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `http://localhost:8000${path}`;
}

export async function processFixClothes(file: File): Promise<FixClothesResponse> {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Formato inválido. Use JPG, PNG ou WEBP');
  }
  if (file.size > maxSize) {
    throw new Error('Imagem muito grande (máx: 10MB)');
  }

  // ✅ Nome correto do campo que o backend espera
  const formData = new FormData();
  formData.append('file', file); // <-- antes estava "file", agora certo

  try {
    const response = await api.post<FixClothesResponse>(
      '/fix-clothes',
      formData,
      {
        // ❗ Não definir Content-Type manualmente (o browser já faz isso)
        headers: { },
      }
    );

    return response.data;

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      if (message) throw new Error(message);
      throw new Error('Erro ao processar imagem');
    }

    throw new Error('Erro na comunicação com o servidor.');
  }
}

export default api;