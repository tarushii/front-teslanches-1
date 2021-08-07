/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import CustomCard from '../../componentes/customCard';
import useAuth from '../../hooks/useAuth';
import { get, del } from '../../services/apiClient';

import Diversos from '../../assets/bg-Diversos.png';
import Pizzaria from '../../assets/bg-Pizzaria.png';
import Massas from '../../assets/bg-Massas.png';
import Arabe from '../../assets/bg-Arabe.png';
import Carnes from '../../assets/bg-Carnes.png';
import Chinesa from '../../assets/bg-Chinesa.png';
import Italiana from '../../assets/bg-Italiana.png';
import Japonesa from '../../assets/bg-Japonesa.png';
import Mexicano from '../../assets/bg-Mexicano.png';
import Brasileira from '../../assets/bg-Brasileira.png';
import Lanches from '../../assets/bg-Lanches.png';

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

  async function removerProduto(id) {
    try {
      const dados = await del(`produtos/${id}`);

      setProd(dados);
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(prod);
  console.log(user.Categoria);

  const categoriaStyle = () => {
    const categoria = user.Categoria;
    switch (categoria) {
      default:
        return { backgroundImage: `url(${Pizzaria})` };
      case 'Diversos':
        return { backgroundImage: `url(${Diversos})` };
      case 'Lanches':
        return { backgroundImage: `url(${Lanches})` };
      case 'Carnes':
        return { backgroundImage: `url(${Carnes})` };
      case 'Massas':
        return { backgroundImage: `url(${Massas})` };
      case 'Pizzas':
        return { backgroundImage: `url(${Pizzaria})` };
      case 'Japonesa':
        return { backgroundImage: `url(${Japonesa})` };
      case 'Chinesa':
        return { backgroundImage: `url(${Chinesa})` };
      case 'Mexicano':
        return { backgroundImage: `url(${Mexicano})` };
      case 'Brasileira':
        return { backgroundImage: `url(${Brasileira})` };
      case 'Italiana':
        return { backgroundImage: `url(${Italiana})` };
      case 'Árabe':
        return { backgroundImage: `url(${Arabe})` };
    }
  };

  return (
    <div className="bodyProdutos">
      <div style={categoriaStyle()} className="conteinerTopo contentCenter itemsCenter">
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
              <CustomCard
                nome={produto.nome}
                valor={produto.preco}
                descricao={produto.descricao}
                removerProduto={removerProduto}
              />
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
