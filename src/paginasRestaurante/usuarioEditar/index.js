/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import './styles.css';
import React, { useState } from 'react';
import '../../styles/global.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import uploadIcon from '../../assets/upload-icon.svg';
import fotoProduto from '../../assets/foto-produto.svg';
import useAuth from '../../hooks/useAuth';
import useStyles from './styles';
import { postNaoAutenticado, put, get } from '../../services/apiClient';

export default function UsuarioEditar({

  nomeusuario, email, nome, categoria_id, descricao, taxa_entrega, tempo_entrega_minutos,

  valor_minimo_pedido, imagem_restaurante, recarregarPag
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);
  const [urlImagem, setUrlImagem] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const { user, token } = useAuth();
  const classes = useStyles();
  const [values, setValues] = React.useState({});
  const { register, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }


  function stop(e) {
    e.stopPropagation();
  }


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
      nome: `${ID}/${Date.now()}.jpg`,
      imagem: `${base64.split(',')[1]}`
    };

    try {
      const { nomeImagem } = data;
      const imagem = { imagem: `${nomeImagem}` };
      await postNaoAutenticado('/delete', imagem);

      const { dados, ok } = await postNaoAutenticado('/upload', data);

      if (!ok) {
        return toast.error(dados);
      }
      setUrlImagem({ imagem_restaurante: dados });

      return console.log('sucesso');
    } catch (error) {
      return toast.error(error.message);
    }
  };

  async function onSubmit(data) {
    data.taxa_entrega = ((parseInt(data.taxa_entrega)) * 100);
    data.categoria_id = parseInt(data.categoria_id);
    if (values.password !== values.tryPassword) {
      return toast.error('Senhas não conferem');
    }
    try {
      const { dados, ok } = await put('/usuario', data, token);
      if (urlImagem) {
        await put('/imagemUsuario', urlImagem, token);
      }
      if (!ok) {
        return toast.error(`erro: ${dados}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
    handleClose();
    recarregarPag();
    return toast.success('Sucesso ao editar Usuario');
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <button
        type="button"
        className="btEditarUsuario"
        onClick={handleClickOpen}
      >
        .
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="flexColumn">
          <div className="formProdutos flexRow gap3rem ml2rem ">
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <h1>Editar Perfil</h1>
              <div className="flexColunm mb1rem ">
                <label htmlFor="nomeUsuario">Nome de Usuario</label>
                <input id="nomeUsuario" type="text" defaultValue={nomeusuario} {...register('nomeUsuario')} />
              </div>
              <div className="flexColunm mb1rem ">
                <label htmlFor="email">Email</label>
                <input id="email" type="text-field" {...register('email')} defaultValue={email} />
              </div>
              <div className="flexColunm mb1rem ">
                <label htmlFor="nomeRestaurante">Nome do Restaurante</label>
                <input id="nomeRestaurante" type="text-field" {...register('nomeRestaurante')} defaultValue={nome} />
              </div>
              <div className="flexColunm mb1rem ">
                <label htmlFor="categorias">Categoria do Restaurante</label>
                <select className="categoria-restaurante" name="categoria" id="categorias" defaultValue={categoria_id} {...register('categoria_id')}>
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
                <textarea defaultValue={descricao} id="descricao" rows="3" cols="40" {...register('descricao')} />
                <span className="mr06rem">Máx.: 50 caracteres</span>
              </div>
              <div className="flexColunm mb1rem ">
                <label htmlFor="taxaDeEntrega">Taxa de Entrega</label>
                <input id="taxaDeEntrega" type="text-field" {...register('taxa_entrega')} defaultValue={taxa_entrega / 100} />
              </div>
              <div className="flexColunm mb1rem ">
                <label htmlFor="tempoDeEntrega">Tempo Estimado de entrega</label>
                <input id="tempoDeEntrega" type="text-field" {...register('tempo_entrega_minutos')} defaultValue={tempo_entrega_minutos} />
              </div>
              <div className="flexColunm mb1rem ">
                <label htmlFor="valorMinimoPedido">Valor minimo do pedido</label>
                <input id="valorMinimoPedido" type="currency" defaultValue={valor_minimo_pedido} {...register('valor_minimo_pedido')} />
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
            </form>
            <div className="fotoProdutosNovo posRelative">

              {baseImage
                ? (<img src={baseImage} alt="foto do produto" className="fotoCarregada" />)
                : imagem_restaurante
                  ? (<img src={imagem_restaurante} alt="foto do usuario" id="fotoCarregada" />)
                  : (<img src={fotoProduto} alt="foto do usuario" />) }

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
          <div className="btMudancas">
            <DialogActions className={classes.botoes}>
              <button className="btTransparente" type="button" onClick={handleClose}>
                Cancelar
              </button>
              <button className="btLaranja btSalvar" type="submit" onClick={handleSubmit(onSubmit)}>
                Salvar alterações
              </button>
            </DialogActions>
          </div>
          <div className="acoesProdutos flexRow contentEnd contentCenter gap2rem itemsCenter" />
        </div>
      </Dialog>
    </div>
  );
}
