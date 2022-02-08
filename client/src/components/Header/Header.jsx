import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-600 hover:text-gray-800 focus:text-gray-800">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                {Auth.loggedIn() ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <a href="/" onClick={logout}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
