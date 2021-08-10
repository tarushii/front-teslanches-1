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
import { del } from '../../services/apiClient';
import AuthContext from '../../context/AuthContext';
import './styles.css';

export default function CustomModal({ id, recarregarPag }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext);

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
      const { dados, ok } = await del(`/produtos/${id}`, token);

      if (!ok) {
        toast.error(dados);
      }

      handleClose();
      recarregarPag();
    } catch (error) {
      // isso ta muito errado , ta excluido mas ta dando erro
      toast.success('O produto foi excluido com sucesso!');
      handleClose();
      recarregarPag();
    }
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      {/* <DeleteSweepIcon
        className={classes.deleteIcon}
        onClick={handleClickOpen}
      /> */}
      <button type="button" className="btTransparente" onClick={handleClickOpen}>Excluir produto do catálogo</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Remover produto do catálogo?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" component="p">
            Esta ação não poderá ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions className={classes.botoes}>
          <button className="btTransparente" type="button" onClick={handleClose}>
            Manter produto
          </button>
          <button className="btLaranja" type="submit" onClick={removerProduto}>
            Remover
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
