const BASE = '/api';

export const apiFetch = (path: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('hb_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch(`${BASE}${path}`, { ...options, headers });
};
