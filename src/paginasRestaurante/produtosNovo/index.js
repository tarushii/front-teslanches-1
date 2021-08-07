/* eslint-disable no-undef */
import './styles.css';
import '../../styles/global.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import { postAutenticado, postNaoAutenticado } from '../../services/apiClient';
import useAuth from '../../hooks/useAuth';
import { schemaCadastrarProdutos } from '../../validacoes/schema';

export default function ProdutosNovo() {
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

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    console.log(data);

    try {
      const { dados, ok } = await postAutenticado('/produtos', data);
      console.log(data);
      if (!ok) {
        setErro(dados);
        console.log(erro);
        return;
      }
    } catch (error) {
      setErro(`Erro:${error.message}`);
    }
    setCarregando(false);
    // post direto so da url
    toast.success('Produto criado com sucesso', { toastId: customId });
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

  const uploadImagem = async (e) => {
    const { ID } = user;
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);

    const data = {
      nome: `${ID}/produto.jpg`,
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

  toast.error(errors.nome?.message, { toastId: customId });
  toast.error(errors.descricao?.message, { toastId: customId });
  toast.error(errors.preco?.message, { toastId: customId });

  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem px2rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Novo produto</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome</label>
            <input id="nomeRestaurante" type="text" {...register('nome', { required: true })} />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <input id="descricao" type="text" {...register('descricao', { required: true })} />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valor">Valor</label>
            <input id="valor" type="number" placeholder="00,00" {...register('preco', { required: true, valueAsNumber: true })} />
          </div>
          <actions className="ativarProdutos">
            <section>
              <label className="switch">
                <input type="checkbox" {...register('ativar')} defaultChecked="true" />
                <span className="slider round" />
                <span>ON</span>
              </label>
              <span className="ml1rem">Ativar produto</span>
            </section>

            <section>
              <label className="switch">
                <input type="checkbox" {...register('permitirObservacoes')} defaultChecked="true" />
                <span className="slider round" />
                <span>ON</span>
              </label>
              <span className="ml1rem">Permitir observações</span>
            </section>
          </actions>
          <div />
          <div className="acoesProdutos flexRow contentEnd gap2rem itemsCenter">

            <button id="btAddProduto" className="btLaranja mr2rem mb2rem mt2rem" type="submit" color="primary">
              Adicionar produto
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
