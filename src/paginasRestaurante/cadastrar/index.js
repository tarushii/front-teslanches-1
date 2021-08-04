import { React, useState } from 'react';
import './styles.css';
import '../../styles/global.css';

const stepper1 = document.querySelector('.item-1');
const stepper2 = document.querySelector('.item-2');
const stepper3 = document.querySelector('.item-3');

export default function Cadastrar() {
  const [etapa, setEtapa] = useState(1);
  const [dados, setDados] = useState({

  });

  const validar = function validaDadosDoStepper(etapa) {
    const validacao = {
      mensagem: 'Nenhum erro encontrado.',
      valido: true
    };

    if (etapa === 1) {
      const dados = {
        Nome: document.querySelector('.nome-usuario').value,
        Email: document.querySelector('.email-usuario').value,
        Senha: document.querySelector('.senha-usuario').value,
        Confirma: document.querySelector('.confirma-senha-usuario').value
      };

      if (!dados.Nome || dados.Nome.trim() === '') {
        validacao.mensagem = 'NOME é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dados.Email || dados.Email.trim() === '' || !dados.Email.includes('@') || !dados.Email.includes('.com')) {
        validacao.mensagem = 'E-MAIL é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dados.Senha || dados.Senha.trim() === '') {
        validacao.mensagem = 'SENHA é um campo obrigatório.';
        validacao.valido = false;
      } else if (dados.Senha.length < 8) {
        validacao.mensagem = 'A senha deve conter, ao menos, 8 caracteres.';
        validacao.valido = false;
      } else if (dados.Senha !== dados.Confirma) {
        validacao.mensagem = 'As senhas devem ser iguais.';
        validacao.valido = false;
      }

      setDados({
        nome: dados.Nome,
        email: dados.Email,
        senha: dados.Senha
      });

      console.log(dados);
      return (validacao);
    }
    if (etapa === 2) {
      return (validacao);
    }
    if (etapa === 3) {
      return (validacao);
    }
    if (etapa === 4) {
      return (validacao);
    }

    return (validacao);
  };

  const recuar = function recuaStepper() {
    if (etapa === 1) {
      return;
    }
    setEtapa(etapa - 1);
  };

  const avancar = function avancaStepper() {
    const dadosValidos = validar(etapa);
    const mensagemErro = document.querySelector('.erros');

    if (dadosValidos.valido) {
      mensagemErro.innerHTML = '';

      setEtapa(etapa + 1);
    } else {
      mensagemErro.innerHTML = dadosValidos.mensagem;
    }
  };

  const mostrarSenhas = function revelaSenhasParaUsuario() {
    const senha = document.querySelector('.senha-usuario');
    const confirmaSenha = document.querySelector('.confirma-senha-usuario');

    if (senha.type === 'password') {
      senha.type = 'text';
      confirmaSenha.type = 'text';
    } else {
      senha.type = 'password';
      confirmaSenha.type = 'password';
    }
  };

  const formulario = function retornaDadosDosFormularios() {
    switch (etapa) {
      default:
        return (
          <>
            <h1>Quebrou</h1>
          </>
        );
      case 1:
        return (
          <>
            <p>Nome de Usuário</p>
            <input type="text" className="nome-usuario" />
            <br />
            <p>E-mail</p>
            <input type="email" className="email-usuario" />
            <br />
            <div>
              <p>Senha</p>
              <button type="button" onClick={() => mostrarSenhas()}>Mostrar senhas</button>
            </div>
            <input type="password" className="senha-usuario" />
            <br />
            <p>Repetir Senha</p>
            <input type="password" className="confirma-senha-usuario" />
          </>
        );
      case 2:
        return (
          <>
            <h1>Etapa 2</h1>
          </>
        );
      case 3:
        return (
          <>
            <h1>Etapa 3</h1>
          </>
        );
      case 4:
        return (
          <>
            <h1>Finalizado</h1>
          </>
        );
    }
  };

  return (
    <article className="telaRegistro">
      <section className="telaRegistro__formulario">
        <header>
          <h1>Cadastro</h1>
          <section className="formulario__stepper">
            <div className="stepper--atual">
              <p className="stepper__item item-1">1</p>
            </div>
            <div className="stepper--incompleto">
              <p className="stepper__item item-2">2</p>
            </div>
            <div className="stepper--incompleto">
              <p className="stepper__item item-3">3</p>
            </div>
          </section>
        </header>
        <main>
          {formulario()}
        </main>
        <p className="erros"> </p>
        <footer>
          <button className="anterior-form" type="button" onClick={() => recuar()}>Anterior</button>
          <button className="proximo-form" type="button" onClick={() => avancar()}>Próximo</button>
        </footer>
      </section>
    </article>
  );
}
