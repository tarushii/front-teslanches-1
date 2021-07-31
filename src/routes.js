import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';

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

export default function Routes() {
  const [token, setToken] = useState('');

  function logar(novoToken) {
    setToken(novoToken);
  }

  function deslogar() {
    setToken('');
  }

  return (
    <AuthContext.Provider value={{ token, logar, deslogar }}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/cadastrar" component={Cadastrar} />
          <Route path="/produtos" exact component={produtos} />
          <Route path="/produtos/novo" exact component={produtosNovo} />
          <RotasProtegidas />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
