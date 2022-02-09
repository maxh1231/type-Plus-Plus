import React, { useEffect, useState } from 'react';
import Game from '../components/Game';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([]);

    useEffect(() => {
        async function fetchData() {
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

    return (
        <main className="flex-grow">
            <section className='m-2'>
                <div id='sampleText'>
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
                {!runGame && <button onClick={startGame}>Start Game</button>}
                {runGame && <Game sampleArr={sampleArr} />}
            </section>
        </main>
    );
};

export default Home;
