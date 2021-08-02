import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import { useHistory } from 'react-router-dom';
import CustomModal from '../customModal';
import CustomizedDialogs from '../customDialog';
import ProdutosEditar from '../../paginasRestaurante/produtosEditar';

const useStyles = makeStyles(() => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },

}));

export default function CustomCard(props) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState('');
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    setEditProduct({});
  }, [editModal]);

  function handleEdit() {
    setEditModal(true);
  }

  return (
    <button className="buttomModal" onBlur={() => setShowModal(false)} type="button" onClick={() => setShowModal(true)}>
      <card className="card flexRow gap1rem contentBetween itemsCenter posRelative">
        <div className="flexColumn gap2rem cardConteudo">
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              <h1>{props.nome}</h1>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <p>{props.descricao}</p>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <div className="valorBox">
                <span>
                  R$
                  {props.valor}
                </span>
              </div>
            </Typography>
          </CardContent>
        </div>
        <div className="flexRow mr1rem">
          <img className="imgCard" src={props.imagem} alt={`foto de ${props.nome}`} />
        </div>
        {showModal ? (
          <CustomModal className="botoesModal flexColunm itemsCenter">
            <button className="btTransparente" type="button">Excluir produto do catálogo</button>
            {' '}
            <CustomizedDialogs
              btAbrirMensagem={<> Editar produto </>}
              btMensagem={<>Atualizar produto </>}
              conteudo={<ProdutosEditar />}
            />
          </CustomModal>
        ) : ''}

      </card>
    </button>
  );
}
