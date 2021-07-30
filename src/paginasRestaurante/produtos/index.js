import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../routes';
import illustrationTop from '../../assets/illustration-top.svg';

export default function produtos() {
  const { deslogar } = useContext(AuthContext);

  return (
    <div className="bodyProdutos">
      <div className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <h1 className="nomeRestaurante">Pizza Pizzaria & Delivery</h1>
          <Link className="logout" to="/login" onClick={deslogar}>Logout</Link>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />
      <div className="avatarRestaurante">
        .
      </div>

      <div className="conteudoProdutos flexColunm contentCenter itemsCenter">
        <span>
          Você ainda não tem nenhum produto no seu cardápio.
          <br />
          Gostaria de adicionar um novo produto?
        </span>
        <button className="btLaranja mt2rem" type="submit">Adicionar produtos</button>
      </div>
    </div>
  );
}
