import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import illustrationCenter from '../../assets/illustration-center.svg';
import CustomStepper from '../../componentes/customStepper';
import InputPassword from '../../componentes/inputPassword';

function getStepContent(stepIndex) {
  const [password, setPassword] = useState('');
  const [conferePassword, setConferePassword] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm('');

  function onSubmit(data) {
    console.log(data);
  }
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <div className="flexColunm mb1rem posRelative">
            <label htmlFor="nomeUsuarioRest">Nome de usuário</label>
            <input id="nomeUsuarioRest" type="text" />
          </div>
          <InputPassword
            id="senha"
            label="Senha"
            register={() => register('senha', { required: true, minLength: 8 })}
            value={password}
            setValue={setPassword}
          />
          <InputPassword
            id="senhaConfere"
            label="Repita a senha"
            register={() => register('senhaConfere', { required: true })}
            value={conferePassword}
            setValue={setConferePassword}
          />
        </div>
      );
    case 1:
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flexColunm mb1rem posRelative">
              <label htmlFor="nomeRestaurante">Nome do restaurante</label>
              <input id="nomeRestaurante" type="text" />
            </div>
            <div className="flexColunm mb1rem posRelative">
              <label htmlFor="categoria">Categoria do restaurante</label>
              <input id="categoria" type="select" placeholder="Escolha uma categoria" />
            </div>
            <div className="flexColunm mb1rem posRelative">
              <label htmlFor="descricao">Descrição</label>
              <input id="descricao" type="text" />
              <span className="mr06rem">Máx.: 50 caracteres</span>
            </div>
          </form>
        </div>
      );
    case 2:
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
          </form>
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
