import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'regenerator-runtime/runtime';

import App from './components/App/App';
import client from './graphql';
import './styles/index';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app'),
);

module.hot.accept();
