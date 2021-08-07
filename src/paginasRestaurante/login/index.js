import './styles.css';
import '../../styles/global.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import illustrationCenter from '../../assets/illustration-center.svg';
import InputPassword from '../../componentes/inputPassword';
import { schemaLogin } from '../../validacoes/schema';
import { postNaoAutenticado } from '../../services/apiClient';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin)
  });
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();
  const { logar } = useAuth();
  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    console.log(data);
    try {
      const { dados, ok } = await postNaoAutenticado('/login', data);
      setCarregando(false);
      console.log(dados);
      if (!ok) {
        setErro(dados);
        console.log(erro);
        return;
      }

      logar(dados.usuario, dados.tokenUsuario);

      history.push('/produtos');
    } catch (error) {
      setErro(`Erro:${error.message}`);
    }
    setCarregando(false);
  }
  toast.error(errors.email?.message);
  toast.error(errors.senha?.message);
  // TODO - toast duplicado nada na net me ajudou consertar
  return (
    <div className="bodyLogin">
      <div className="conteinerFormLogin">
        <div className="formLogin">
          <div className="flexRow mt2rem ml2rem selfStart">
            <h1>Login</h1>
          </div>

          <div className=" flexColunm mb1rem mt2rem">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flexColunm mb1rem">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" {...register('email', { required: true })} />

              </div>

              <InputPassword
                id="senha"
                label="Senha"
                register={() => register('senha', { required: true, minLength: 8 })}
                value={password}
                setValue={setPassword}

              />
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
