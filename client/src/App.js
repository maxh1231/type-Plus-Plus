// Imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

// Page imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LeaderBoard from './pages/LeaderBoard';
import Badges from './pages/Badges';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound'

// Component imports
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';

const uploadLink = createUploadLink({
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
    link: ApolloLink.from([authLink, uploadLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    friends: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});

function App() {
    const [currentPage, setCurrentPage] = useState('Home')

    return (
        <ApolloProvider client={client}>
            <div className="flex flex-col min-h-screen">
                <Router className="test">
                    <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/signup" element={<Signup currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/dashboard" element={<Dashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/leaderboard" element={<LeaderBoard currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/badges" element={<Badges currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/profile/:username" element={<Profile currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/password-reset" element={<ForgotPassword currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                        <Route exact path="/notfound" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>
            </div>
        </ApolloProvider>
    );
}

export default App;
