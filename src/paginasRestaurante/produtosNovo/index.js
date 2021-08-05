/* eslint-disable no-undef */
import './styles.css';
import '../../styles/global.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import CustomSwitch from '../../componentes/customSwitch';
import { postAutenticado } from '../../services/apiClient';
import AuthContext from '../../context/AuthContext';
import { schemaCadastrarProdutos } from '../../validacoes/schema';

export default function ProdutosNovo() {
  const { token } = useContext(AuthContext);
  const [produto, setProduto] = useState({});
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaCadastrarProdutos)
  });

  async function uploadImagem(e) {
    setCarregando(true);
    setErro('');
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
    setCarregando(false);
  }

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    console.log(data);

    try {
      const { dados, ok } = await postAutenticado('/produtos', data);
      setCarregando(false);
      console.log(data);
      if (!ok) {
        setErro(dados);
        console.log(erro);
        return;
      }

      logar(dados.usuario, dados.tokenUsuario);

      history.push('/produtos');
    } catch (error) {
      setErro(`Erro:${error.message}`);
    }
    setCarregando(false);
  }

  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem px2rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Novo produto</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome</label>
            <input id="nomeRestaurante" type="text" {...register('nome', { required: true })} />
            <p>{errors.nome?.message}</p>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <input id="descricao" type="text" {...register('descricao', { required: true })} />
            <span className="mr06rem">Máx.: 50 caracteres</span>
            <p>{errors.descricao?.message}</p>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valor">Valor</label>
            <input id="valor" type="number" placeholder="00,00" {...register('preco', { required: true })} />
            <p>{errors.preco?.message}</p>
          </div>
          <div className="ativarProdutos">
            <p>{errors.permiteObservacoes?.message}</p>
            <CustomSwitch label="Ativar produto" />
            <br />
            <CustomSwitch label="Permitir observações" />
          </div>
          <div />
          <div className="acoesProdutos flexRow contentEnd gap2rem itemsCenter">

            <button id="btAddProduto" className="btLaranja mr2rem mb2rem mt2rem" type="submit" color="primary">
              Adicionar produto
            </button>
          </div>
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
    </div>

  );
}
