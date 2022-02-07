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
        let errorCount = 0;
        for (let i = 0; i < inputText.length; i++) {
            document.getElementById(i).style.textDecoration = 'underline';
            if (inputText[i] !== sampleArr[i]) {
                document.getElementById(i).style.color = 'red';
                console.log(`Wrong at position ${i}`);
                setValidInput(false);
                errorCount++
            } else {
                document.getElementById(i).style.color = 'green';
                setValidInput(true);
            }
        }
        for (let i = inputText.length; i < arrLength; i++) {
            document.getElementById(i).style.textDecoration = 'none';
            document.getElementById(i).style.color = 'black';
        }
        setErrorCount(errorCount);
        if (isNaN(Math.abs(errorCount / inputText.length * 100 - 100))) {
            setAccuracy(100);
        } else {
            setAccuracy(Math.abs(errorCount / inputText.length * 100 - 100));
        }
        // updateWpm();
    }

    function updateWpm() {
        setWpm((Math.floor(inputText.length / 5)) / (time / 60));
    }

    useEffect(() => {
        let elapsedTime = 0
        let interval = setInterval(() => {
            elapsedTime++
            setTimer(elapsedTime);
        }, 1000);
    }, []);

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