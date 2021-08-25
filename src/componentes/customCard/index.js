import React from 'react';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import precoConvertido from '../../formatting/currency';

export default function CustomCard({
  nome, descricao, preco, imagem_produto: imagemProduto, quantidade
}) {
  return (
    <card className="card flexRow gap1rem contentBetween itemsCenter posRelative">
      <div className="flexColumn gap2rem cardConteudo">
        <cardcontent className="cardContent flexColumn itemsStart ml2rem gap2rem">
          <Typography component="h5" variant="h5">
            <h1>{nome}</h1>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <p>{ descricao }</p>
            <p className="campoQuantidade">{quantidade && `${quantidade} ${quantidade === 1 ? 'unidade' : 'unidades'}` }</p>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <div className="valorBox">
              <span>
                {precoConvertido(preco)}
              </span>
            </div>
          </Typography>
        </cardcontent>
      </div>
      <div className="flexRow mr1rem">
        <img className="imgCardCart" src={`${imagemProduto}`} alt={`foto de ${nome}`} />
        <img className="imgCard" src={`${imagemProduto}`} alt={`foto de ${nome}`} />
      </div>
    </card>
  );
}
