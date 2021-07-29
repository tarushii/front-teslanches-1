import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import illustrationCenter from '../../assets/illustration-center.svg';
import CustomStepper from '../../componentes/customStepper';

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <div className="flexColunm mb1rem">
            <label htmlFor="nomeUsuarioRest">Nome de usuário</label>
            <input id="nomeUsuarioRest" type="text" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" />
          </div>
          <div className="flexColunm mb1rem inputPassword">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" />
            <FontAwesomeIcon className="eyePassword" icon={faEye} />
          </div>
          <div className="flexColunm mb1rem inputPassword">
            <label htmlFor="senhaConfere">Repita a senha</label>
            <input id="senhaConfere" type="password" />
            <FontAwesomeIcon className="eyePassword" icon={faEye} />
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <div className="flexColunm mb1rem">
            <label htmlFor="nomeRestaurante">Nome do restaurante</label>
            <input id="nomeRestaurante" type="text" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="categoria">Categoria do restaurante</label>
            <input id="categoria" type="select" placeholder="Escolha uma categoria" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="descricao">Descrição</label>
            <input id="descricao" type="text" />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <div className="flexColunm mb1rem">
            <label htmlFor="taxaEntrega">Taxa de entrega</label>
            <input id="taxaEntrega" type="text" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="tempoEntrega">Tempo estimado de entrega</label>
            <input id="tempoEntrega" type="time" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="valorPedido">Valor mínimo do pedido</label>
            <input id="valorPedido" type="money" />
          </div>
        </div>
      );
    default:
      return 'stepper quebrou =/';
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
