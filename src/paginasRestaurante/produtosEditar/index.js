/* eslint-disable no-undef */
import './styles.css';
import '../../styles/global.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import { get } from '../../services/apiClient';
import AuthContext from '../../context/AuthContext';

export default function ProdutosEditar() {
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

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    console.log(data);

    const dadosCompletos = { data, urlImagem };
    try {
      const { dados, ok } = await postAutenticado('/produtos', dadosCompletos);
      console.log(dadosCompletos);
      if (!ok) {
        setErro(dados);
        toast.error(erro);
        return;
      }
    } catch (error) {
      setErro(`Erro:${error.message}`);
    }
    setCarregando(false);
    // post direto so da url
    toast.success('O produto foi criado com sucesso');
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

    const { nome } = data;
    const imagem = { imagem: `${nome}` };
    await postNaoAutenticado('/delete', imagem);

    const { dados, ok } = await postNaoAutenticado('/upload', data);

    if (!ok) {
      return toast.error(dados);
    }
    setUrlImagem(dados);
    setCarregando(false);
    return toast.success('A imagem foi alterada');
  }

  useEffect(() => {
    setCarregando(true);
    async function carregarProduto() {
      const produtoInfo = await get(`/produtos/${idProduto}`, token);
      setProduto(produtoInfo);
    }

    carregarProduto();
    setCarregando(false);
  }, []);

  toast.error(errors.nome?.message);
  toast.error(errors.descricao?.message);
  toast.error(errors.preco?.message);

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
              defaultValue={produto.nome}
              {...register('nome')}
            />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              type="text-field"
              defaultValue={produto.descricao}
              {...register('nome')}
            />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              type="number"
              placeholder="00,00"
              defaultValue={produto.preco}
            />
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
