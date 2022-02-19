// Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

// Page imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LeaderBoard from './pages/LeaderBoard';
import Badges from './pages/Badges';

// Component imports
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

import { socket, SocketContext } from './contexts/socket';

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
    return (
        <SocketContext.Provider value={socket}>
            <ApolloProvider client={client}>
                <div className="flex flex-col min-h-screen">
                    <Router className="test">
                        <Header />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />
                            <Route
                                exact
                                path="/password-reset"
                                element={<ForgotPassword />}
                            />
                            <Route
                                exact
                                path="/dashboard"
                                element={<Dashboard />}
                            />
                            <Route
                                exact
                                path="/leaderboard"
                                element={<LeaderBoard />}
                            />
                            <Route exact path="/badges" element={<Badges />} />
                            <Route
                                exact
                                path="/profile/:username"
                                element={<Profile />}
                            />
                            <Route
                                render={() => (
                                    <h1 className="">
                                        You've Been 404'd! Oops...
                                    </h1>
                                )}
                            />{' '}
                            {/* To Do: Build out a custom 404 page */}
                        </Routes>
                        <Footer />
                    </Router>
                </div>
            </ApolloProvider>
        </SocketContext.Provider>
    );
}

export default App;
