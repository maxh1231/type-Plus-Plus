import React, { useState, useEffect } from 'react';

const Game = () => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [time, setTimer] = useState(0);
    const [wpm, setWpm] = useState(0);
        
    const sampleText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vel consequuntur rerum distinctio exercitationem architecto ex debitis hic nobis necessitatibus cum animi, quod saepe maxime reprehenderit culpa nisi voluptates labore!";
    let sampleArr = sampleText.split('');
    const arrLength = sampleArr.length;
    
    function userInput() {
        let tmpErrorCount = 0;
        // count errors and style accordingly
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i] !== sampleArr[i]) {
                document.getElementById(i).style.color = 'red';
                // console.log(`Wrong at position ${i}`);
                setValidInput(false);
                tmpErrorCount++
            } else {
                document.getElementById(i).style.color = 'green';
                setValidInput(true);
            }
        }
        for (let i = inputText.length; i < arrLength; i++) {
            document.getElementById(i).style.color = 'black';
        }
        setErrorCount(tmpErrorCount);
        // update accuracy
        if (isNaN(Math.abs(tmpErrorCount / inputText.length * 100 - 100))) {
            setAccuracy(100);
        } else {
            setAccuracy(Math.abs(tmpErrorCount / inputText.length * 100 - 100));
        }
        // underline next character
        if (inputText.length > 0) {
            document.getElementById(inputText.length).style.textDecoration = 'underline';
            document.getElementById(inputText.length - 1).style.textDecoration = 'none';
            document.getElementById(inputText.length + 1).style.textDecoration = 'none';
        } else {
            document.getElementById(0).style.textDecoration = 'underline';
            document.getElementById(1).style.textDecoration = 'none';
        }
    }

    function updateWpm() {
        setWpm((Math.floor(inputText.length / 5)) / (time / 60));
    }

    // to run on component load
    useEffect(() => {
        document.getElementById(0).style.textDecoration = 'underline';
        let elapsedTime = 0
        // create timer var
        let interval = setInterval(() => {
            elapsedTime++
            setTimer(elapsedTime);
        }, 1000);
    }, []);

    // update input value and wpm every time a character is typed
    useEffect(() => {
        userInput();
        updateWpm();
    });

    return (
        <div>
            {sampleArr.map((char, i) => (
                <span key={i} id={i}>{char}</span>
            ))}
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