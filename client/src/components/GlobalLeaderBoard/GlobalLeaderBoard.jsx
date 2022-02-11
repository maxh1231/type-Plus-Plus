import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SCORES } from '../../utils/queries';
import { formatTime } from '../../utils/helpers';

const GlobalLeaderBoard = () => {
    const { loading, data } = useQuery(QUERY_SCORES);

    const leaderboard = data?.scores.map(score => { return {wpm: score.wpm, accuracy: score.accuracy, username: score.username, date: formatTime(score.createdAt)} })
    console.log(leaderboard)

    return (
        <>
            <p>Global Leaderboard</p>
        </>
    )
}

export default GlobalLeaderBoard