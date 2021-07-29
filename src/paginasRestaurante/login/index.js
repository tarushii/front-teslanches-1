import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import illustrationCenter from '../../assets/illustration-center.svg';

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
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
            <div className="flexColunm mb1rem inputPassword">
              <label htmlFor="senha">Senha</label>
              <input id="senha" type={mostrarSenha ? 'text' : 'password'} />
              <FontAwesomeIcon
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="eyePassword"
                icon={mostrarSenha ? faEye : faEyeSlash}
                size="lg"
              />
            </div>
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
