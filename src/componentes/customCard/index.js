import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './styles.css';

const useStyles = makeStyles(() => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },

}));

export default function CustomCard({
  nome, descricao, valor, imagem
}) {
  const classes = useStyles();

  return (
    <card className="card flexRow gap1rem contentBetween itemsCenter">
      <div className="flexColumn gap2rem cardConteudo">
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            <h1>{nome}</h1>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <p>{descricao}</p>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <div className="valorBox">
              <span>
                R$
                {valor}
              </span>
            </div>
          </Typography>
        </CardContent>
      </div>
      <div className="flexRow mr1rem">
        <img className="imgCard" src={imagem} alt={`foto de ${nome}`} />
      </div>

    </card>
  );
}
