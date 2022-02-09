// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

// Inspired by https://tailwind-elements.com/docs/standard/navigation/navbar/#

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const hamburgerToggle = () => {
        document
            .getElementById('hamburger-top')
            .classList.toggle('button-transform-top-active');
        document
            .getElementById('hamburger-middle')
            .classList.toggle('button-transform-middle-active');
        document
            .getElementById('hamburger-bottom')
            .classList.toggle('button-transform-bottom-active');
    };

    return (
        <header>
            <nav className="relative w-full flex flex-wrap items-center justify-around py-4 bg-gray-100 text-gray-600 shadow-md navbar navbar-expand-lg navbar-light hover:text-gray-800 focus:text-gray-800 ">
                <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                    <button
                        className="text-gray-500 w-10 h-10 relative focus:outline-none"
                        onClick={hamburgerToggle}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span
                                id="hamburger-top"
                                aria-hidden="true"
                                className="button-transform-top"
                            ></span>
                            <span
                                id="hamburger-middle"
                                aria-hidden="true"
                                className="button-transform-middle"
                            ></span>
                            <span
                                id="hamburger-bottom"
                                aria-hidden="true"
                                className="button-transform-bottom"
                            ></span>
                        </div>
                    </button>
                    <div
                        className="collapse navbar-collapse flex-grow items-center"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav flex pl-0 list-style-none mr-auto">
                            <li className="nav-item p-2">
                                <Link to="/" className="nav-link p-0">
                                    <h2>Home</h2>
                                </Link>
                            </li>
                            {Auth.loggedIn() ? (
                                <>
                                    <li className="nav-item p-2">
                                        <Link
                                            to="/dashboard"
                                            className="nav-link p-0"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item p-2">
                                        <a
                                            href="/"
                                            className="nav-link p-0"
                                            onClick={logout}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item p-2">
                                        <Link
                                            to="/login"
                                            className="nav-link p-0"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item p-2">
                                        <Link
                                            to="/signup"
                                            className="nav-link p-0"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
