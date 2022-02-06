import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Game from './components/Game';
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  return (
    <ApolloProvider client={client}>
      <Router>
        <Game />

        <>
          <Routes>
            <Route exact path='/signup' element={Signup()} />
            <Route exact path='/dashboard' element={<Dashboard image={image} setImage={setImage} url={url} setUrl={setUrl} />} />
            <Route exact path="/" component={Game} /> {/* <-- This needs to be changed to a page */}
            <Route render={() => <h1 className=''>You've Been 404'd! Oops...</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;