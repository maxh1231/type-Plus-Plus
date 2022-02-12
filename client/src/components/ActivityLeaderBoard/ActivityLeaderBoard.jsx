import React from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_SCORE_COUNT } from '../../utils/queries';

const ActivityLeaderBoard = () => {
    const { loading, data } = useQuery(QUERY_SCORE_COUNT);

    const leaderBoard = data?.users
    console.log(leaderBoard);
    return (
        <>
            <h1 className='block text-center text-2xl'>Activity Leaderboard</h1>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>Games Played</th>
                        <th>User</th>
                    </tr>
                </thead>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map(user => (
                            <tr key={uuid()}>
                                <td key={uuid()}>{user.scoreCount}</td>
                                <td key={uuid()}>{user.username}</td>
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

export default ActivityLeaderBoard