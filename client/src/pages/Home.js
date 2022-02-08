import React, { useEffect, useState } from 'react';
import Game from '../components/Game';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([])

    useEffect(() => {
        async function fetchData() {
            await getText(); 
        }
        fetchData();
    }, [])

    // make request to DeepAI
    const getText = async () => {
        const response = await fetch('http://localhost:3001/api/deepai', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json();
        // console.log(data.output);
        let tmpArr = data.output.split('');
        setSampleArr(tmpArr);
        return;
    } 

    const startGame = () => {
        setRunGame(true)
    }

    return (
        <main>
            <div>
                {sampleArr.length !== 0 ? (
                    sampleArr.map((char, i) => (
                        <span key={i} id={i}>{char}</span>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {!runGame && (
                <button onClick={startGame}>Start Game</button>
            )}
            {runGame && (
                <Game sampleArr={sampleArr}/>
            )}
        </main>
    )
}

export default Home;