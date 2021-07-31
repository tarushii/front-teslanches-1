import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Link } from 'react-router-dom';

import './styles.css';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btLaranja mt2rem" type="button" onClick={handleClickOpen}>
        {props.btAbrirMensagem}
      </button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

        <DialogContent dividers>
          {props.conteudo}

        </DialogContent>
        <DialogActions>
          <Link to="/protudos">Cancelar</Link>
          <button className="btLaranja mr2rem mb2rem mt2rem" type="submit" onClick={handleClose} color="primary">
            {props.btMensagem}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
