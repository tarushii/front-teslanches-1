import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import './styles.css';

export default function CustomCard({
  id: idProduto, nome, descricao, preco, imagem
}) {
  const [editModal, setEditModal] = useState('');
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    setEditProduct({});
  }, [editModal]);

  return (

    <card className="card flexRow gap1rem contentBetween itemsCenter posRelative">
      <div className="flexColumn gap2rem cardConteudo">
        <cardcontent className="flexColunm itemsStart ml2rem gap2rem">
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
                {preco}
              </span>
            </div>
          </Typography>
        </cardcontent>
      </div>
      <div className="flexRow mr1rem">
        <img className="imgCard" src={imagem} alt={`foto de ${nome}`} />
      </div>

    </card>
  );
}
