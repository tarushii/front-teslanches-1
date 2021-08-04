import './styles.css';
import '../../styles/global.css';
import fotoProduto from '../../assets/foto-produto.svg';
import uploadIcon from '../../assets/upload-icon.svg';
import CustomSwitch from '../../componentes/customSwitch';

export default function ProdutosEditar() {
  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem ml2rem">
        <form autoComplete="off">
          <h1>Editar produto</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome</label>
            <input id="nomeRestaurante" type="text" />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="descricao">Descrição</label>
            <input id="descricao" type="text-field" />
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valor">Valor</label>
            <input id="valor" type="currency" placeholder="00,00" />
          </div>
          <div className="ativarProdutos">
            <CustomSwitch label="Ativar produto" />
            <br />
            <CustomSwitch label="Permitir observações" />
          </div>
          <div />
        </form>
        <div className="fotoProdutosEditar posRelative">
          <img src={fotoProduto} alt="foto do produto" />
          <label htmlFor="fileEdit" className="fileEdit" />
          <input type="file" id="fileEdit" name="file" multiple />
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
