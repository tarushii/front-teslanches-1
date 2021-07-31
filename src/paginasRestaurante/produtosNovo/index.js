import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import fotoProduto from '../../assets/foto-produto.svg';
import CustomSwitch from '../../componentes/customSwitch';

export default function produtosNovo() {
  return (
    <div className="bodyProdutosDialog pa2rem ">
      <div className="formProdutos flexRow gap3rem ml2rem">
        <form autoComplete="off">
          <h1>Novo produto</h1>
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
        <div className="fotoProdutosNovo posRelative">
          <img src={fotoProduto} alt="foto do produto" />
          <div className="inputFile">
            <label htmlFor="file">
              Clique ou arraste
              para adicionar uma imagem
            </label>
            <input type="file" id="file" name="file" multiple />
          </div>

        </div>
      </div>

      <div className="acoesProdutos flexRow contentEnd contentCenter gap2rem itemsCenter">
        <Link to="/protudos">Cancelar</Link>
        <button className="btLaranja" type="submit">Adicionar produto novo</button>
      </div>
    </div>
  );
}
