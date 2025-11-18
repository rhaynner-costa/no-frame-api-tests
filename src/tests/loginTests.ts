import { expect } from 'chai';
import { fazerLogin } from '../support/request/login/loginService'; // Importamos a função de login

describe('API Serverest - Testes de Login', () => {

  it('deve realizar o login com sucesso e retornar um token', async () => {
    const userEmail = process.env.ADMIN_EMAIL!;
    const userPassword = process.env.ADMIN_PASSWORD!;
    const { response, respBody } = await fazerLogin(userEmail, userPassword);
    expect(response.status, 'A API deveria responder com status 200 OK').to.equal(200);
    expect(respBody.message, 'A mensagem de resposta deveria ser "Login realizado com sucesso"').to.equal('Login realizado com sucesso');

    // Validamos a presença e o formato do token de autorização
    expect(respBody.authorization, 'A resposta deveria conter um token de autorização').to.be.a('string').and.not.be.empty;
  });

  it('deve falhar ao tentar fazer login com senha incorreta', async () => {
    const userEmail = process.env.ADMIN_EMAIL!;
    const { response, respBody } = await fazerLogin(userEmail, 'senha-errada');
    expect(response.status, 'Deveria retornar status 401 Unauthorized').to.equal(401);
    expect(respBody.message, 'A mensagem de erro deveria ser "Email e/ou senha inválidos"').to.equal('Email e/ou senha inválidos');
  });

});
