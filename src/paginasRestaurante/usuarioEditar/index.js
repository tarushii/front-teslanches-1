import './styles.css';
import React, { useState } from 'react';
import '../../styles/global.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import InputPassword from '../../componentes/inputPassword';
import uploadIcon from '../../assets/upload-icon.svg';
import fotoProduto from '../../assets/foto-produto.svg';
import useAuth from '../../hooks/useAuth';
import { postAutenticado, postNaoAutenticado, put } from '../../services/apiClient';

export default function UsuarioEditar() {
  const { register, handleSubmit } = useForm();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);
  const [urlImagem, setUrlImagem] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const { user, token } = useAuth();

  const convertBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const uploadImagem = async (e) => {
    const { ID } = user;
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);

    const data = {
      nome: `${ID}/usuario.jpg`,
      imagem: `${base64.split(',')[1]}`
    };
    const { nome } = data;
    const imagem = { imagem: `${nome}` };
    await postNaoAutenticado('/delete', imagem);

    const { dados, ok } = await postNaoAutenticado('/upload', data);

    if (!ok) {
      return console.log(dados);
    }
    setUrlImagem(dados);
    return console.log('sucesso');
  };

  async function onSubmit(data) {
    console.log(data);

    const { dados, ok } = await put('/usuario', data, token);
    if (!ok) {
      return console.log(`erro${dados}`);
    }
    return console.log('sucesso ao editar usuario');
  }

  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem ml2rem">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <h1>Editar Perfil</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeUsuario">Nome de Usuario</label>
            <input id="nomeUsuario" type="text" {...register('nomeUsuario')} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="email">Email</label>
            <input id="email" type="text-field" {...register('email')} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome do Restaurante</label>
            <input id="nomeRestaurante" type="text-field" {...register('nomeRestaurante')} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="categorias">Categoria do Restaurante</label>
            <select className="categoria-restaurante" name="categoria" id="categorias" placeholder="Escolha uma categoria" {...register('categoria_id')}>
              <option value="1">Diversos</option>
              <option value="2">Lanches</option>
              <option value="3">Carnes</option>
              <option value="4">Massas</option>
              <option value="5">Pizzas</option>
              <option value="6">Japonesa</option>
              <option value="7">Chinesa</option>
              <option value="8">Mexicano</option>
              <option value="9">Brasileira</option>
              <option value="10">Italiana</option>
              <option value="11">Árabe</option>
            </select>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" rows="3" cols="40" {...register('descricao')}> </textarea>
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="taxaDeEntrega">Taxa de Entrega</label>
            <input id="taxaDeEntrega" type="text-field" {...register('taxa_entrega')} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="tempoDeEntrega">Tempo Estimado de entrega</label>
            <input id="tempoDeEntrega" type="text-field" {...register('tempo_entrega_minutos')} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valorMinimoPedido">Valor minimo do pedido</label>
            <input id="valorMinimoPedido" type="currency" placeholder="00,00" {...register('valor_minimo_pedido')} />
          </div>
          <div className="flexColunm mb1rem inputPassword">
            <label htmlFor="senha">Senha</label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              {...register('senha')}
            />
            <FontAwesomeIcon
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="eyePassword"
              icon={mostrarSenha ? faEye : faEyeSlash}
              size="lg"
            />
          </div>
          <div className="flexColunm mb1rem inputPassword">
            <label htmlFor="repitaSenha">Repita a senha</label>
            <input
              type={mostrarSenha2 ? 'text' : 'password'}
            />
            <FontAwesomeIcon
              onClick={() => setMostrarSenha2(!mostrarSenha2)}
              className="eyePassword"
              icon={mostrarSenha2 ? faEye : faEyeSlash}
              size="lg"
            />
          </div>
          <button id="btSalvar" className="btLaranja btSalvar" type="submit">Salvar mudanças</button>
        </form>
        <div className="fotoProdutosNovo posRelative">

          { baseImage
            ? (<img src={baseImage} alt="foto do produto" id="fotoCarregada" />)
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

      <div className="acoesProdutos flexRow contentEnd contentCenter gap2rem itemsCenter" />
    </div>

  );
}
