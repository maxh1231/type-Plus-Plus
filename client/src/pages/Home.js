// Imports
import React, { useEffect, useState } from 'react';
import Game from '../components/Game';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getText();
        };
        fetchData();
    }, []);

    // get random text
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
                        className="inline-block px-6 py-2.5 text-gray-800 font-medium uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg  active:shadow-lg transition duration-150 ease-in-out"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                )}
                {runGame && (
                    <>
                        <div id="sampleText" className="hidden m-4">
                            {sampleArr.length !== 0 ? (
                                sampleArr.map((char, i) => (
                                    <span key={i} id={i}>
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
        </main>
    );
};

export default Home;
