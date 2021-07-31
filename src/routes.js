import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';
import Login from './paginasRestaurante/login';
import Cadastrar from './paginasRestaurante/cadastrar';
import produtos from './paginasRestaurante/produtos';
import produtosNovo from './paginasRestaurante/produtosNovo';

export const AuthContext = createContext();

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children
      : <Redirect to="/login" />)}
    />
  );
}

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/" />)}
    />
  );
}
export default function Routes() {
  const [token, setToken] = useState('');

  function logar(novoToken) {
    setToken(novoToken);
  }

  function deslogar() {
    setToken('');
  }

  return (

    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/cadastrar" component={Cadastrar} />
          <RotasProtegidas />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
