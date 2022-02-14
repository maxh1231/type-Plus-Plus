import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MYBADGE } from '../../utils/queries';

const RecentBadge = () => {
    const { loading, data } = useQuery(QUERY_MYBADGE);
    const badgeArr = data?.meBadges.badges || [];
    // const currBadge = Math.max(...badgeArr.map(badge => badge.createdAt), 0)
    const activeBadge = badgeArr[badgeArr.length - 1];
    console.log(badgeArr, activeBadge);
    return (
        <div className='container'>
            {badgeArr.length > 0 ? (
                <div className='border rounded-md p-2 m-1 w-fit'>
                    <p className='text-lg text-center border-b'>Recent Badge:</p>
                    <img src={activeBadge.img} className='mx-auto my-1'></img>
                    <p className='text-center font-bold'>{activeBadge.badgeName}</p>
                    <p className='text-center'>{activeBadge.description}</p>
                </div>
            ) : (
                <p>No badges yes!</p>
            )}
        </div>
    )
};

export default RecentBadge;