import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '@ds/components/Header';
import FixedContainer from '@ds/components/FixedContainer';

import Todos from '../components/todos/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <FixedContainer>
        <Switch>
          <Route path="/todos" component={Todos} />
          <Route>
            <Redirect to="/todos" />
          </Route>
        </Switch>
      </FixedContainer>
    </BrowserRouter>
  );
};

export default App;
