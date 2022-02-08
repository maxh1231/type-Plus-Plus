import React, { useState, useEffect } from 'react';

const Game = () => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [time, setTimer] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [sampleString, setSampleString] = useState('')
    
    // to run on component load
    useEffect(() => {
        getText(); // Make a request to DeepAi
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
    
    // get sample text from DeepAI
    const getText = async () => {
        const response = await fetch('http://localhost:3001/api/deepai', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json();
        console.log(data.output);
        setSampleString(data.output);
    } 
        
    // hardcoded sample text 
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
            <p>Sample Text: {sampleString}</p>
        </div>
    )
}

export default Game;