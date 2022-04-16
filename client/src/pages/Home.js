// Imports
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import Game from '../components/Game';
import GlobalLeaderBoard from '../components/GlobalLeaderBoard';
import RecentBadge from '../components/RecentBadge/RecentBadge';
import Auth from '../utils/auth';
import Highscore from '../components/Highscore';
import UpcomingBadge from '../components/UpcomingBadge/UpcomingBadge';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getText();
        };
        fetchData();
        if (Auth.loggedIn()) {
            setLoggedIn(true);
        }
    }, []);

    // Get random text
    const getText = async () => {
        const response = await fetch('/api/txtgen');
        let data = await response.text();
        let tmpArr = data.split('');
        setSampleArr(tmpArr);
        return;
    };

    const startGame = () => {
        document.getElementById('welcome-text').classList.add('hidden');
        setTimeout(() => {
            setRunGame(true);
        }, 350);
    };

    const endGame = () => {
        setRunGame(false);
        document.getElementById('welcome-text').classList.remove('hidden');
    };

    return (
        <main className="flex-grow flex flex-col content-around justify-evenly items-center text-gray-700 dark:text-gray-400 dark:bg-gray-800 transition duration-200">
            {/* Intro text */}
            <section
                className="container grow flex flex-col justify-center p-3"
                id="welcome-text"
            >
                <p className="p-2 text-justify">
                    Welcome to Type++! Looking to test out your overpriced
                    custom keyboard? Wanna show off how much faster you can type
                    than your buddies? Need to find out your words-per-minute
                    speed for a job application? You’ve come to the right place!
                </p>
                <p className="p-2 text-justify">
                    Hit “Start Game” below to take a typing-speed test. If you
                    really want to experience everything Type++ has to offer,
                    though, create an account first – you’ll be able to save
                    your WPM and accuracy scores, track your improvement over
                    time, follow friends, compete in our leaderboards, and more!
                </p>
            </section>
            <section className="grow flex flex-col justify-center items-center m-4">
                {!runGame && (
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="flex items-center justify-between px-6 py-2.5 text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 font-medium uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg transition duration-300 ease-in-out"
                        onClick={startGame}
                    >
                        Start Game
                        <ArrowCircleRightIcon className="h-5 w-5 m-1 inline" />
                    </button>
                )}
                {runGame && (
                    <>
                        <div
                            id="sampleText"
                            className="hidden m-4 mx-auto w-3/4"
                        >
                            {sampleArr.length !== 0 ? (
                                sampleArr.map((char, i) => (
                                    <span
                                        key={uuid()}
                                        id={i}
                                        className="text-2xl pr-px"
                                    >
                                        {char}
                                    </span>
                                ))
                            ) : (
                                <div className="m-auto text center w-fit pt-6">
                                    <div className="inline-flex items-center w-fit px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-theme-blue transition ease-in-out duration-150">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </div>
                                </div>
                            )}
                        </div>
                        <Game
                            sampleArr={sampleArr}
                            unmount={endGame}
                            loggedIn={loggedIn}
                        />
                    </>
                )}
            </section>
            <div className="container flex flex-wrap justify-around">
                <div className="xl:w-1/3">
                    <GlobalLeaderBoard displayCount={5} runGame={runGame} />
                </div>
                {loggedIn && (
                    <>
                        <div className="xl:w-1/3 my-4 flex flex-col">
                            {loggedIn && (
                                <h1 className="block text-center text-2xl underline text-gray-600 dark:text-gray-300">
                                    Badge Progress
                                </h1>
                            )}
                            <div className="flex grow flex-wrap flex-col justify-around text-gray-600 dark:text-gray-400 my-6 sm:flex-row">
                                <div className="pb-4 sm:pr-6">
                                    {loggedIn && (
                                        <RecentBadge runGame={runGame} />
                                    )}
                                </div>
                                <div>
                                    {loggedIn && (
                                        <UpcomingBadge runGame={runGame} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="pb-10 xl:w-1/3">
                            {loggedIn && <Highscore runGame={runGame} />}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Home;
