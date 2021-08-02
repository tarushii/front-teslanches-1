/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import CustomCard from '../../componentes/customCard';
import imgPizza from '../../assets/pizza.png';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/apiClient';

export default function produtos() {
  const [cardapio, setCardapio] = useState([]);
  const { user, token, deslogar } = useAuth();
  const [prod, setProd] = useState([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const { dados, ok } = await get('/produtos', token);

      if (!ok) {
        console.log(dados);
        return;
      }
      setProd(dados);
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(prod);
  return (
    <div className="bodyProdutos">
      <div className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <h1 className="nomeRestaurante">{user.NomeRestaurante}</h1>
          <Link className="logout" to="/login">Logout</Link>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />
      <div className="avatarRestaurante">
        .
      </div>

      <div className={`${prod.length === 0 ? 'none' : 'contemProdutos'} flexColunm contentCenter itemsCenter mt2rem`}>
        <div className="contemBotao flexRow itemsCenter">
          <CustomizedDialogs
            btAbrirMensagem={<> Adicionar produto ao cardápio</>}
            btMensagem={<>Adicionar produto novo</>}
            conteudo={<ProdutosNovo />}
          />
        </div>

        <div className="conteinerCardapio flexRow gap2rem">
          { prod.map((produto) => (
            <div style={{ cursor: 'pointer' }} item key={produto.id}>
              <CustomCard nome={produto.nome} valor={produto.preco} descricao={produto.descricao} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${cardapio.length === 0 ? 'addProdutos' : 'none'} flexColunm contentCenter itemsCenter`}>
        <span>
          Você ainda não tem nenhum produto no seu cardápio.
          <br />
          Gostaria de adicionar um novo produto?
        </span>
        <CustomizedDialogs
          btAbrirMensagem={<> Adicionar produto ao cardápio</>}
          btMensagem={<>Adicionar produto novo</>}
          conteudo={<ProdutosNovo />}
        />
      </div>

    </div>
  );
}
