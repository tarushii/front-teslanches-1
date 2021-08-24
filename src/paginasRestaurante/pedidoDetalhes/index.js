/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../styles/global.css';
import './styles.css';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useStyles from './styles';
import { get, postAutenticado } from '../../services/apiClient';
import precoConvertido from '../../formatting/currency';
import useAuth from '../../hooks/useAuth';
import CustomCard from '../../componentes/customCard';

export default function PedidoDetalhes({
  carrinho,
  emptyCart,
  descricao,
  restaurante,
  recarregarPag,
  imagemProduto,
  subTotal,
  pedidos,
}) {
  const [erro, setErro] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [addCarrinho, setAddCarrinho] = useState([]);
  // const [temEndereco, setTemEndereco] = useState([]);
  const temEndereco = { cep: 123123123, endereco: 'qlqr', complemento: 'faltou' };
  const [open, setOpen] = useState(false);
  // const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const classes = useStyles();
  const customId = 'custom-id-yes';
  const {
    user, token, cart, rest
  } = useAuth();
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: '',
    defaultValues: {},
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function stop(e) {
    e.stopPropagation();
  }

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    // const { ...dadosAtualizados } = Object
    //   .fromEntries(Object
    //     .entries(data)
    //     .filter(([, value]) => value));

    handleClose();
    emptyCart();
    recarregarPag();
    toast.success('O pedido foi enviado com sucesso!');
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <div className="pedidosLine flexRow contentBetween">
        <p>pedido.id</p>
        <div>
          <p>pedido.item</p>
          <p>...</p>
        </div>
        <div>
          <p>
            CEP
            pedido.endereco.cep
          </p>
          <p>
            Endereço
            pedido.endereco.endereco
          </p>
          <p>
            Complemento
            pedido.endereco.complemento
          </p>
        </div>
        <p>pedido.nomeusuario</p>
        <p>{precoConvertido(10000) }</p>
      </div>
      <button
        type="button"
        className="btOpenPedidoDetalhes"
        onClick={handleClickOpen}
      >
        .
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="flexColumn">
          <div className="bodyPedidoDetalhes flexColumn">
            <div className="topPedidoDetalhes flexRow posRelative gap2rem ">
              <h1>pedido id</h1>
              <button id="btCrossPedidoDetalhes" className="btCross" type="button" onClick={handleClose}>
                &times;
              </button>
            </div>

            <div className={`${temEndereco ? 'none' : 'conteinerEndereco'} px3rem mb2rem flewRow gap06rem`}>
              <span>
                CEP
                {' '}
                { temEndereco.cep }
                {' '}
              </span>
              <span>
                {' '}
                Endereço
                {' '}
                { temEndereco.endereco }
                {' '}
              </span>
              <span>
                {' '}
                Complemento
                {' '}
                { temEndereco.complemento }
                {' '}
              </span>
            </div>

            <div className="cardsProdutos flexColumn gap1rem mt2rem contentCenter px2rem">
              { pedidos.map((pedido) => (
                <div className="cardPedidoDetalhes ">
                  <CustomCard
                    id="miniPedidoDetalhes"
                    {...pedido}
                    verificaAtivo="tem que por"
                  />
                </div>
              ))}
            </div>
            <div className="flexRow mt3rem contentCenter px2rem mb3rem">
              <button id="btTransparenteCinza" type="button" onClick={handleClose}>Adicionar mais itens ao pedido</button>
            </div>
            <div className="lineSpace" />
            <form>
              <div className="flexColumn contentCenter px2rem">
                <div className="subTotal flexRow contentBetween mb06rem">
                  <span>Subtotal</span>
                  <span>{precoConvertido(subTotal)}</span>
                </div>
                <div className="total flexRow contentBetween mb06rem">
                  <span>Total</span>
                  <h2>{precoConvertido(subTotal)}</h2>
                </div>
                <div className="flexRow contentCenter itemsCenter">
                  <button id="btConfirmaPedido" className="btLaranja" type="submit" onClick={handleSubmit(onSubmit)}>
                    Confirmar pedido
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
