import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="formLogin">
      <div className="flexRow mt2rem ml2rem selfStart">
        <h1>Login</h1>
      </div>
      <div className=" flexColunm mb1rem mt2rem">
        <div className="flexColunm mb1rem">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </div>
        <div className="flexColunm mb1rem">
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" />
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
  );
}
