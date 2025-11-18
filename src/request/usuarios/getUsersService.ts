import fetch from 'node-fetch';

interface BuscaUsuariosParams {
  nome?: string;
  email?: string;
  password?: string;
  administrador?: string;
  _id?: string;
}

export async function buscaUsuarios(params: BuscaUsuariosParams = {}) {
  const BASE_URL = 'https://serverest.dev';
  
  const query = new URLSearchParams(params as any).toString();

  const url = `${BASE_URL}/usuarios${query ? `?${query}` : ''}`;
  const response = await fetch(url);
  const respBody = await response.json();

  return { response, respBody };
}

