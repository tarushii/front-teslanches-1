import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import illustrationCenter from '../../assets/illustration-center.svg';
import CustomStepper from '../../componentes/customStepper';
import InputPassword from '../../componentes/inputPassword';
import InputSelect from '../../componentes/customCategoria';

function getStepContent(stepIndex) {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [conferePassword, setConferePassword] = useState('');
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  switch (stepIndex) {
    case 0:
      return (
        <div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="nomeUsuarioRest">Nome de usuário</label>
            <input id="nomeUsuarioRest" type="text" onChange={(e) => setNome(e.target.value)} />
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
            <input id="nomeRestaurante" type="text" onChange={(e) => setNomeRestaurante(e.target.value)} />
          </div>

          <InputSelect setCategoria={setCategoria} />

          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" onChange={(e) => setDescricao(e.target.value)} />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="taxaEntrega">Taxa de entrega</label>
            <input id="taxaEntrega" type="number" />
          </div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="tempoEntrega">Tempo estimado de entrega</label>
            <input id="tempoEntrega" type="time" />
          </div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="valorPedido">Valor mínimo do pedido</label>
            <input id="valorPedido" type="money" />
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
            />
          </div>
          <div className=" flexColunm mb1rem mt2rem">
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
