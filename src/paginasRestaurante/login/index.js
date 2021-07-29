import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import illustrationCenter from '../../assets/illustration-center.svg';
import InputPassword from '../../componentes/inputPassword';

export default function Login() {
  const [password, setPassword] = useState('');
  return (
    <div className="bodyLogin">
      <div className="conteinerFormLogin">
        <div className="formLogin">
          <div className="flexRow mt2rem ml2rem selfStart">
            <h1>Login</h1>
          </div>
          <div className=" flexColunm mb1rem mt2rem">
            <div className="flexColunm mb1rem">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" />
            </div>

            <InputPassword label="Senha" value={password} setValue={setPassword} />

            <div className="flexRow contentCenter mt1rem mb1rem">
              <button className="btLaranja" type="button"> Entrar </button>
            </div>
            <div className="flexRow contentCenter mt2rem">
              <span className="mr06rem">Ainda não tem uma conta?</span>
              <Link to="/cadastrar">Cadastre-se</Link>
            </div>
          </div>
        </div>
        <img className="vetorLogin" src={illustrationCenter} alt="vetor" />
      </div>
    </div>
  );
}
