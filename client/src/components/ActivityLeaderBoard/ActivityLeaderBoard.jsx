import React from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_SCORE_COUNT } from '../../utils/queries';
import { Link } from 'react-router-dom';

const ActivityLeaderBoard = () => {
    const { loading, data } = useQuery(QUERY_SCORE_COUNT);

    const leaderBoard = data?.users
    console.log(leaderBoard);
    return (
        <section className='w-3/4 mx-auto my-4'>
            <h1 className='block text-center text-2xl underline'>Activity Leaderboard</h1>
            <table className='table-auto mx-auto'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Games Played</th>
                        <th>User</th>
                    </tr>
                </thead>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map((user, i) => (
                            <tr key={uuid()}>
                                <td className='text-center p-2' key={uuid()}>{i + 1}</td>
                                <td className='text-center p-2' key={uuid()}>{user.scoreCount}</td>
                                <td className='text-center p-2' key={uuid()}><Link to={`/profile/${user.username}`}>{user.username}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td className='text-center p-2'>Loading...</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    )
}

export default ActivityLeaderBoard