import fetch from 'node-fetch';

const BASE_URL = process.env.BASE_URL;

// Função para fazer o login
export async function fazerLogin(email: string, password: string) {
  const url = `${BASE_URL}/login`;

  const response = await fetch(url, {
    method: 'POST', // 1. Método é POST
    headers: {
      'Content-Type': 'application/json' // 2. Indicamos que o corpo é JSON
    },
    body: JSON.stringify({ email, password }) // 3. Enviamos as credenciais no corpo
  });
  
  const respBody = await response.json();

  return { response, respBody };
}
