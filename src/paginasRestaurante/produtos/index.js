import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import CustomCard from '../../componentes/customCard';
import imgPizza from '../../assets/pizza.png';

const testeProdutoLista = [
  {
    nome: 'teste',
    descricao: 'blablabla',
    valor: 1234,
    imagem: imgPizza
  },
  {
    nome: 'teste1',
    descricao: 'blablabla',
    valor: 1234,
    imagem: imgPizza
  },
  {
    nome: 'teste2',
    descricao: 'blablabla',
    valor: 1234,
    imagem: imgPizza
  },
  {
    nome: 'teste3',
    descricao: 'blablabla',
    valor: 1234,
    imagem: imgPizza
  },
];
export default function produtos() {
  const [cardapio, setCardapio] = useState([]);
  useEffect(() => {
    // async function carregarCardapio() {
    //   const resposta = await fetch(testeProdutoLista);
    //   const cardapioRetornado = await resposta.json();
    // }
    setCardapio(testeProdutoLista);
  }, []);

  return (
    <div className="bodyProdutos">
      <div className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <h1 className="nomeRestaurante">Pizza Pizzaria & Delivery</h1>
          <Link className="logout" to="/login">Logout</Link>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />
      <div className="avatarRestaurante">
        .
      </div>

      <div className={`${cardapio.length === 0 ? 'none' : 'contemProdutos'} flexColunm contentCenter itemsCenter mt2rem`}>
        <div className="contemBotao flexRow">
          <CustomizedDialogs
            btAbrirMensagem={<> Adicionar produto ao cardápio</>}
            btMensagem={<>Adicionar produto novo</>}
            conteudo={<ProdutosNovo />}
          />
        </div>

        <div className="conteinerCardapio flexRow gap2rem">
          { cardapio.map((produto) => (
            <div className="cardProduto" item key={produto.id}>
              <CustomCard {...produto} />
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
