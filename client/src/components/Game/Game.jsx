import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Game = ({ sampleArr, unmount }) => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [wpm, setWpm] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [timer, setTimer] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(true)
    const [addScore, { error }] = useMutation(ADD_SCORE);

    // to run on component load
    useEffect(() => {
        const startGame = async () => {
            setTimeout(() => {
                document.getElementById('readyMsg').style.display = 'none';
                document.getElementById('sampleText').style.display = 'block';
                document.getElementById('gameInfo').style.display = 'block';
                document.getElementById(0).style.textDecoration = 'underline';
                if (Auth.loggedIn()) {
                    setLoggedIn(true)
                }
                toggleTimer();
            }, 3000);
        };
        startGame();
        //when component unmounts
        return () => {
            setIsMounted(false);
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // update input value and wpm every time a character is typed
    useEffect(() => {
        if (isMounted) {
            updateError();
            updateAccuracy();
            updateUnderline();
            updateWpm();
        }
    });

    const handleChange = (evt) => {
        setInputText(evt.target.value)
        // check if game is over
        if (inputText.length + 1 === sampleArr.length) {
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

    const endGame = async () => {
        toggleTimer();
        const data = { wpm: wpm, accuracy: accuracy, time: timer, errors: errorCount }
        console.log(data);
        try {
            await addScore({ variables: { ...data }})
        } catch (e) {
            console.error(e);
        }
        const endGameFunc = () => {
            setTimeout(() => {
                unmount();
            }, 5000)
        }
        endGameFunc();
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
            {intervalId ? (
                <textarea id="gameInput" rows="4" cols="50" onChange={handleChange} className='block border-2 w-full' value={inputText}></textarea>
            ) : (
                <></>
            )}
            {!validInput && 
                <p className="text-xl mx-auto my-4 w-fit">Incorrect!</p>
            }
            <div id='gameInfo' className='mx-auto my-6 w-fit hidden'>
                <p>Errors: {errorCount}</p>
                <p>Accuracy: {accuracy}%</p>
                <p>Time: {timer}</p>
                <p>WPM: {wpm}</p>
            </div>
            <p id='readyMsg' className='mx-auto my-6 w-fit text-2xl'>Ready?</p>
            {!loggedIn &&
                <p className='mx-auto my-6 w-fit'>Log in to save your scores!</p>
            }
        </div>
    )
}

export default Game;

