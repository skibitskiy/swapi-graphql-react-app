import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';

const serverURI = process.env.SERVER;
const client = new ApolloClient({
  uri: serverURI || 'http://localhost:1166/graphql',
  cache: new InMemoryCache({
    possibleTypes: {
      IResource: ['Film', 'People', 'Species', 'Vehicle', 'Starship', 'Planet']
    }
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
