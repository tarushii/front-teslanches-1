import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import illustrationCenter from '../../assets/illustration-center.svg';
import CustomStepper from '../../componentes/customStepper';
import InputPassword from '../../componentes/inputPassword';
import InputSelect from '../../componentes/customCategoria';

const data = {
  nome: null,
  email: null,
  senha: null,
  restaurante: {
    nome: null,
    descricao: null,
    idCategoria: null,
    taxaEntrega: null,
    tempoEntregaEmMinutos: null,
    valorMinimoPedido: null
  }
};

function getStepContent(stepIndex) {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [conferePassword, setConferePassword] = useState('');
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [taxa, setTaxa] = useState('');
  const [tempo, setTempo] = useState('');
  const [valorMinimo, setValorMinimo] = useState('');

  data.nome = nome;
  data.senha = password;
  data.email = email;
  data.restaurante.nome = nomeRestaurante;
  data.restaurante.descricao = descricao;
  data.restaurante.idCategoria = categoria;
  data.restaurante.taxaEntrega = taxa;
  data.restaurante.tempoEntregaEmMinutos = tempo;
  data.restaurante.valorMinimoPedido = valorMinimo;

  // Sinto que se algum outro engenheiro ver essa "solução"
  // eu nunca mais terei permissão para codificar na vida.
  // TODO - Isso aqui tudo de novo.

  switch (stepIndex) {
    case 0:
      return (
        <div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="nomeUsuarioRest">Nome de usuário</label>
            <input id="nomeUsuarioRest" type="text" onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="emailRest">E-mail</label>
            <input id="emailRest" type="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <InputPassword
            id="senha"
            label="Senha"
            value={password}
            setValue={setPassword}
          />
          <InputPassword
            id="senhaConfere"
            label="Repita a senha"
            value={conferePassword}
            setValue={setConferePassword}
          />
        </div>
      );
    case 1:
      return (
        <div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="nomeRestaurante">Nome do restaurante</label>
            <input id="nomeRestaurante" type="text" onChange={(e) => setNomeRestaurante(e.target.value)} required />
          </div>

          <InputSelect setCategoria={setCategoria} />

          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" onChange={(e) => setDescricao(e.target.value)} required />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="taxaEntrega">Taxa de entrega</label>
            <input id="taxaEntrega" type="number" onChange={(e) => setTaxa(e.target.value)} required />
          </div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="tempoEntrega">Tempo estimado de entrega</label>
            <input id="tempoEntrega" type="time" onChange={(e) => setTempo(e.target.value)} required />
          </div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="valorPedido">Valor mínimo do pedido</label>
            <input id="valorPedido" type="money" onChange={(e) => setValorMinimo(e.target.value)} required />
          </div>
        </div>
      );
    default:
      return 'Concluído!';
  }
}

export default function Cadastrar() {
  return (
    <div className="bodyCadastrar">

      <div className="conteinerFormCadastro">
        <form className="formCadastro ">
          <div className="espacoTopo" />
          <div className="flexRow">
            <div />
            <div className="ml2rem" />
            <CustomStepper
              title={(<h1>Cadastro</h1>)}
              getStepContent={getStepContent}
              data={data}
            />
          </div>
          <div className=" flexColunm mb1rem">
            <div>
              <span className="mr06rem">Já tem uma conta?</span>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
        <img className="vetorCadastro" src={illustrationCenter} alt="vetor" />
      </div>
    </div>
  );
}
