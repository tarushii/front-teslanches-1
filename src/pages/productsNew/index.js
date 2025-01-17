/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './styles.css';
import '../../styles/global.css';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import { postAutenticado, postNaoAutenticado } from '../../services/apiClient';
import useAuth from '../../hooks/useAuth';
import { schemaCadastrarProdutos } from '../../validacoes/schema';
import AuthContext from '../../context/AuthContext';
import useStyles from './styles';
import { toastNome, toastDescricao, toastPreco } from '../../validacoes/toastfy';

export default function ProdutosNovo({ recarregarPag }) {
  const [erro, setErro] = useState('');
  const [open, setOpen] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [urlImagem, setUrlImagem] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const { token } = useContext(AuthContext);
  const { user } = useAuth();
  const classes = useStyles();
  const toastOk = 'ok';
  const toastErro = 'erro';
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: '',
    defaultValues: {},
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(schemaCadastrarProdutos)
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function stop(e) {
    e.stopPropagation();
  }

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    const todosDados = { ...data, imagemProduto: urlImagem };
    const { ativo, ...dadosAtualizados } = Object
      .fromEntries(Object
        .entries(todosDados)
        .filter(([, value]) => value));
    dadosAtualizados.permiteObservacoes = !!dadosAtualizados.permiteObservacoes;
    try {
      const { dados, ok } = await postAutenticado('/produtos', dadosAtualizados, token);
      if (!ok) {
        setErro(dados);
        toast.error(dados, { toastId: toastErro });
        return;
      }
      setCarregando(false);
    } catch (error) {
      toast.error(error.message, { toastId: toastErro });
      setErro(error.message);
    }
    handleClose();
    recarregarPag();
    toast.success('Produto criado com sucesso', { toastId: toastOk });
  }

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

  async function uploadImagem(e) {
    setCarregando(true);
    const { ID } = user;
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    const imagemFoto = { imagem: `${ID}/${Date.now()}.jpg` };
    const temFoto = await postNaoAutenticado('/imagem', imagemFoto);
    if (temFoto) {
      await postNaoAutenticado('/delete', imagemFoto);
    }
    const data = {
      nome: `${ID}/${Date.now()}.jpg`,
      imagem: `${base64.split(',')[1]}`
    };
    const { dados, ok } = await postNaoAutenticado('/upload', data);
    if (!ok) {
      toast.error(dados, { toastId: toastErro });
      console.log(dados);
      return;
    }
    setUrlImagem(dados);
    setCarregando(false);
    toast.success('A imagem foi adicionada', { toastId: toastOk });
  }

  if (errors.nome) {
    toastNome();
  }
  if (errors.descricao) {
    toastDescricao();
  }
  if (errors.preco) {
    toastPreco();
  }

  const permiteObservacoes = false;

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <button
        type="button"
        className="btLaranja mt2rem"
        onClick={handleClickOpen}
      >
        Adicionar produto ao cardápio
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="flexColumn pa2rem">
          <div className="formProdutos flexRow gap3rem px2rem">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Novo produto</h1>
              <div className="flexColumn mb1rem ">
                <label htmlFor="nomeRestaurante">Nome</label>
                <input id="nomeRestaurante" type="text" {...register('nome', { required: true })} />
              </div>
              <div className="flexColumn mb1rem ">
                <label htmlFor="descricao">Descrição</label>
                <input id="descricao" type="text" {...register('descricao', { required: true })} />
                <span className="mr06rem">Máx.: 50 caracteres</span>
              </div>
              <div className="flexColumn mb1rem ">
                <label htmlFor="valor">Valor</label>
                <input id="valor" type="number" placeholder="00,00" {...register('preco', { required: true, valueAsNumber: true })} />
              </div>
              <actions className="ativarProdutos">
                <section>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round" />
                    <span>ON</span>
                  </label>
                  <span className="ml1rem">Ativar produto</span>
                </section>
                <section>
                  <label className="switch">
                    <input type="checkbox" {...register('permiteObservacoes')} defaultChecked={permiteObservacoes} />
                    <span className="slider round" />
                    <span>ON</span>
                  </label>
                  <span className="ml1rem">Permitir observações</span>
                </section>
              </actions>
            </form>
            <div className="fotoProdutosNovo posRelative">
              { baseImage
                ? (<img src={baseImage} alt="foto do produto" id="fotoCarregada" />)
                : (<img src={fotoProduto} alt="foto do produto" />)}
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
        </div>
        <div className="pb2rem">
          <DialogActions className={classes.botoes}>
            <button className="btTransparente" type="button" onClick={handleClose}>
              Cancelar
            </button>
            <button className="btLaranja" type="submit" onClick={handleSubmit(onSubmit)}>
              Adicionar produto ao cardápio
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
