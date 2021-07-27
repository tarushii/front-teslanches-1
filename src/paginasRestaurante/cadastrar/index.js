import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';

export default function Cadastrar() {
  return (
    <div className="conteinerForm">
      <form className="formCadastro">
        <div className="textCenter">
          <h1>
            Cadastro
          </h1>
        </div>
        <div>
          <div className="flexColunm">
            <label htmlFor="nomeUsuarioRest">Nome de usuário</label>
            <input id="nomeUsuarioRest" type="text" />
          </div>
          <div className="flexColunm">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" />
          </div>
          <div className="flexColunm">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" />
          </div>
          <div className="flexColunm">
            <label htmlFor="senhaConfere">Repita a senha</label>
            <input id="senhaConfere" type="password" />
          </div>
        </div>
        <Link to="/entrar">Login</Link>
      </form>
    </div>
  );
}
