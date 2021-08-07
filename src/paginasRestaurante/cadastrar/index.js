import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import '../../styles/global.css';
import { postNaoAutenticado } from '../../services/apiClient';

const dadosDoUsuario = {
  nome: null,
  email: null,
  senha: null,
  restaurante: {
    nome: null,
    descricao: null,
    idCategoria: null,
    taxaEntrega: null,
    tempoEntregaEmMinutos: null,
    valorMinimoPedido: null,
  }
};

export default function Cadastrar() {
  const [etapa, setEtapa] = useState(1);

  const validar = function validaDadosDoStepper() {
    const stepper1 = document.querySelector('.item-1');
    const stepper2 = document.querySelector('.item-2');
    const stepper3 = document.querySelector('.item-3');
    const validacao = {
      mensagem: 'Nenhum erro encontrado.',
      valido: true
    };

    // Valida Etapa 1
    if (etapa === 1) {
      const dadosE = {
        Nome: document.querySelector('.nome-usuario').value,
        Email: document.querySelector('.email-usuario').value,
        Senha: document.querySelector('.senha-usuario').value,
        Confirma: document.querySelector('.confirma-senha-usuario').value
      };

      if (!dadosE.Nome || dadosE.Nome.trim() === '') {
        validacao.mensagem = 'NOME é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dadosE.Email || dadosE.Email.trim() === '' || !dadosE.Email.includes('@') || !dadosE.Email.includes('.com')) {
        validacao.mensagem = 'E-MAIL é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dadosE.Senha || dadosE.Senha.trim() === '') {
        validacao.mensagem = 'SENHA é um campo obrigatório.';
        validacao.valido = false;
      } else if (dadosE.Senha.length < 8) {
        validacao.mensagem = 'A senha deve conter, ao menos, 8 caracteres.';
        validacao.valido = false;
      } else if (dadosE.Senha !== dadosE.Confirma) {
        validacao.mensagem = 'As senhas devem ser iguais.';
        validacao.valido = false;
      }

      if (validacao.valido) {
        dadosDoUsuario.nome = dadosE.Nome;
        dadosDoUsuario.email = dadosE.Email;
        dadosDoUsuario.senha = dadosE.Senha;
        stepper1.classList.remove('stepper--atual');
        stepper1.classList.add('stepper--finalizado');
        stepper2.classList.remove('stepper--incompleto');
        stepper2.classList.add('stepper--atual');
      }

      return (validacao);
    }
    // Valida Etapa 2
    if (etapa === 2) {
      const dadosE = {
        NomeRestaurante: document.querySelector('.nome-restaurante').value,
        Categoria: document.querySelector('.categoria-restaurante').value,
        Descricao: document.querySelector('.descricao-restaurante').value
      };

      if (!dadosE.NomeRestaurante || dadosE.NomeRestaurante.trim() === '') {
        validacao.mensagem = 'NOME DO RESTAURANTE é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dadosE.Categoria || dadosE.Categoria.trim() === '') {
        validacao.mensagem = 'CATEGORIA é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dadosE.Descricao || dadosE.Descricao.trim() === '') {
        validacao.mensagem = 'DESCRIÇÃO é um campo obrigatório.';
        validacao.valido = false;
      } else if (dadosE.Descricao.length > 50) {
        validacao.mensagem = 'DESCRIÇÃO deve conter, no máximo, 50 caracteres.';
        validacao.valido = false;
      }

      if (validacao.valido) {
        dadosDoUsuario.restaurante.nome = dadosE.NomeRestaurante;
        dadosDoUsuario.restaurante.idCategoria = dadosE.Categoria;
        dadosDoUsuario.restaurante.descricao = dadosE.Descricao;

        stepper2.classList.remove('stepper--atual');
        stepper2.classList.add('stepper--finalizado');
        stepper3.classList.remove('stepper--incompleto');
        stepper3.classList.add('stepper--atual');
      }

      return (validacao);
    }

    // Valida Etapa 3
    if (etapa === 3) {
      const dadosE = {
        Taxa: document.querySelector('.taxa-restaurante').value,
        Tempo: document.querySelector('.tempo-restaurante').value,
        ValorMinimo: document.querySelector('.pedido-minimo-restaurante').value
      };

      if (!dadosE.Taxa || dadosE.Taxa.trim() === '') {
        validacao.mensagem = 'TAXA DE ENTREGA é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dadosE.Tempo || dadosE.Tempo.trim() === '') {
        validacao.mensagem = 'TEMPO ESTIMADO DE ENTREGA é um campo obrigatório.';
        validacao.valido = false;
      } else if (!dadosE.ValorMinimo || dadosE.ValorMinimo.trim() === '') {
        validacao.mensagem = 'VALOR MÍNIMO DO PEDIDO é um campo obrigatório.';
        validacao.valido = false;
      }

      if (validacao.valido) {
        const botaoProximo = document.querySelector('.proximo-form');
        const botaoAnterior = document.querySelector('.anterior-form');

        dadosDoUsuario.restaurante.taxaEntrega = dadosE.Taxa * 100;
        dadosDoUsuario.restaurante.tempoEntregaEmMinutos = Number(dadosE.Tempo);
        dadosDoUsuario.restaurante.valorMinimoPedido = Number(dadosE.ValorMinimo * 100);

        stepper3.classList.remove('stepper--atual');
        stepper3.classList.add('stepper--finalizado');
        botaoProximo.style.display = 'none';
        botaoAnterior.style.display = 'none';
      }

      return (validacao);
    }

    // Confirma registro e retorna para login
    if (etapa === 4) {
      return (validacao);
    }

    return (validacao);
  };

  const enviarParaApi = async function fazCadastroDoUsuario() {
    const { dados, ok } = await postNaoAutenticado('/usuarios', dadosDoUsuario);

    if (!ok) {
      console.log(dados);
    }
  };

  const recuar = function recuaStepper() {
    const stepper1 = document.querySelector('.item-1');
    const stepper2 = document.querySelector('.item-2');
    const stepper3 = document.querySelector('.item-3');

    switch (etapa) {
      default: return;
      case 1:
        return;
      case 2:
        stepper1.classList.remove('stepper--finalizado');
        stepper1.classList.add('stepper--atual');
        stepper2.classList.remove('stepper--atual');
        stepper2.classList.add('stepper--incompleto');
        break;
      case 3:
        stepper2.classList.remove('stepper--finalizado');
        stepper2.classList.add('stepper--atual');
        stepper3.classList.remove('stepper--atual');
        stepper3.classList.add('stepper--incompleto');
        break;
      case 4:
        stepper3.classList.remove('stepper--finalizado');
        stepper3.classList.add('stepper--atual');
        break;
    }
    setEtapa(etapa - 1);
  };

  const avancar = function avancaStepper() {
    const dadosValidos = validar(etapa);
    const mensagemErro = document.querySelector('.erros');

    if (dadosValidos.valido) {
      mensagemErro.innerHTML = '';

      if (etapa === 3) {
        enviarParaApi();
      }

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
            <p>Nome do Restaurante</p>
            <input type="text" className="nome-restaurante" />
            <br />
            <p>Categoria</p>
            <select className="categoria-restaurante" name="categoria" id="categorias" placeholder="Escolha uma categoria">
              <option value="1">Diversos</option>
              <option value="2">Lanches</option>
              <option value="3">Carnes</option>
              <option value="4">Massas</option>
              <option value="5">Pizzas</option>
              <option value="6">Japonesa</option>
              <option value="7">Chinesa</option>
              <option value="8">Mexicano</option>
              <option value="9">Brasileira</option>
              <option value="10">Italiana</option>
              <option value="11">Árabe</option>
            </select>
            <br />
            <br />
            <p>Descrição</p>
            <textarea className="descricao-restaurante" cols="33" rows="3" />
          </>
        );
      case 3:
        return (
          <>
            <p>Taxa de entrega</p>
            <input type="number" min="0" className="taxa-restaurante" placeholder="R$" />
            <br />
            <p>Tempo estimado de entrega</p>
            <input type="number" min="0" className="tempo-restaurante" placeholder="Minutos" />
            <br />
            <p>Valor mínimo do pedido</p>
            <input type="number" min="0" className="pedido-minimo-restaurante" placeholder="R$" />
            <br />
          </>
        );
      case 4:
        return (
          <>
            <h2>Usuário registrado com sucesso!</h2>
            <button className="botao-finalizar" type="button" onClick={() => window.location.replace('http://localhost:3000/')}>Legal!</button>
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
            <div className="item-1 stepper--atual">
              <p className="stepper__item">1</p>
            </div>
            <div className="item-2 stepper--incompleto">
              <p className="stepper__item">2</p>
            </div>
            <div className="item-3 stepper--incompleto">
              <p className="stepper__item">3</p>
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
        <p className="retornar-login">
          Já tem uma conta?
          <Link to="/">  Fazer login</Link>
        </p>
      </section>
    </article>
  );
}
