import React, { useState, useEffect } from 'react';

const Game = ({ sampleArr }) => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [time, setTimer] = useState(0);
    const [wpm, setWpm] = useState(0);
    
    // to run on component load
    useEffect(() => {
        async function startGame() {
            document.getElementById(0).style.textDecoration = 'underline';
            let elapsedTime = 0
            // create timer var
            let interval = setInterval(() => {
                elapsedTime++
                setTimer(elapsedTime);
            }, 1000);
        }
        startGame();
    }, []);

    // update input value and wpm every time a character is typed
    useEffect(() => {
        updateError();
        updateAccuracy();
        updateUnderline();
        updateWpm();
    });
    
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
            document.getElementById(inputText.length).style.textDecoration = 'underline';
            document.getElementById(inputText.length - 1).style.textDecoration = 'none';
            document.getElementById(inputText.length + 1).style.textDecoration = 'none';
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
        const netWpm = (grossWpm - errorCount) / (time / 60);
        if (netWpm < 0 || isNaN(netWpm)) {
            setWpm(0);
        } else {
            setWpm(netWpm);
        }
    }

    return (
        <div>
            {!validInput && 
                <p>Incorrect!</p>
            }
            <textarea id="gameInput" rows="4" cols="50" onChange={(evt) => setInputText(evt.target.value)} style={{ display: "block"}} value={inputText}></textarea>
            <p>Errors: {errorCount}</p>
            <p>Accuracy: {accuracy}%</p>
            <p>Time: {time}</p>
            <p>WPM: {wpm}</p>
        </div>
    )
}

export default Game;