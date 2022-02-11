import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Game from '../components/Game';
import Chart from '../components/Chart';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getText();
        };
        fetchData();
    }, []);

    // Get random text
    const getText = async () => {
        const response = await fetch('http://localhost:3001/api/txtgen');
        let data = await response.text();
        let tmpArr = data.split('');
        setSampleArr(tmpArr);
        return;
    };

    const startGame = () => {
        setRunGame(true);
    };

    const endGame = () => {
        setRunGame(false);
    };

    return (
        <main className="flex-grow flex flex-col content-around justify-evenly items-center">
            <section className="m-2">
                {!runGame && (
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                        className="inline-block px-6 py-2.5 text-gray-800 bg-mid-gray hover:bg-mid-gray-hover font-medium uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                )}
                {runGame && (
                    <>
                        <div id="sampleText" className="hidden m-4 w-3/4">
                            {sampleArr.length !== 0 ? (
                                sampleArr.map((char, i) => (
                                    <span key={uuid()} id={i} className='text-2xl'>
                                        {char}
                                    </span>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <Game sampleArr={sampleArr} unmount={endGame} />
                    </>
                )}
            </section>
            <div className="container">
                <Chart />
            </div>
        </main>
    );
};

export default Home;
