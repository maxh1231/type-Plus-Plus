import React, { useState, useEffect } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_SCORE } from '../utils/mutations'

const Game = ({ sampleArr }) => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [intervalId, setIntervalId] = useState(0);
    const [timer, setTimer] = useState(0);
    const [wpm, setWpm] = useState(0);

    // to run on component load
    useEffect(() => {
        document.getElementById(0).style.textDecoration = 'underline';
        toggleTimer();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // update input value and wpm every time a character is typed
    useEffect(() => {
            updateError();
            updateAccuracy();
            updateUnderline();
            updateWpm();
    });

    const handleChange = (evt) => {
        setInputText(evt.target.value)
        if (inputText.length + 1 === sampleArr.length) {
            console.log('STOP')
            toggleTimer();
            endGame();
        }
    }

    const toggleTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }
        const gameTimer = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);
        setIntervalId(gameTimer);
    };

    const endGame = () => {
        console.log({ wpm: wpm, accuracy: accuracy, time: timer, errors: errorCount })
    }

    // count errors and style accordingly
    function updateError() {
        let tmpErrorCount = 0;
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i] !== sampleArr[i]) {
                document.getElementById(i).style.color = 'red';
                setValidInput(false);
                tmpErrorCount++
            } else {
                document.getElementById(i).style.color = 'green';
                setValidInput(true);
            }
        }
        for (let i = inputText.length; i < sampleArr.length; i++) {
            document.getElementById(i).style.color = 'black';
        }
        setErrorCount(tmpErrorCount);
    };

    // underline current character
    function updateUnderline() {
        if (inputText.length > 0) {
            try {
                document.getElementById(inputText.length).style.textDecoration = 'underline';
                document.getElementById(inputText.length - 1).style.textDecoration = 'none';
                document.getElementById(inputText.length + 1).style.textDecoration = 'none';
            } catch {}
        } else {
            document.getElementById(0).style.textDecoration = 'underline';
            document.getElementById(1).style.textDecoration = 'none';
        }
    };

    //calculate and display accuracy
    function updateAccuracy() {
        if (isNaN(Math.abs(errorCount / inputText.length * 100 - 100))) {
            setAccuracy(100);
        } else {
            setAccuracy(Math.abs(errorCount / inputText.length * 100 - 100));
        }
    };
    
    //calculate and display WPM
    function updateWpm() {
        const grossWpm = (Math.floor(inputText.length / 5));
        const netWpm = (grossWpm - errorCount) / (timer / 60);
        if (netWpm < 0 || isNaN(netWpm)) {
            setWpm(0);
        } else {
            setWpm(netWpm);
        }
    }

    return (
        <div id='inputArea'>
            {!validInput && 
                <p>Incorrect!</p>
            }
            {intervalId ? (
                <textarea id="gameInput" rows="4" cols="50" onChange={handleChange} className='block border-2 w-full' value={inputText}></textarea>
            ) : (
                <p>Game Over</p>
            )}
            <div id='gameInfo' className='mx-auto my-2 w-fit'>
                <p>Errors: {errorCount}</p>
                <p>Accuracy: {accuracy}%</p>
                <p>Time: {timer}</p>
                <p>WPM: {wpm}</p>
            </div>
        </div>
    )
}

export default Game;

