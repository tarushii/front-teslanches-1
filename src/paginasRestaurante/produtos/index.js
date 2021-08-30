/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import illustrationTop from '../../assets/illustration-top.svg';
import ProdutosNovo from '../produtosNovo';
import UsuarioEditar from '../usuarioEditar/index';
import CustomCard from '../../componentes/customCard';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/apiClient';

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
import CustomModal from '../../componentes/customModal';
import ProdutosEditar from '../produtosEditar';
import avatarPadrao from '../../assets/avatar-padrao.png';
import PedidoDetalhes from '../pedidoDetalhes';

export default function produtos() {
  const { user, token, deslogar } = useAuth();
  const [prod, setProd] = useState([]);
  const [f5, setF5] = useState(false);
  const [paginaPedidos, setPaginaPedidos] = useState(true);
  const [paginaEnviados, setPaginaEnviados] = useState(false);
  const [listaDePedidos, setListaDePedidos] = useState([]);

  const [usuario, setUsuario] = useState([]);
  const customId = 'custom-id-yes';

  useEffect(() => {
    setF5(false);
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

    const buscarUsuario = async () => {
      try {
        const { dados, ok } = await get('/usuario', token);

        if (!ok) {
          return toast.error(`erro${dados}`);
        }
        toast.success(dados);

        return setUsuario(dados);
      } catch (error) {
        return toast.error(error.message);
      }
    };

    async function buscarPedidos() {
      try {
        const { dados, ok } = await get('/pedidos', token);

        if (!ok) {
          toast.error(dados, { toastId: customId });
          return;
        }

        setListaDePedidos(dados);
      } catch (error) {
        toast.error(error.message, { toastId: customId });
      }
    }

    buscarPedidos();
    buscarUsuario();
    buscarProdutos();
  }, [token, f5]);

  const categoriaStyle = () => {
    const categoria = usuario.categoria_id;
    switch (categoria) {
      default:
        return { backgroundImage: `url(${Pizzaria})` };
      case 1:
        return { backgroundImage: `url(${Diversos})` };
      case 2:
        return { backgroundImage: `url(${Lanches})` };
      case 3:
        return { backgroundImage: `url(${Carnes})` };
      case 4:
        return { backgroundImage: `url(${Massas})` };
      case 5:
        return { backgroundImage: `url(${Pizzaria})` };
      case 6:
        return { backgroundImage: `url(${Japonesa})` };
      case 7:
        return { backgroundImage: `url(${Chinesa})` };
      case 8:
        return { backgroundImage: `url(${Mexicano})` };
      case 9:
        return { backgroundImage: `url(${Brasileira})` };
      case 10:
        return { backgroundImage: `url(${Italiana})` };
      case 11:
        return { backgroundImage: `url(${Arabe})` };
    }
  };

  // TODOs:
  // GET em pedidos (tudo) se possivel com nome do consumidor ou + um
  // GET em consumidor (nome),
  // POST em enviados (enviar true)

  // const listaDePedidos = [{
  //   id: 9,
  //   idRestaurante: 4,
  //   idConsumidor: 1,
  //   nome_usuario: 'Taruzao',
  //   valorProdutos: 13700,
  //   taxaDeEntrega: 500,
  //   valorTotal: 14200,
  //   enderecoDeEntrega: {
  //     endereco: 'ENDEREÇO',
  //     complemento: 'COMPLEMENTO',
  //     cep: 'CEP'
  //   },
  //   carrinho: [
  //     {
  //       id: 55,
  //       nome: 'burgao',
  //       preco: 2345,
  //       quantidade: 2,
  //       valorTotal: 7035
  //     },
  //     {
  //       id: 57,
  //       nome: 'burgao com angu',
  //       preco: 6665,
  //       quantidade: 1,
  //       valorTotal: 6665
  //     }
  //   ]
  // }];

  return (
    <div className="bodyProdutos">
      <div style={categoriaStyle()} className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <div className="flexColumn gap1rem nomeRestaurante">
            <h1 className="">{ usuario.nome }</h1>
            <div className="flexRow gap2rem">
              <button className={`${paginaPedidos ? 'btTransparenteGlow' : 'btLaranja'}`} type="button" onClick={() => setPaginaPedidos(true)}>Pedidos</button>
              <button className={`${paginaPedidos ? 'btLaranja' : 'btTransparenteGlow'}`} type="button" onClick={() => setPaginaPedidos(false)}>Cardapio</button>
            </div>
          </div>
          <button className="btLogout logout" type="button" onClick={deslogar}>Logout</button>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />
      <img src={usuario.imagem_restaurante ? usuario.imagem_restaurante : avatarPadrao} alt="avatarRestaurante" className="avatarRestaurante" />
      <div className="avatarRestaurante">
        <UsuarioEditar {...usuario} recarregarPag={() => setF5(true)} />
      </div>

      <div className={`${!paginaPedidos ? 'cadapioBox' : 'none'}`}>
        <div className={`${prod.length === 0 ? 'none' : 'contemProdutos'} flexColumn contentCenter itemsCenter mt2rem`}>
          <div className="contemBotao flexRow itemsCenter">
            <ProdutosNovo recarregarPag={() => setF5(true)} />
          </div>

          <div className="conteinerCardapio flexRow gap2rem">
            { prod.map((produto) => (
              <div className="flip-card" item key={produto.id}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <CustomCard
                      {...produto}
                      recarregarPag={() => setF5(true)}
                    />
                  </div>
                  <div className="flip-card-back">
                    <CustomModal {...produto} recarregarPag={() => setF5(true)} />
                    { ' ' }
                    <ProdutosEditar {...produto} recarregarPag={() => setF5(true)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${prod.length === 0 ? 'addProdutos' : 'none'} flexColumn contentCenter itemsCenter`}>
          <span>
            Você ainda não tem nenhum produto no seu cardápio.
            <br />
            Gostaria de adicionar um novo produto?
          </span>
          <ProdutosNovo recarregarPag={() => setF5(true)} />
        </div>
      </div>
      <div className={`${paginaPedidos ? 'pedidosBox' : 'none'}`}>
        <div className="pedidosBody">

          {/* <div className="pedidosButton flexRow gap2rem contentEnd itemsCenter mb2rem">
            <button
              className={`${paginaEnviados ? 'btLaranja' : 'btTransparenteGlow'} btPagEnviados`}
              type="button"
              onClick={() => setPaginaEnviados(false)}
            >
              Não enviados
            </button>
            <button
              className={`${paginaEnviados ? 'btTransparenteGlow' : 'btLaranja'} btPagEnviados`}
              type="button"
              onClick={() => setPaginaEnviados(true)}
            >
              Enviados
            </button>
          </div> */}

          <div className="pedidosTitle flexRow gap1rem contentBetween">
            <p>Pedido</p>
            <p>Items</p>
            <p>Endereço</p>
            <p>Cliente</p>
            <p>Total</p>
          </div>

          {/* TODO - filter para separar enviados */}
          <div className="cardsProdutos flexColumn gap1rem mt2rem contentCenter px2rem">
            { listaDePedidos.map((pedido) => (
              <div className="cardPedidoDetalhes ">
                <PedidoDetalhes
                  pedido={pedido}
                  id={pedido.id}
                  consumidor={pedido.nome_usuario}
                  produtosPedidos={pedido.carrinho}
                  enderecoDeEntrega={pedido.enderecoDeEntrega}
                  valorTotal={pedido.valorTotal}
                />
              </div>
            )) }
          </div>

        </div>
      </div>

    </div>
  );
}
