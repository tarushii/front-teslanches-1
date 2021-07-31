import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
    <Card className="card flexRow gap1rem pa06rem">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {nome}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {descricao}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {valor}
          </Typography>
        </CardContent>

      </div>
      <div>
        <img src={imagem} alt={`foto de ${nome}`} />
      </div>

    </Card>
  );
}
