import { buscaUsuarios } from '../request/usuarios/getUsersService';
import { expect } from 'chai';

describe('API Serverest - Usuários', () => {
  before(async () => {
    console.log('Preparando ambiente...testando o before');
  });


  describe('Testa a api', () => {
    it('deve retornar todos os usuários', async () => {
      const { response, respBody } = await buscaUsuarios();
      expect(response.status).to.equal(200);
      expect(respBody.usuarios).to.be.an('array');

    });

    it('deve retornar usuário pelo nome', async () => {
      const { response, respBody } = await buscaUsuarios({ nome: 'Fulano da Silva' });
      expect(response.status).to.equal(200);
      expect(respBody.usuarios).to.be.an('array').and.not.empty;
      const usuarioEncontrado = respBody.usuarios.some((usuario: any) => usuario.nome === 'Fulano da Silva');
      expect(usuarioEncontrado, 'Nenhum usuário com o nome "Fulano da Silva" foi encontrado').to.be.true;

    });

    it('deve retornar usuário pelo email', async () => {
      const { response, respBody } = await buscaUsuarios({ email: 'fulano@qa.com' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;
      const usuarioEncontrado = respBody.usuarios.some((usuario: any) => usuario.email === 'fulano@qa.com');
      expect(usuarioEncontrado, 'Nenhum usuário com o email "fulano@qa.com" foi encontrado').to.be.true;

    })

    it('nao deve retornar usuário com email nao cadastrado', async () => {
      const { response, respBody } = await buscaUsuarios({ email: '46535243363636@qa.com' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).is.empty;

    })

    it('deve retornar usuário no fitro pelo _id', async () => {
      const { response, respBody } = await buscaUsuarios({ _id: '0uxuPY0cbmQhpEz1' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;
      const usuarioEncontrado = respBody.usuarios.some((usuario: any) => usuario._id === '0uxuPY0cbmQhpEz1');
      expect(usuarioEncontrado, 'Nenhum usuário com o id "0uxuPY0cbmQhpEz1 foi encontrado').to.be.true;

    })

    it('deve retornar usuário no fitro pelo administrador iqual a true ', async () => {
      const { response, respBody } = await buscaUsuarios({ administrador: 'true' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;
      const usuarioEncontrado = respBody.usuarios.some((usuario: any) => usuario.administrador === 'true');
      expect(usuarioEncontrado, 'Nenhum usuário administrador iqual a true foi encontrado').to.be.true;

    })

    it('deve retornar usuário no fitro pelo administrador iqual a false', async () => {
      const { response, respBody } = await buscaUsuarios({ administrador: 'false' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;
      const usuarioEncontrado = respBody.usuarios.some((usuario: any) => usuario.administrador === 'false');
      expect(usuarioEncontrado, 'Nenhum usuário administrador iqual a false foi encontrado').to.be.true;
      
    })

  });


  describe('smoke testing', () => {
    it('envia parametro email nulo', async () => {
      const { response, respBody } = await buscaUsuarios({ email: '' });
      expect(response.status).to.equal(400)
      expect(respBody.email).equals('email deve ser uma string')

    })

    it('envia parametro email invalido', async () => {
      const { response, respBody } = await buscaUsuarios({ email: 'teste.qa.com' });
      expect(response.status).to.equal(400)
      expect(respBody.email).equals('email deve ser um email válido')

    })

    it('envia parametro nome nulo', async () => {
      const { response, respBody } = await buscaUsuarios({ nome: '' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;

    })

    it('envia parametro _id nulo', async () => {
      const { response, respBody } = await buscaUsuarios({ _id: '' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;

    })

    it('envia parametro password nulo', async () => {
      const { response, respBody } = await buscaUsuarios({ password: '' });
      expect(response.status).to.equal(200)
      expect(respBody.usuarios).to.be.an('array')
      expect(respBody.usuarios).not.empty;

    })

  });
});
