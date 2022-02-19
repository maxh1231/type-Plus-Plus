// Imports
import React from 'react';

// Inspired by https://tailwind-elements.com/docs/standard/navigation/footer/

const Footer = () => {
    return (
        <footer className="text-center lg:text-left bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400 transition duration-200">
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                    <div className="flex justify-center">
                        <div className="w-7/12">
                            <h6 className="uppercase text-gray-800 font-semibold mb-4 flex items-center justify-center md:justify-start dark:text-gray-200">
                                Type++
                            </h6>
                            <p className="mb-4">
                                We developed this application as our capstone
                                project for the University of Utah's full-stack
                                web-development bootcamp.
                            </p>
                            <p>
                                Check out the{' '}
                                <a
                                    href="https://github.com/t-norm/type-Plus-Plus"
                                    className="underline hover:text-theme-red transition-all duration-300"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    application repository
                                </a>
                                !
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <h6 className="uppercase text-gray-800 font-semibold mb-4 flex justify-center md:justify-start dark:text-gray-200">
                                Stack
                            </h6>
                            <p className="mb-4">
                                <a
                                    href="https://www.mongodb.com/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    MongoDB
                                </a>
                            </p>
                            <p className="mb-4">
                                <a
                                    href="https://expressjs.com/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Express
                                </a>
                            </p>
                            <p className="mb-4">
                                <a
                                    href="https://reactjs.org/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    React
                                </a>
                            </p>
                            <p className="mb-4">
                                <a
                                    href="https://nodejs.org/en/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Node.js
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <h6 className="uppercase text-gray-800 font-semibold mb-4 flex justify-center md:justify-start dark:text-gray-200">
                                Resources
                            </h6>
                            <p className="mb-4">
                                <a
                                    href="https://tailwindcss.com/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Tailwind CSS
                                </a>
                            </p>
                            <p className="mb-4">
                                <a
                                    href="https://www.chartjs.org/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Chart.js
                                </a>
                            </p>
                            <p className="mb-4">
                                <a
                                    href="https://momentjs.com/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Moment
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://jwt.io/"
                                    className="text-gray-600 hover:text-theme-red transition-all duration-300 dark:text-gray-400 dark:hover:text-theme-red"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    JSON Web Token
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <h6 className="uppercase text-gray-800 font-semibold mb-4 flex justify-center md:justify-start dark:text-gray-200">
                                Find us on GitHub
                            </h6>
                            <p className="flex items-center justify-center md:justify-start mb-4 ">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="github"
                                    className="w-5 mr-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    ></path>
                                </svg>
                                <a
                                    href="https://github.com/Thenlie"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-theme-red transition-all duration-300"
                                >
                                    Leithen Crider
                                </a>
                            </p>
                            <p className="flex items-center justify-center md:justify-start mb-4 ">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="github"
                                    className="w-5 mr-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    ></path>
                                </svg>
                                <a
                                    href="https://github.com/Thorulfr"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-theme-red transition-all duration-300"
                                >
                                    Benjamin Holt
                                </a>
                            </p>
                            <p className="flex items-center justify-center md:justify-start mb-4 ">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="github"
                                    className="w-5 mr-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    ></path>
                                </svg>
                                <a
                                    href="https://github.com/maxh1231"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-theme-red transition-all duration-300"
                                >
                                    Max Humpherys
                                </a>
                            </p>
                            <p className="flex items-center justify-center md:justify-start mb-4 ">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="github"
                                    className="w-5 mr-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    ></path>
                                </svg>
                                <a
                                    href="https://github.com/t-norm"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-theme-red transition-all duration-300"
                                >
                                    Tyler Norman
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-800 p-4 bg-mid-gray dark:text-gray-500">
                © 2022{' '}
                <a
                    className="hover:text-theme-red transition-all duration-300"
                    // Update this link
                    href="https://www.youtube.com/watch?v=qHAHEhhJisk"
                    target="_blank"
                    rel="noreferrer"
                >
                    Team Kickass
                </a>
            </div>
        </footer>
    );
};

export default Footer;
