import React, { useState } from 'react';

function Game() {
    const [validInput, setValidInput] = useState(true);
    
    const sampleText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vel consequuntur rerum distinctio exercitationem architecto ex debitis hic nobis necessitatibus cum animi, quod saepe maxime reprehenderit culpa nisi voluptates labore!"
    
    let sampleArr = sampleText.split('');

    function userInput(evt) {
        let input = evt.target.value
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== sampleArr[i]) {
                console.log(`Wrong at position ${i}`);
                setValidInput(false);
            } else {
                setValidInput(true);
            }
        }
    }

    return (
        <div>
            <p>{sampleText}</p>
            {!validInput && 
                <p>Incorrect!</p>
            }
            <textarea id="gameInput" rows="4" cols="50" onChange={userInput}></textarea>
        </div>
    )
}

export default Game;