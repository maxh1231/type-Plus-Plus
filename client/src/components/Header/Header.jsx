// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = ({ currentPage, setCurrentPage }) => {
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
        document.getElementById('nav-list').classList.toggle('max-h-[0px]');
        document.getElementById('nav-list').classList.toggle('max-h-[200px]');
        document.getElementById('toggle-container').classList.toggle('hidden');

        document.getElementById('menu-tag').classList.toggle('text-theme-red');
        let navLinks = document.getElementsByClassName('nav-link');
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.toggle('nav-active');
        }
    };

    // Set the theme when user clicks on toggle switch
    const themeSetter = () => {
        const toggler = document.getElementById('toggle');
        if (toggler.checked) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            document.getElementById('logo-image').src =
                '/assets/images/logo-dark.svg';
            document.getElementById('logo-image-mobile').src =
                '/assets/images/logo-dark.svg';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            document.getElementById('logo-image').src =
                '/assets/images/logo.svg';
            document.getElementById('logo-image-mobile').src =
                '/assets/images/logo.svg';
        }
    };

    return (
        <header id="nav-header">
            {/* Colored div to block the sliding links */}
            <div className="absolute w-full h-28 bg-gray-100 z-10 dark:bg-gray-900 transition duration-200 2xl:w-16 2xl:h-10 2xl:left-0 2xl:top-4"></div>
            {/* Actual navbar */}
            <nav className="w-full pt-4 pb-2 bg-gray-100 text-gray-600 shadow-md dark:bg-gray-900 dark:text-gray-200 transition duration-200 2xl:py-4">
                <div className="w-full 2xl:grid 2xl:grid-cols-3 px-6">
                    {/* Logo for mobile */}
                    <div className="flex justify-center items-center text-2xl h-10 2xl:hidden">
                        {localStorage.theme === 'light' && (
                            <img
                                src="/assets/images/logo.svg"
                                alt="Text Plus Plus logo"
                                className="h-12 z-20"
                                id="logo-image-mobile"
                            />
                        )}
                        {localStorage.theme === 'dark' && (
                            <img
                                src="/assets/images/logo-dark.svg"
                                alt="Text Plus Plus logo"
                                className="h-12 z-20"
                                id="logo-image-mobile"
                            />
                        )}
                    </div>
                    {/* Nav menu */}
                    <div className="flex flex-col items-center flex-wrap pt-2 2xl:pt-0 2xl:flex-row 2xl:items-start">
                        <div className="flex items-center">
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
                                        className="block h-0.5 w-5 bg-current transition-all duration-300 -translate-y-1 rounded-full"
                                    ></span>
                                    <span
                                        id="hamburger-middle"
                                        aria-hidden="true"
                                        className="block h-0.5 w-5 bg-current transition-all duration-300 rounded-full"
                                    ></span>
                                    <span
                                        id="hamburger-bottom"
                                        aria-hidden="true"
                                        className="block h-0.5 w-5 bg-current transition-all duration-300 translate-y-1 rounded-full"
                                    ></span>
                                </div>
                            </button>
                            <span
                                className="2xl:hidden relative mr-2 transition-all duration-300 z-20"
                                id="menu-tag"
                            >
                                Menu
                            </span>
                        </div>
                        {/* Nav links */}
                        <div>
                            <ul
                                id="nav-list"
                                className="navbar-nav max-h-[0px] flex flex-row flex-wrap justify-center pl-0 list-style-none mr-auto transition-all duration-300 -translate-y-44 2xl:-translate-x-full 2xl:translate-y-0 2xl:justify-start 2xl:h-full"
                            >
                                <li className="nav-item p-2">
                                    <Link
                                        onClick={() => setCurrentPage('Home')}
                                        to="/"
                                        className={`nav-link p-0 hover:text-theme-red transition-all duration-300  ${
                                            currentPage === 'Home' &&
                                            'text-theme-red opacity-1'
                                        }`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item p-2">
                                    <Link
                                        onClick={() =>
                                            setCurrentPage('Leaderboard')
                                        }
                                        to="/leaderboard"
                                        className={`nav-link p-0 hover:text-theme-red transition-all duration-300  ${
                                            currentPage === 'Leaderboard' &&
                                            'text-theme-red opacity-1'
                                        }`}
                                    >
                                        Leaderboard
                                    </Link>
                                </li>

                                {Auth.loggedIn() ? (
                                    <>
                                        <li className="nav-item p-2">
                                            <Link
                                                onClick={() =>
                                                    setCurrentPage('Badges')
                                                }
                                                to="/badges"
                                                className={`nav-link p-0 hover:text-theme-red transition-all duration-300 ${
                                                    currentPage === 'Badges' &&
                                                    'text-theme-red opacity-1'
                                                }`}
                                            >
                                                Badges
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <Link
                                                onClick={() =>
                                                    setCurrentPage('Dashboard')
                                                }
                                                to="/dashboard"
                                                className={`nav-link p-0 hover:text-theme-red transition-all duration-300 ${
                                                    currentPage ===
                                                        'Dashboard' &&
                                                    'text-theme-red opacity-1'
                                                }`}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <a
                                                onClick={() =>
                                                    setCurrentPage('Logout')
                                                }
                                                href="/"
                                                className={`nav-link p-0 hover:text-theme-red transition-all duration-300 ${
                                                    currentPage === 'Logout' &&
                                                    'text-theme-red opacity-1'
                                                }`}
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
                                                onClick={() =>
                                                    setCurrentPage('Login')
                                                }
                                                to="/login"
                                                className={`nav-link p-0 hover:text-theme-red transition-all duration-300 ${
                                                    currentPage === 'Login' &&
                                                    'text-theme-red opacity-1'
                                                }`}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <Link
                                                onClick={() =>
                                                    setCurrentPage('Signup')
                                                }
                                                to="/signup"
                                                className={`nav-link p-0 hover:text-theme-red transition-all duration-300 ${
                                                    currentPage === 'Signup' &&
                                                    'text-theme-red opacity-1'
                                                }`}
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
                    <div className="hidden 2xl:flex justify-center items-center text-2xl h-10">
                        {localStorage.theme === 'light' && (
                            <img
                                src="/assets/images/logo.svg"
                                alt="Text Plus Plus logo"
                                className="h-12"
                                id="logo-image"
                            />
                        )}
                        {localStorage.theme === 'dark' && (
                            <img
                                src="/assets/images/logo-dark.svg"
                                alt="Text Plus Plus logo"
                                className="h-12"
                                id="logo-image"
                            />
                        )}
                    </div>
                    {/* Dark mode switch */}
                    <div
                        id="toggle-container"
                        className="absolute hidden right-4 top-[4.33rem] transition-all duration-300 z-20 sm:top-[1.33rem] 2xl:static 2xl:flex 2xl:justify-end 2xl:items-center"
                    >
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
