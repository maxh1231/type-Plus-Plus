import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import Game from '../components/Game';
import Chart from '../components/Chart';
import GlobalLeaderBoard from '../components/GlobalLeaderBoard';
import RecentBadge from '../components/RecentBadge/RecentBadge';
import Auth from '../utils/auth';

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
        setTimeout(() => {
            setRunGame(true);
        }, 250);
    };

    const endGame = () => {
        setRunGame(false);
    };

    return (
        <main className="flex-grow flex flex-col content-around justify-evenly items-center">
            {/* Intro text */}
            <section className="container">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque orci mi, dapibus in volutpat ac, bibendum vel
                    dui. Duis lacinia odio tincidunt justo commodo, vel feugiat
                    elit molestie. Mauris ut convallis elit. Sed interdum, dui
                    faucibus faucibus consequat, odio magna ultricies neque, et
                    dictum nisi nisl et eros. Pellentesque posuere et metus in
                    accumsan. Ut mollis dui eu consectetur mattis. Nam tempor
                    consequat semper. Pellentesque consectetur consectetur urna.
                    Vestibulum interdum mauris justo, id vulputate enim iaculis
                    sit amet.
                </p>
                <p>
                    Donec quis felis sagittis, scelerisque ante sit amet,
                    bibendum neque. Nulla facilisi. Cras iaculis ex velit, nec
                    consectetur nulla suscipit eget. Ut imperdiet est quis ipsum
                    condimentum, non finibus arcu venenatis. Cras pretium
                    accumsan diam, in auctor dolor elementum ut. Mauris pulvinar
                    quam in ultrices suscipit. Donec laoreet mi nunc, vel
                    aliquet tortor convallis fermentum. Phasellus rhoncus auctor
                    nisi et vestibulum. Nam scelerisque ipsum quis urna posuere
                    condimentum. Nulla quis facilisis nulla. Sed lacinia
                    accumsan diam, id ultrices quam laoreet at. Sed sit amet
                    varius nibh. Nullam quis sodales lacus.
                </p>
            </section>
            <section className="m-4">
                {!runGame && (
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                        className="flex items-center justify-between px-6 py-2.5 text-gray-700 bg-mid-gray hover:bg-mid-gray-hover font-medium uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
                        onClick={startGame}
                    >
                        Start Game
                        <ArrowCircleRightIcon className="h-5 w-5 m-1 inline" />
                    </button>
                )}
                {runGame && (
                    <>
                        <div id="sampleText" className="hidden m-4 w-3/4">
                            {sampleArr.length !== 0 ? (
                                sampleArr.map((char, i) => (
                                    <span
                                        key={uuid()}
                                        id={i}
                                        className="text-2xl"
                                    >
                                        {char}
                                    </span>
                                ))
                            ) : (
                                <p>Loading...</p>
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
            <div className="grid grid-cols-3 container">
                <div className="">
                    <GlobalLeaderBoard />
                </div>
                <div className="col-span-2 bg-gray-400">Badge Progress</div>
            </div>
            {/* {loggedIn && <RecentBadge />} */}
        </main>
    );
};

export default Home;
