// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

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
        document
            .getElementById('nav-list')
            .classList.toggle('navbar-nav-active');
        let navLinks = document.getElementsByClassName('nav-link');
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.toggle('nav-active');
        }
    };

    // Set the theme when user clicks on toggle switch
    const themeSetter = () => {
        const toggler = document.getElementById('toggle');
        console.log(toggler.checked);
        if (toggler.checked) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header>
            {/* Colored div to block the sliding links */}
            <div
                className="absolute w-16 h-10 left-0 top-4 bg-gray-100 z-10
            dark:bg-gray-900"
            ></div>
            {/* Actual navbar */}
            <nav className="relative w-full flex flex-wrap items-center justify-around py-4 bg-gray-100 text-gray-600 shadow-md dark:bg-gray-900 dark:text-gray-200">
                <div className="w-full grid grid-cols-3 px-6">
                    {/* Nav menu */}
                    <div className="flex flex-wrap">
                        <button
                            className="text-gray-700 w-10 h-10 relative focus:outline-none z-20 dark:text-gray-200"
                            onClick={hamburgerToggle}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger elements */}
                            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span
                                    id="hamburger-top"
                                    aria-hidden="true"
                                    className="block h-0.5 w-5 bg-current transition-all duration-200 -translate-y-1"
                                ></span>
                                <span
                                    id="hamburger-middle"
                                    aria-hidden="true"
                                    className="block h-0.5 w-5 bg-current transition-all duration-200"
                                ></span>
                                <span
                                    id="hamburger-bottom"
                                    aria-hidden="true"
                                    className="block h-0.5 w-5 bg-current transition-all duration-200 translate-y-1"
                                ></span>
                            </div>
                        </button>
                        {/* Nav links */}
                        <div className="flex-grow items-center">
                            <ul
                                id="nav-list"
                                className="navbar-nav flex pl-0 list-style-none mr-auto -translate-x-80 transition-all duration-200"
                            >
                                <li className="nav-item p-2">
                                    <Link
                                        to="/"
                                        className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item p-2">
                                    <Link
                                        to="/leaderboard"
                                        className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                    >
                                        Leaderboard
                                    </Link>
                                </li>
                                {Auth.loggedIn() ? (
                                    <>
                                        <li className="nav-item p-2">
                                            <Link
                                                to="/dashboard"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <a
                                                href="/"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
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
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <Link
                                                to="/signup"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                            >
                                                Sign Up
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    {/* Logo column */}
                    <div className="flex justify-center items-center text-2xl h-10">
                        {localStorage.theme === 'light' && (
                            <img
                                src="./assets/images/logo.svg"
                                alt="Text Plus Plus logo"
                                className="h-56"
                            />
                        )}
                        {localStorage.theme === 'dark' && (
                            <img
                                src="./assets/images/logo-dark.svg"
                                alt="Text Plus Plus logo"
                                className="h-56"
                            />
                        )}
                    </div>
                    {/* Dark mode switch */}
                    <div className="flex justify-end items-center">
                        {/* Inspired by https://daily-dev-tips.com/posts/creating-day-night-css-only-toggle-switch/ */}
                        {localStorage.theme === 'light' && (
                            <input
                                type="checkbox"
                                id="toggle"
                                className="hidden toggle--checkbox"
                                onClick={themeSetter}
                            />
                        )}
                        {localStorage.theme === 'dark' && (
                            <input
                                type="checkbox"
                                id="toggle"
                                className="hidden toggle--checkbox"
                                onClick={themeSetter}
                                defaultChecked
                            />
                        )}
                        <label
                            htmlFor="toggle"
                            className="toggle--label cursor-pointer flex relative w-[60px] h-[30px] rounded-full bg-theme-blue-light transition-all ease-in duration-300
                            before:w-[20px] before:h-[20px] before:top-[5px] before:left-[5px] before:absolute before:rounded-full before:bg-yellow-100
                            "
                        >
                            <span className="toggle--label-background"></span>
                        </label>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
