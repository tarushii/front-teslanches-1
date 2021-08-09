/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import './styles.css';
import React, { useState, useEffect } from 'react';
import '../../styles/global.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import InputPassword from '../../componentes/inputPassword';
import uploadIcon from '../../assets/upload-icon.svg';
import fotoProduto from '../../assets/foto-produto.svg';
import useAuth from '../../hooks/useAuth';
import { postNaoAutenticado, put, get } from '../../services/apiClient';

export default function UsuarioEditar() {
  const { register, handleSubmit } = useForm();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [urlImagem, setUrlImagem] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const { user, token } = useAuth();
  const [values, setValues] = React.useState({});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const buscarUsuario = async () => {
    try {
      const { dados, ok } = await get('/usuario', token);

      if (!ok) {
        return console.log(`erro${dados}`);
      }
      console.log(dados);
      return setUsuario(dados);
    } catch (error) {
      console.log(error.message);
    }
    return console.log('Usuario');
  };

  useEffect(() => {
    buscarUsuario();
  }, []);

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
    setUrlImagem({ imagem_restaurante: dados });

    return console.log('sucesso');
  };

  async function onSubmit(data) {
    data.taxa_entrega = ((parseInt(data.taxa_entrega)) * 100);
    data.categoria_id = parseInt(data.categoria_id);
    if (data.nomeUsuario === '') {
      data.nomeUsuario = usuario.nomeusuario;
    }
    if (data.email === '') {
      data.email = usuario.email;
    }
    if (data.nomeRestaurante === '') {
      data.nomeRestaurante = usuario.nome;
    }
    if (data.categoria_id === '') {
      data.categoria_id = usuario.categoria_id;
    }
    if (data.descricao === '') {
      data.descricao = usuario.descricao;
    }
    if (data.taxa_entrega === '') {
      data.taxa_entrega = usuario.taxa_entrega;
    }
    if (data.tempo_entrega_minutos === '') {
      data.tempo_entrega_minutos = usuario.tempo_entrega_minutos;
    }
    if (data.valor_minimo_pedido === '') {
      data.valor_minimo_pedido = usuario.valor_minimo_pedido;
    }
    console.log(JSON.stringify(data));
    if (!values.password) {
      return toast.error('Senhas são obrigatórias ');
    }
    if (values.password !== values.tryPassword) {
      return toast.error('Senhas não conferem');
    }
    try {
      const { dados, ok } = await put('/usuario', data, token);
      const imagemMudada = await put('/imagemUsuario', urlImagem, token);
      console.log(imagemMudada);
      if (!ok) {
        return toast.error(`erro: ${dados}`);
      }
    } catch (error) {
      return toast.error(error.message);
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
            <input id="nomeUsuario" type="text" {...register('nomeUsuario')} placeholder={usuario.nomeusuario} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="email">Email</label>
            <input id="email" type="text-field" {...register('email')} placeholder={usuario.email} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome do Restaurante</label>
            <input id="nomeRestaurante" type="text-field" {...register('nomeRestaurante')} placeholder={usuario.nome} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="categorias">Categoria do Restaurante</label>
            <select className="categoria-restaurante" name="categoria" id="categorias" placeholder={usuario.categoria} {...register('categoria_id')}>
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
            <textarea placeholder={usuario.descricao} id="descricao" rows="3" cols="40" {...register('descricao')} />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="taxaDeEntrega">Taxa de Entrega</label>
            <input id="taxaDeEntrega" type="text-field" {...register('taxa_entrega')} placeholder={usuario.taxa_entrega} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="tempoDeEntrega">Tempo Estimado de entrega</label>
            <input id="tempoDeEntrega" type="text-field" {...register('tempo_entrega_minutos')} placeholder={usuario.tempo_entrega_minutos} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valorMinimoPedido">Valor minimo do pedido</label>
            <input id="valorMinimoPedido" type="currency" placeholder={usuario.valor_minimo_pedido} {...register('valor_minimo_pedido')} />
          </div>
          <div className="flexColunm mb1rem inputPassword">
            <label htmlFor="senha">Senha</label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={values.password}
              {...register('senha')}
              onChange={handleChange('password')}
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
              value={values.trypassword}
              onChange={handleChange('tryPassword')}
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
            ? (<img src={baseImage} alt="foto do usuario" id="fotoCarregada" />)
            : (<img src={fotoProduto} alt="foto do usuario" />)}
          <label htmlFor="fileNew" className="fileNew" />
          <input
            type="file"
            id="fileNew"
            name="file"
            onChange={(e) => uploadImagem(e)}
          />
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
