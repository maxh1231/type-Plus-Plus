import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import { ADD_SCORE, ADD_BADGE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { checkGame, checkScore, checkAccuracy } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const Game = ({ sampleArr, unmount, loggedIn }) => {
    const [inputText, setInputText] = useState('');
    const [validInput, setValidInput] = useState(true);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [wpm, setWpm] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isMounted, setIsMounted] = useState(true);
    const [modalBadge, setModalBadge] = useState(false);
    const [isCheater, setIsCheater] = useState(false);
    const [addScore] = useMutation(ADD_SCORE);
    const [addBadge] = useMutation(ADD_BADGE);
    const { loading, data } = useQuery(QUERY_ME);
    const [modalIsOpen, setIsOpen] = useState(false);

    const userData = data?.me || [];

    // To run on component load
    useEffect(() => {
        const startGame = async () => {
            setTimeout(() => {
                document.getElementById('readyMsg').textContent = 2;
            }, 1000);
            setTimeout(() => {
                document.getElementById('readyMsg').textContent = 1;
            }, 2000);
            setTimeout(() => {
                document.getElementById('readyIcon').style.display = 'none';
                document.getElementById('sampleText').style.display = 'block';
                document.getElementById('gameInfo').style.display = 'block';
                document.getElementById(0).style.textDecoration = 'underline';
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
            console.log(inputText.length)
            if (inputText.length === sampleArr.length) {
                console.log('hit end')
                updateError();
                updateUnderline();
                updateWpm();
                endGame();
                return;
            } else if (inputText.length > sampleArr.length) {
                console.log('hit cheat')
                catchCheater();
                return;
            } else {
                updateError();
                // updateAccuracy();
                updateUnderline();
                updateWpm();
            }
        }
    }, [inputText]);



    useEffect(() => {
        updateAccuracy();
    }, [errorCount])




    const handleChange = async (evt) => {
        setInputText(evt.target.value);
        console.log(evt.target.value.length)
        console.log(sampleArr.length)
        // Check if game is over
        // if (evt.target.value.length === sampleArr.length) {
        //     console.log('hit end')
        //     endGame();
        // } else if (evt.target.value.length > sampleArr.length) {
        //     console.log('hit cheat')
        //     catchCheater();
        // }
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
        let badgeData = []
        if (userData.length !== 0) {
            if (userData.badges.length > 0) {
                badgeData = [...userData.badges];
            }
        }
        const userBadges = badgeData.map(badge => badge.badgeName);
        const newData = { wpm: wpm, accuracy: accuracy, time: timer, errors: errorCount };
        // check for badges
        let addedBadge;
        const gameCheck = checkGame(userData.gameCount + 1);
        const scoreCheck = checkScore(newData.wpm);
        const accuracyCheck = checkAccuracy(newData.accuracy);
        
        let newBadgeArr = []

        if (gameCheck) {
            newBadgeArr.push(gameCheck)
        } if (scoreCheck) {
            let tmpArr = newBadgeArr
            newBadgeArr = tmpArr.concat(scoreCheck)
        } if (accuracyCheck) {
            let tmpArr = newBadgeArr
            newBadgeArr = tmpArr.concat(accuracyCheck)
        }
        
        // create array of new badges to add to the user
        let earnedBadges = newBadgeArr.filter(badge => !userBadges.includes(badge));

        if (loggedIn) {
            if (earnedBadges.length > 0) {
                for (let i = 0; i < earnedBadges.length; i++) {
                    addedBadge = await addBadge({ variables: { badgeName: earnedBadges[i] }})
                }
            }
            try {
                await addScore({ variables: { ...newData } });
            } catch (e) {
                console.error(e);
            }
        }
        if (addedBadge) {
            setModalBadge(addedBadge.data.addBadge)
        }
        openModal();
    };

    const catchCheater = () => {
        toggleTimer();
        setIsCheater(true);
        openModal();
    }

    // count errors and style accordingly
    const updateError = () => {
        let tmpErrorCount = 0;
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i] !== sampleArr[i]) {
                // add error styling
                document.getElementById(i).style.backgroundColor = 'rgba(191, 66, 66, 0.2)';
                document.getElementById(i).style.color = 'red';
                setValidInput(false);
                tmpErrorCount++;
            } else {
                // add correct styling
                document.getElementById(i).style.backgroundColor = 'rgba(63, 191, 66, 0.1)';
                document.getElementById(i).style.color = 'green';
                setValidInput(true);
            }
        }
        for (let i = inputText.length; i < sampleArr.length; i++) {
            document.getElementById(i).style.color = 'inherit';
            document.getElementById(i).style.backgroundColor = 'transparent';
            document.getElementById(i).style.textDecoration = 'none';
        }
        setErrorCount(tmpErrorCount)
    };

    // underline current character
    const updateUnderline = () => {
        if (inputText.length > 0) {
            try {
                document.getElementById(inputText.length).style.textDecoration = 'underline';
                document.getElementById(inputText.length).style.backgroundColor = 'rgba(100, 100, 100, 0.2)';
                document.getElementById(inputText.length - 1).style.textDecoration = 'none';
                document.getElementById(inputText.length - 1).style.backgroundColor = 'none';
                document.getElementById(inputText.length + 1).style.textDecoration = 'none';
                document.getElementById(inputText.length + 1).style.backgroundColor = 'transparent';
            } catch {}
        } else {
            document.getElementById(0).style.textDecoration = 'underline';
            document.getElementById(0).style.backgroundColor = 'rgba(100, 100, 100, 0.2)';
            document.getElementById(1).style.textDecoration = 'none';
            document.getElementById(1).style.backgroundColor = 'transparent';
        }
    };

    //calculate and display accuracy
    const updateAccuracy = () => {
        if (isNaN(Math.abs((errorCount / inputText.length) * 100 - 100))) {
            console.log(100)
            setAccuracy(100);
        } else {
            console.log(errorCount)
            const newAccuracy = Math.abs(
                (errorCount / inputText.length) * 100 - 100
            );
            console.log(newAccuracy)
            console.log(Math.round((newAccuracy + Number.EPSILON) * 100) / 100)
            setAccuracy(Math.round((newAccuracy + Number.EPSILON) * 100) / 100);
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

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
    }

    const closeModal = () => {
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
            <div
                id="readyIcon"
                className="animate-bounce bg-gray-100 p-2 w-10 m-auto h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"
            >
                <p id="readyMsg" className="text-gray-800">
                    3
                </p>
            </div>
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
                {!isCheater ? (
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
                        {modalBadge && 
                        <div className='m-auto text-center'>
                            <h2>You just earned:</h2>
                            <img src={modalBadge.img} className='m-auto' alt='badge img'></img>
                            <div>{modalBadge.badgeName}</div>
                            <div>{modalBadge.description}</div>
                        </div>
                        }
                        {!loggedIn && (
                            <div className="mx-auto my-6 w-fit">
                                <Link to='/signup'>
                                    Log in to save your scores!
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button onClick={closeModal} className="text-right">
                            ❌
                        </button>
                        <div>You cheated!!</div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Game;
