import React, { useState } from 'react';
import Game from '../components/Game';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const startGame = () => {
        setRunGame(true)
    }
    return (
        <main>
            {!runGame && (
                <button onClick={startGame}>Start Game</button>
            )}
            {runGame && (
                <Game />
            )}
        </main>
    )
}

export default Home;