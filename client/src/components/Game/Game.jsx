import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import { ADD_SCORE, ADD_BADGE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { checkGame, checkScore, checkAccuracy } from '../../utils/helpers';

const Game = ({ sampleArr, unmount }) => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [wpm, setWpm] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [timer, setTimer] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const [addScore] = useMutation(ADD_SCORE);
    const [addBadge] = useMutation(ADD_BADGE);
    const { loading, data } = useQuery(QUERY_ME);
    const [modalIsOpen, setIsOpen] = useState(false);

    const userData = data?.me || [];

    // To run on component load
    useEffect(() => {
        const startGame = async () => {
            setTimeout(() => {
                document.getElementById('readyIcon').textContent = 2;
            }, 1000);
            setTimeout(() => {
                document.getElementById('readyIcon').textContent = 1;
            }, 2000);
            setTimeout(() => {
                document.getElementById('readyIcon').style.display = 'none';
                document.getElementById('sampleText').style.display = 'block';
                document.getElementById('gameInfo').style.display = 'block';
                document.getElementById(0).style.textDecoration = 'underline';
                if (Auth.loggedIn()) {
                    setLoggedIn(true);
                }
                toggleTimer();
                document.getElementById('gameInput').focus();
            }, 3000);
        };
        startGame();
        // To run when component unmounts
        return () => {
            setIsMounted(false);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update input value and wpm every time a character is typed
    useEffect(() => {
        if (isMounted) {
            updateError();
            updateAccuracy();
            updateUnderline();
            updateWpm();
        }
    });

    const handleChange = (evt) => {
        setInputText(evt.target.value);
        // Check if game is over
        if (inputText.length + 1 === sampleArr.length) {
            endGame();
        }
    };

    const toggleTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }
        const gameTimer = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
        setIntervalId(gameTimer);
    };

    const endGame = async () => {
        toggleTimer();
        console.log(userData);
        const newData = { wpm: wpm, accuracy: accuracy, time: timer, errors: errorCount };
        //check games played
        const gameCheck = checkGame(userData.gameCount + 1);
        //check wpm
        const scoreCheck = checkScore(newData.wpm);
        //check accuracy
        const accuracyCheck = checkAccuracy(newData.accuracy);
        console.log(gameCheck, scoreCheck, accuracyCheck)
        if (gameCheck) {
            await addBadge({ variables: gameCheck});
        }
        if (scoreCheck) {
            for (let i = 0; i < scoreCheck.length; i++) {
                console.log(scoreCheck[i])
                await addBadge({ variables: {badgeName: scoreCheck[i]}});
            }
        }
        if (accuracyCheck) {
            for (let i = 0; i < accuracyCheck.length; i++) {
                await addBadge({ variables: {badgeName: accuracyCheck[i]}});
            }
        }
        try {
            await addScore({ variables: { ...newData } });
        } catch (e) {
            console.error(e);
        }
        openModal();
    };

    // count errors and style accordingly
    const updateError = () => {
        let tmpErrorCount = 0;
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i] !== sampleArr[i]) {
                document.getElementById(i).style.color = 'red';
                setValidInput(false);
                tmpErrorCount++;
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
    const updateUnderline = () => {
        if (inputText.length > 0) {
            try {
                document.getElementById(inputText.length).style.textDecoration =
                    'underline';
                document.getElementById(
                    inputText.length - 1
                ).style.textDecoration = 'none';
                document.getElementById(
                    inputText.length + 1
                ).style.textDecoration = 'none';
            } catch {}
        } else {
            document.getElementById(0).style.textDecoration = 'underline';
            document.getElementById(1).style.textDecoration = 'none';
        }
    };

    //calculate and display accuracy
    const updateAccuracy = () => {
        if (isNaN(Math.abs((errorCount / inputText.length) * 100 - 100))) {
            setAccuracy(100);
        } else {
            const accuracy = Math.abs(
                (errorCount / inputText.length) * 100 - 100
            );
            setAccuracy(Math.round((accuracy + Number.EPSILON) * 100) / 100);
        }
    };

    //calculate and display WPM
    const updateWpm = () => {
        const grossWpm = Math.floor(inputText.length / 5);
        const netWpm = (grossWpm - errorCount) / (timer / 60);
        if (netWpm < 0 || isNaN(netWpm)) {
            setWpm(0);
        } else {
            setWpm(Math.round((netWpm + Number.EPSILON) * 100) / 100);
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        console.log('modal is now open');
    }

    function closeModal() {
        setIsOpen(false);
        unmount();
    }

    return (
        <div id="inputArea" className="m-4">
            {intervalId ? (
                <textarea
                    id="gameInput"
                    rows="4"
                    cols="50"
                    onChange={handleChange}
                    className="block border-2 w-full"
                    value={inputText}
                ></textarea>
            ) : (
                <></>
            )}
            {!validInput && (
                <p className="text-xl mx-auto my-4 w-fit">Incorrect!</p>
            )}
            <div id="gameInfo" className="mx-auto my-6 w-fit hidden">
                <p>Errors: {errorCount}</p>
                <p>Accuracy: {accuracy}%</p>
                <p>Time: {timer}</p>
                <p>WPM: {wpm}</p>
            </div>
            {/* <p id='readyMsg' className='mx-auto my-6 w-fit text-2xl'>Ready?</p> */}
            <div
                id="readyIcon"
                className="animate-bounce bg-gray-100 p-2 w-10 m-auto h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"
            >
                <p id="readyMsg" className="">
                    3
                </p>
            </div>
            {!loggedIn && (
                <p className="mx-auto my-6 w-fit">
                    Log in to save your scores!
                </p>
            )}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
            >
                <div id="modal-container" className="w-fit flex flex-col">
                    <button onClick={closeModal} className="text-right">
                        ❌
                    </button>
                    <div id="modal-info" className="p-10">
                        <p>Errors: {errorCount}</p>
                        <p>Accuracy: {accuracy}%</p>
                        <p>Time: {timer}</p>
                        <p>WPM: {wpm}</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Game;
