import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

import Login from './paginasRestaurante/login';
import Cadastrar from './paginasRestaurante/cadastrar';
import produtos from './paginasRestaurante/produtos';

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/" />)}
    />
  );
}
export default function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/cadastrar" component={Cadastrar} />
          <RotasProtegidas>
            <Route path="/produtos" component={produtos} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
