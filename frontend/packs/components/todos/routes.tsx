import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import TodosContainer from './TodosContainer';

const routes = ({ match }: RouteComponentProps) => {
  return (
    <>
      <Route exact path={`${match.url}`}>
        <TodosContainer rootPath={match.url} />
      </Route>
    </>
  );
};

export default routes;
