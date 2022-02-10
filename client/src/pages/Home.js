import React, { useEffect, useState } from 'react';
import Game from '../components/Game';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getText();
        }
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
        <main className="flex-grow">
            <section className='m-2'>
                {!runGame && <button onClick={startGame} className='mx-auto my-6 block'>Start Game</button>}
                {runGame && (
                    <>
                        <div id='sampleText' className='hidden m-4'>
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