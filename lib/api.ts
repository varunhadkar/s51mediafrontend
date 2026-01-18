const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  login: `${API_BASE_URL}/auth/login`,
  me: `${API_BASE_URL}/auth/me`,

  // Projects endpoints
  projects: `${API_BASE_URL}/projects`,
  projectById: (id: string) => `${API_BASE_URL}/projects/${id}`,
  projectsByCategoryId: (categoryId: string) =>
    `${API_BASE_URL}/projects/category/${categoryId}`,

  // Categories endpoints
  categories: `${API_BASE_URL}/categories`,
  categoryById: (id: string) => `${API_BASE_URL}/categories/${id}`,

  // Contact endpoint (uses same root, only /contact path)
  contact: `${API_BASE_URL}/contact`,

   reels: `${API_BASE_URL}/reels`,
   reelById: (id: string) => `${API_BASE_URL}/reels/${id}`,
};

// Helper function to get token from localStorage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

// Helper function to get auth headers
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Helper function for authenticated fetch requests
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  console.log('📡 Making authenticated request to:', url);
  console.log('🔑 With token:', token.substring(0, 20) + '...');

  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log('📥 Response status:', response.status);

  // If token is invalid (401), clear auth and redirect
  if (response.status === 401) {
    console.log('❌ Token invalid, clearing auth...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
    throw new Error('Session expired. Please login again.');
  }

  return response;
};

// Helper for public fetch (no auth required)
export const publicFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  console.log('📡 Making public request to:', url);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  console.log('📥 Response status:', response.status);
  return response;
};
