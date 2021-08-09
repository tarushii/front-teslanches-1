/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import UsuarioEditar from '../usuarioEditar/index';
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
  const [usuario, setUsuario] = useState([]);
  const customId = 'custom-id-yes';
  const history = useHistory();

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const { dados, ok } = await get('/produtos', token);

        if (!ok) {
          toast.error(dados, { toastId: customId });
          return;
        }
        setProd(dados);
      } catch (error) {
        toast.error(error.message, { toastId: customId });
      }
    }

    buscarProdutos();
  }, []);

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
          <h1 className="nomeRestaurante">{usuario.nome}</h1>
          <button className="btLogout logout" type="button" onClick={deslogar}>Logout</button>
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
