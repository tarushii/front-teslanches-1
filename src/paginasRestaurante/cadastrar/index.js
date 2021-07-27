import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';

export default function Cadastrar() {
  return (
    <div className="conteinerForm">
      <form className="formCadastro ">
        <div className="flexRow">
          <div>
            <h1>
              Cadastro
            </h1>
          </div>

          <div className="ml2rem">
            <h1>O--O--O</h1>
          </div>
        </div>
        <div>
          <div className="flexColunm mb1rem">
            <label htmlFor="nomeUsuarioRest">Nome de usuário</label>
            <input id="nomeUsuarioRest" type="text" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" />
          </div>
          <div className="flexColunm mb1rem">
            <label htmlFor="senhaConfere">Repita a senha</label>
            <input id="senhaConfere" type="password" />
          </div>
        </div>
        <div className=" flexColunm mb1rem mt2rem">
          <div>
            <Link to="/cadastrar" disable>Anterior</Link>
            <button className="btLaranja ml1rem mb2rem" type="submit">Proximo</button>
          </div>
          <div>
            <span className="mr06rem">Já tem uma conta?</span>
            <Link to="/entrar">Login</Link>
          </div>
        </div>
        <div className="rodape" />
      </form>
    </div>
  );
}
