import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Principal from './paginasRestaurante/principal';
import Entrar from './paginasRestaurante/entrar';
import Cadastrar from './paginasRestaurante/cadastrar';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Principal} />
        <Route path="/entrar" component={Entrar} />
        <Route path="/cadastrar" component={Cadastrar} />
      </Switch>
    </Router>
  );
}
