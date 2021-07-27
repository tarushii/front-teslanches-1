import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './paginasRestaurante/login';
import Cadastrar from './paginasRestaurante/cadastrar';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/cadastrar" component={Cadastrar} />
      </Switch>
    </Router>
  );
}
