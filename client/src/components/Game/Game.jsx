import React, { useState } from 'react';

function Game() {
    const [validInput, setValidInput] = useState(true);
    let [errorCount, setErrorCount] = useState(0);
    const sampleText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vel consequuntur rerum distinctio exercitationem architecto ex debitis hic nobis necessitatibus cum animi, quod saepe maxime reprehenderit culpa nisi voluptates labore!"
    
    let sampleArr = sampleText.split('');

    function userInput(evt) {
        let input = evt.target.value
        let count = 0
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== sampleArr[i]) {
                console.log(`Wrong at position ${i}`);
                setValidInput(false);
                count++
            } else {
                setValidInput(true);
            }
        }
        setErrorCount(count);
    }

    return (
        <div>
            {sampleArr.map((char, i) => (
                <span key={i}>{char}</span>
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