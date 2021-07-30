import './styles.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import illustrationCenter from '../../assets/illustration-center.svg';
import InputPassword from '../../componentes/inputPassword';
import { schemaLogin } from '../../validacoes/schema';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin)
  });
  const [password, setPassword] = useState('');

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="bodyLogin">
      <div className="conteinerFormLogin">
        <div className="formLogin">
          <div className="flexRow mt2rem ml2rem selfStart">
            <h1>Login</h1>
          </div>

          <div className=" flexColunm mb1rem mt2rem">
            <form onSubmit={() => handleSubmit(onSubmit)}>
              <div className="flexColunm mb1rem">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" {...register('email', { required: true })} />
                <p>{errors.email?.message}</p>

              </div>

              <InputPassword
                id="senha"
                label="Senha"
                register={() => register('senha', { required: true, minLength: 8 })}
                value={password}
                setValue={setPassword}
              />
              <p>{errors.senha?.message}</p>
              <div className="flexRow contentCenter mt1rem mb1rem">
                <button className="btLaranja" type="submit"> Entrar </button>
              </div>
            </form>
            <div className="flexRow contentCenter mt2rem">
              <span className="mr06rem">Ainda não tem uma conta?</span>
              <Link to="/cadastrar">Cadastre-se</Link>
            </div>
          </div>
        </div>
        <img className="vetorLogin" src={illustrationCenter} alt="vetor" />
      </div>
    </div>
  );
}