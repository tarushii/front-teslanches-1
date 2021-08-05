import './styles.css';
import React, { useState } from 'react';
import '../../styles/global.css';
import { useForm } from 'react-hook-form';
import InputPassword from '../../componentes/inputPassword';
import CustomSwitch from '../../componentes/customSwitch';
import uploadIcon from '../../assets/upload-icon.svg';
import fotoProduto from '../../assets/foto-produto.svg';

export default function UsuarioEditar() {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [password, setPassword] = useState('');
  const [tryPassword, setTryPassword] = useState('');
  const { register, handleSubmit } = useForm();

  return (
    <div className="flexColumn">
      <div className="formProdutos flexRow gap3rem ml2rem">
        <form autoComplete="off">
          <h1>Editar Perfil</h1>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeUsuario">Nome de Usuario</label>
            <input id="nomeUsuario" type="text" />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="email">Email</label>
            <input id="email" type="text-field" />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="nomeRestaurante">Nome do Restaurante</label>
            <input id="nomeRestaurante" type="text-field" />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="categorias">Categoria do Restaurante</label>
            <select className="categoria-restaurante" name="categoria" id="categorias" placeholder="Escolha uma categoria">
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
            <textarea id="descricao" rows="3" cols="40"> </textarea>
            <span className="mr06rem">Máx.: 50 caracteres</span>
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="taxaDeEntrega">Taxa de Entrega</label>
            <input id="taxaDeEntrega" type="text-field" />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="tempoDeEntrega">Tempo Estimado de entrega</label>
            <input id="tempoDeEntrega" type="text-field" />
          </div>
          <div className="flexColunm mb1rem ">
            <label htmlFor="valorMinimoPedido">Valor minimo do pedido</label>
            <input id="valorMinimoPedido" type="currency" placeholder="00,00" />
          </div>
          <div className="flexColunm mb1rem ">
            <InputPassword
              id="senha"
              label="Senha"
              register={() => register('senha', { required: true, minLength: 8 })}
              value={password}
              setValue={setPassword}
            />
            <InputPassword
              id="senhaRepetida"
              label="Repita a senha"
              value={tryPassword}
              setValue={setTryPassword}
            />
          </div>
        </form>
        <div className="fotoProdutosNovo posRelative">
          <img src={fotoProduto} alt="foto do restaurante" />
          <label htmlFor="fileNew" className="fileNew" />
          <input type="file" id="fileNew" name="file" multiple />
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
