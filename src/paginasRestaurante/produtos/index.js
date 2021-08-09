/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import UsuarioEditar from '../usuarioEditar/index';
import CustomCard from '../../componentes/customCard';
import useAuth from '../../hooks/useAuth';
import { get, del } from '../../services/apiClient';

export default function produtos() {
  const [cardapio, setCardapio] = useState([]);
  const { user, token, deslogar } = useAuth();
  const [prod, setProd] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const history = useHistory();
  useEffect(() => {
    buscarProdutos();
    buscarUsuario();
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

  const buscarUsuario = async () => {
    try {
      const { dados, ok } = await get('/usuario', token);

      if (!ok) {
        return console.log(`erro${dados}`);
      }
      console.log(dados);
      return setUsuario(dados);
    } catch (error) {
      console.log(error.message);
    }
    return console.log('Usuario');
  };

  async function removerProduto(id) {
    try {
      const dados = await del(`produtos/${id}`);

      setProd(dados);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="bodyProdutos">
      <div className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <h1 className="nomeRestaurante">{usuario.nome}</h1>
          <Link className="logout" to="/login">Logout</Link>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />

      <img src={usuario.imagem_restaurante} alt="avatarRestaurante" className="avatarRestaurante" />
      <div className="avatarRestaurante">
        <CustomizedDialogs
          conteudo={<UsuarioEditar />}
        />
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
