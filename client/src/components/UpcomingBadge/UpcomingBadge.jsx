import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES, QUERY_MYBADGE, QUERY_ME } from '../../utils/queries';

const UpcomingBadge = (runGame) => {
    const { loading, data, refetch } = useQuery(QUERY_BADGES);
    const myBadgeData = useQuery(QUERY_MYBADGE);
    const myData = useQuery(QUERY_ME);

    useEffect(() => {
        refetch();
    }, [runGame]) // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return <p>Loading...</p>
    }

    const badgeArr = data?.badges || [];
    const myBadgeArr = myBadgeData.data?.meBadges.badges || [];

    // Get specific user data
    const myDataArr = myData.data?.me || [];
    const gameCount = myDataArr.gameCount;
    const friendCount = myDataArr.friendCount;
    const maxScore = myDataArr.maxScore;
    const maxAccuracy = myDataArr.maxAccuracy;
    const userAge = myDataArr.age;
    const streak = myDataArr.streak;

    // Get badges that have not been earned
    let tmpArr = [...badgeArr]
    for (let i = 0; i < badgeArr.length; i++) {
        for (let j = 0; j < myBadgeArr.length; j++) {
            if (badgeArr[i]._id === myBadgeArr[j]._id) {
                const index = tmpArr.findIndex(x => {
                    return x._id === badgeArr[i]._id
                });
                tmpArr.splice(index, 1)
            }
        }
    }

    const renderProgress = (category) => {
        switch (category) {
            case 'games':
                return gameCount
            case 'friends':
                return friendCount
            case 'scores':
                return maxScore
            case 'accuracy':
                return maxAccuracy
            case 'streak':
                return streak
            case 'age':
                return userAge
            case 'secret':
                return 0
            default:
                return 0
        }
    }

    // const randomNum = Math.floor(Math.random() * tmpArr.length)
    const displayBadge = tmpArr[0];
    return (
        <div className='container'>
            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                <img src={`.${displayBadge.placeholder}`} key={uuid()} className='m-auto' alt='badge'></img>
                <p key={uuid()} className='p-1 text-center font-bold'>{displayBadge.badgeName}</p>
                <p key={uuid()} className='p-1 text-center italic'>{displayBadge.description}</p>
                <p>Progress: {renderProgress(displayBadge.category)}/{displayBadge.targetVal}</p>
                <div className="w-full bg-gray-200 rounded-full">
                    <div className="bg-blue-600 text-xs font-bold text-black text-center p-0.5 leading-none rounded-l-full" style={{ width: `${renderProgress(displayBadge.category) / displayBadge.targetVal * 100}%` }}>{Math.floor(renderProgress(displayBadge.category) / displayBadge.targetVal * 100)}%</div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingBadge;