import React, { useState } from 'react';

function Game() {
    const [validInput, setValidInput] = useState(true);
    let [errorCount, setErrorCount] = useState(0);
    const sampleText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vel consequuntur rerum distinctio exercitationem architecto ex debitis hic nobis necessitatibus cum animi, quod saepe maxime reprehenderit culpa nisi voluptates labore!";
    let sampleArr = sampleText.split('');
    const arrLength = sampleArr.length;
    function userInput(evt) {
        let input = evt.target.value;
        let count = 0;
        for (let i = 0; i < input.length; i++) {
            document.getElementById(i).style.textDecoration = 'underline';
            if (input[i] !== sampleArr[i]) {
                document.getElementById(i).style.color = 'red';
                console.log(`Wrong at position ${i}`);
                setValidInput(false);
                count++
            } else {
                document.getElementById(i).style.color = 'green';
                setValidInput(true);
            }
        }
        for (let i = input.length; i < arrLength; i++) {
            document.getElementById(i).style.textDecoration = 'none';
        }
        setErrorCount(count);
    }

    return (
        <div>
            {sampleArr.map((char, i) => (
                <span key={i} id={i}>{char}</span>
            ))}
            {/* <p>{sampleText}</p> */}
            {!validInput && 
                <p>Incorrect!</p>
            }
            <textarea id="gameInput" rows="4" cols="50" onChange={userInput} style={{ display: "block"}}></textarea>
            <p>Errors: {errorCount}</p>
        </div>
    )
}

export default Game;