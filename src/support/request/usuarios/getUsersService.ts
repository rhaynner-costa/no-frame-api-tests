import fetch from 'node-fetch';

const BASE_URL = process.env.BASE_URL;

interface BuscaUsuariosParams {
  nome?: string;
  email?: string;
  password?: string;
  administrador?: string;
  _id?: string;
}

export async function buscaUsuarios(params: BuscaUsuariosParams = {}) {
  const query = new URLSearchParams(params as any).toString();

  // A URL agora é montada com a variável de ambiente
  const url = `${BASE_URL}/usuarios${query ? `?${query}` : ''}`;
  
  const response = await fetch(url);
  const respBody = await response.json();

  return { response, respBody };
}
