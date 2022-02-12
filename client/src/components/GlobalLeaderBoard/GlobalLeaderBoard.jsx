import React from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_SCORES } from '../../utils/queries';
import { formatTime } from '../../utils/helpers';

const GlobalLeaderBoard = () => {
    const { loading, data } = useQuery(QUERY_SCORES);
    
    const leaderBoard = data?.scores.map(score => { return {wpm: score.wpm, accuracy: score.accuracy, username: score.username, date: formatTime(score.createdAt)} })

    return (
        <>
            <h1 className='block text-center text-2xl'>Global Leaderboard</h1>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>WPM</th>
                        <th>User</th>
                        <th>Accuracy</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map(score => (
                            <tr key={uuid()}>
                                <td key={uuid()}>{score.wpm}</td>
                                <td key={uuid()}>{score.username}</td>
                                <td key={uuid()}>{score.accuracy}</td>
                                <td key={uuid()}>{score.date}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </>
    )
}

export default GlobalLeaderBoard