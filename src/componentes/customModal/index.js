/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import useStyles from './styles';
import { del, get } from '../../services/apiClient';
import AuthContext from '../../context/AuthContext';
import './styles.css';

export default function CustomModal({ id, recarregarPag }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const customId = 'custom-id-yes';

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function stop(e) {
    e.stopPropagation();
  }

  async function removerProduto() {
    try {
      const { dados: dadosProduto } = await get(`/produtos/${id}`, token);

      if (dadosProduto.ativo) {
        return toast.error('Produto ativo nao pode ser excluido', { toastId: customId });
      }

      const { dados, ok } = await del(`/produtos/${id}`, token);

      if (!ok) {
        toast.error(dados);
      }
    } catch (error) {
      toast.error(error.message);
    }
    handleClose();
    recarregarPag();
    return toast.success('O produto foi excluido com sucesso!');
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <button type="button" className="btTransparente" onClick={handleClickOpen}>Excluir produto do catálogo</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="bodyModalDelete">

          <h1>Remover produto do catálogo?</h1>
          <div className="conteudoModalDelete">
            <p>Esta ação não poderá ser desfeita.</p>
          </div>
          <div className="conteudoBotoes">
            <div className="flexRow contentCenter gap2rem">
              <button className="btTransparente" type="button" onClick={handleClose}>
                Manter produto
              </button>
              <button className="btLaranja" type="submit" onClick={removerProduto}>
                Remover
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
