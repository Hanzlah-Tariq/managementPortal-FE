import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

import './assets/styles/app.scss';

import configureStore from './state/configureStore';
import Root from './Root';

export const store = configureStore();
export const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <BreadcrumbsProvider>
        <Root />
      </BreadcrumbsProvider>
    </Router>
  </Provider>
);

export default App;
