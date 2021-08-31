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
import ShowMore from 'react-show-more';
import useStyles from './styles';
import precoConvertido from '../../formatting/currency';
import CustomCard from '../../componentes/customCard';
import { postEstadoProduto } from '../../services/apiClient';
import useAuth from '../../hooks/useAuth';

export default function PedidoDetalhes({
  id,
  recarregarPag,
  valorTotal,
  consumidor,
  produtosPedidos,
  pedido,
  enderecoDeEntrega,
  valor_produtos
}) {
  const [erro, setErro] = useState('');
  const [temEndereco, setTemEndereco] = useState([]);
  const [open, setOpen] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const classes = useStyles();
  const { token } = useAuth();
  const {
    handleSubmit
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
    end();
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
    try {
      const { dados, ok } = await postEstadoProduto(`/pedido/${id}`, token);
      if (!ok) {
        return toast.error(`erro${dados}`);
      }
    } catch (error) {
      return toast.error(error.message);
    }
    handleClose();
    recarregarPag();
    return toast.success('O pedido foi enviado com sucesso!');
  }

  function end() {
    setTemEndereco(enderecoDeEntrega);
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <div className="pedidosLine gridPedidos contentBetween">
        <p>{id}</p>
        <div className="flexColumn">
          <ShowMore
            lines={2}
            more="Ver mais..."
            less="Ver menos..."
            anchorClass="verMais"
          >
            { pedido.carrinho.map((item) => (
              <div className=" gap1rem">
                <p>
                  { item.nome }
                  {' '}
                  { item.quantidade }
                  {' '}
                  {item.quantidade === 1 ? 'unidade' : 'unidades' }
                </p>
                <br />
              </div>
            ))}
          </ShowMore>
        </div>
        <div>
          <p>
            {enderecoDeEntrega.endereco}
            ,
          </p>
          <p>
            {enderecoDeEntrega.complemento}
            ,
          </p>
          <p>
            {enderecoDeEntrega.cep}
            .
          </p>
        </div>
        <p>{consumidor}</p>
        <p>{precoConvertido(valor_produtos) }</p>
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
          <div className="bodyPedidoDetalhes flexColumn contentBetween">
            <div className="flexColumn ">
              <div className="topPedidoDetalhes flexRow posRelative gap2rem ">
                <h1>{id}</h1>
                <button id="btCrossPedidoDetalhes" className="btCross" type="button" onClick={handleClose}>
                  &times;
                </button>
              </div>
              <div className="conteinerEndereco flexRow px3rem mb1rem flewRow gap06rem">
                <h3>Endereço de entrega: </h3>
                <span>
                  {' '}
                  { temEndereco.endereco }
                  ,
                </span>
                {' '}
                { temEndereco.complemento }
                ,
                <span>
                  {' '}
                  { temEndereco.cep }
                </span>
                <span />
              </div>
              <div className="cardsProdutos flexColumn mt2rem contentCenter px2rem">
                { pedido.carrinho.map((produto) => (
                  <div className="miniCardPedidoDetalhes ">
                    <CustomCard
                      id="miniPedidoDetalhes"
                      {...produto}
                      verificaAtivo="tem que por"
                    />
                  </div>
                )) }
              </div>
            </div>
            <div className="footerPedidosDetalhes px2rem mb3rem contentEnd">
              <div className="lineSpace" />
              <form>
                <div className="flexColumn contentCenter px2rem">
                  <div className="total flexRow contentBetween mb06rem">
                    <span>Total</span>
                    <h2>{precoConvertido(pedido.valor_total)}</h2>
                  </div>
                  <div className="flexRow contentCenter itemsCenter">
                    <button id="btConfirmaPedido" className="btLaranja" disabled={!!pedidoEnviado} type="submit" onClick={handleSubmit(onSubmit)}>
                      Enviar pedido
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
