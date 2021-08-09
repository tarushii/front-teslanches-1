/* eslint-disable no-undef */
import './styles.css';
import '../../styles/global.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import {
  get, postAutenticado, postNaoAutenticado, put
} from '../../services/apiClient';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import { schemaCadastrarProdutos } from '../../validacoes/schema';

export default function ProdutosEditar({
  id: idProduto, nome, descricao, preco, imagemProduto
}) {
  const { token } = useContext(AuthContext);
  const [produto, setProduto] = useState({});
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [urlImagem, setUrlImagem] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const { user } = useAuth();
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCadastrarProdutos)
  });
  const customId = 'custom-id-yes';

  useEffect(() => {
    setCarregando(true);
    async function carregarProduto() {
      const dados = await get(`/produtos/${idProduto}`, token);
      setProduto(dados);
    }

    carregarProduto();
    setCarregando(false);
  }, []);

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    const { permiteObservacoes: permite, ativo: ativar } = data;
    // const todosDados = { ...data, imagem_produto: urlImagem };
    const dadosFoto = { imagem_produto: urlImagem };

    const { ativo, ...dadosAtualizados } = Object
      .fromEntries(Object
        .entries(data)
        .filter(([, value]) => value));

    console.log(todosDados);

    try {
      const { dados, ok } = await put(`/produtos/${idProduto}`, dadosAtualizados, token);
      const fotoRes = await put(`/produtos/${idProduto}`, dadosFoto, token);

      if (!ok) {
        setErro(dados);
        toast.error(erro.message, { toastId: customId });
        return;
      }

      if (ativo) {
        const ativado = await postAutenticado(`/produtos/${idProduto}/ativar`, ativo, token);
        toast.success(ativado, { toastId: customId });
      } else {
        const ativado = await postAutenticado(`/produtos/${idProduto}/desativar`, ativo, token);
        toast.success(ativado, { toastId: customId });
      }
    } catch (error) {
      setErro(`Erro:${error.message}`);
      toast.error(error);
    }
    setCarregando(false);

    toast.success('O produto foi atualizado com sucesso!', { toastId: customId });
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

    const data = {
      nome: `${ID}/produto.jpg`,
      imagem: `${base64.split(',')[1]}`
    };

    const { nome: nomeFoto } = data;
    const imagemFoto = { imagem: `${nomeFoto}` };
    await postNaoAutenticado('/delete', imagemFoto);

    const { dados, ok } = await postNaoAutenticado('/upload', data);

    if (!ok) {
      return toast.error(dados, { toastId: customId });
    }
    setUrlImagem(dados);
    setCarregando(false);
    return toast.success('A imagem foi alterada', { toastId: customId });
  }

  toast.error(errors.nome?.message, { toastId: customId });
  toast.error(errors.descricao?.message, { toastId: customId });
  toast.error(errors.preco?.message, { toastId: customId });

  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem px2rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Editar produto</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome</label>
            <input
              id="nomeRestaurante"
              type="text"
              defaultValue={nome}
              {...register('nome')}
            />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              type="text-field"
              defaultValue={descricao}
              {...register('descricao')}
            />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              type="number"
              placeholder="00,00"
              defaultValue={preco}
              {...register('preco')}
            />
          </div>
          <actions className="ativarProdutos">
            <section>
              <label className="switch">
                <input type="checkbox" defaultChecked="true" {...register('ativar')} />
                <span className="slider round" />
                <span>ON</span>
              </label>
              <span className="ml1rem">Ativar produto</span>
            </section>

            <section>
              <label className="switch">
                <input type="checkbox" {...register('permite')} defaultChecked="true" />
                <span className="slider round" />
                <span>ON</span>
              </label>
              <span className="ml1rem">Permitir observações</span>
            </section>
          </actions>
          <div className="acoesProdutos flexRow contentEnd gap2rem itemsCenter">

            <button id="btAddProduto" className="btLaranja mr2rem mb2rem mt2rem" type="submit" color="primary">
              Atualizar produto
            </button>
          </div>
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

  );
}
