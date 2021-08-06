/* eslint-disable no-undef */
import './styles.css';
import '../../styles/global.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import { get } from '../../services/apiClient';
import AuthContext from '../../context/AuthContext';

export default function ProdutosNovo() {
  const { token } = useContext(AuthContext);
  const [produto, setProduto] = useState({});
  const { handleSubmit } = useForm();

  async function uploadImagem(e) {
    const formData = new FormData();
    formData.append('imagemProduto', e.target.files[0]);

    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const urlImagem = await response.json();
    setProduto(urlImagem);
  }

  useEffect(() => {
    async function carregarProduto() {
      const produtoInfo = await get(`/produtos/${idProduto}`, token);
      setProduto(produtoInfo);
    }

    carregarProduto();
  }, []);

  async function onSubmit(data) {
    const produtoInfo = Object.fromEntries(Object.entries(data).filter(([, value]) => value));

    await fetch('http://localhost:8000/upload', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(produtoInfo)
    });
  }

  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem px2rem">
        <form>
          <h1>Novo produto</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome</label>
            <input id="nomeRestaurante" type="text" value={produto.nome} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <input id="descricao" type="text-field" value={produto.descricao} />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valor">Valor</label>
            <input id="valor" type="number" placeholder="00,00" value={produto.preco} />
          </div>
          <div className="ativarProdutos">
            <br />
          </div>
          <div />
        </form>
        <div className="fotoProdutosNovo posRelative">
          { produto.imagemProduto
            ? (<img src={produto.imagemProduto} alt="foto do produto" />)
            : (<img src={fotoProduto} alt="foto do produto" />)}
          <label htmlFor="fileNew" className="fileNew" />
          <input type="file" id="fileNew" name="file" onChange={(e) => uploadImagem(e)} />
          <img className="iconeUpload" src={uploadIcon} alt="icone de upload de foto" />

          <label htmlFor="iconeUpload" className="labelIconeUpload">
            Clique
            para adicionar uma imagem
          </label>
        </div>
      </div>
      <div className="acoesProdutos flexRow contentEnd contentCenter gap2rem itemsCenter">
        <button className="btLaranja mr2rem mb2rem mt2rem" type="submit" onClick={handleSubmit(onSubmit)} color="primary">
          Adicionar produto
        </button>
      </div>
    </div>

  );
}
