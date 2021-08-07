/* eslint-disable no-use-before-define */
import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import illustrationTop from '../../assets/illustration-top.svg';
import CustomizedDialogs from '../../componentes/customDialog';
import ProdutosNovo from '../produtosNovo';
import UsuarioEditar from '../usuarioEditar/index';
import CustomCard from '../../componentes/customCard';
import useAuth from '../../hooks/useAuth';
import { get, del } from '../../services/apiClient';
import ProdutosEditar from '../produtosEditar';

export default function produtos() {
  const [cardapio, setCardapio] = useState([]);
  const { user, token, deslogar } = useAuth();
  const [prod, setProd] = useState([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const { dados, ok } = await get('/produtos', token);

      if (!ok) {
        console.log(dados);
        return;
      }
      setProd(dados);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removerProduto(id) {
    try {
      const dados = await del(`produtos/${id}`);

      setProd(dados);
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(prod);
  return (
    <div className="bodyProdutos">
      <div className="conteinerTopo contentCenter itemsCenter">
        <div className="flexRow contentBetween itemsCenter">
          <h1 className="nomeRestaurante">{user.NomeRestaurante}</h1>
          <Link className="logout" to="/login">Logout</Link>
        </div>
      </div>
      <img className="vetorProdutos" src={illustrationTop} alt="vetor" />
      <div className="avatarRestaurante">
        <CustomizedDialogs
          conteudo={<UsuarioEditar />}
        />
      </div>

      <div className={`${prod.length === 0 ? 'none' : 'contemProdutos'} flexColunm contentCenter itemsCenter mt2rem`}>
        <div className="contemBotao flexRow itemsCenter">
          <CustomizedDialogs
            btAbrirMensagem={<> Adicionar produto ao cardápio</>}
            btMensagem={<>Adicionar produto novo</>}
            conteudo={<ProdutosNovo />}
          />
        </div>

        <div className="conteinerCardapio flexRow gap2rem">
          { prod.map((produto) => (

            <div className="flip-card" item key={produto.id}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CustomCard
                    nome={produto.nome}
                    valor={produto.preco}
                    descricao={produto.descricao}
                    removerProduto={removerProduto}
                  />
                </div>
                <div className="flip-card-back">
                  <button className="btTransparente" type="button" onClick={removerProduto}>Excluir produto do catálogo</button>
                  {' '}
                  <CustomizedDialogs
                    btAbrirMensagem={<> Editar produto </>}
                    btMensagem={<>Atualizar produto </>}
                    conteudo={<ProdutosEditar />}
                  />
                  {/* TODO - botoes so ativam da metade pra direita */}
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      <div className={`${prod.length === 0 ? 'addProdutos' : 'none'} flexColunm contentCenter itemsCenter`}>
        <span>
          Você ainda não tem nenhum produto no seu cardápio.
          <br />
          Gostaria de adicionar um novo produto?
        </span>
        <CustomizedDialogs
          btAbrirMensagem={<> Adicionar produto ao cardápio</>}
          btMensagem={<>Adicionar produto novo</>}
          conteudo={<ProdutosNovo />}
        />
      </div>

    </div>
  );
}
