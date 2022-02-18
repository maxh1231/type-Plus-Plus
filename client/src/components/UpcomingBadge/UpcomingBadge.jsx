import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES } from '../../utils/queries';

const UpcomingBadge = (runGame) => {
    const { loading, data, refetch } = useQuery(QUERY_BADGES);

    useEffect(() => {
        refetch();
    }, [runGame]) // eslint-disable-line react-hooks/exhaustive-deps
    
    if (loading) {
        return <p>Loading...</p>
    }

    const badgeArr = data?.badges || [];
    const activeBadge = badgeArr[badgeArr.length - 1];

    return (
        <div className='container'>
            {badgeArr.length > 0 ? (
                <div className='border rounded-md p-2 w-fit m-auto'>
                    <p className='text-lg text-center border-b'>Unearned Badge:</p>
                    <img src={activeBadge.placeholder} className='mx-auto my-1' alt='unearned badge'></img>
                    <p className='text-center font-bold'>{activeBadge.badgeName}</p>
                    <p className='text-center'>{activeBadge.description}</p>
                </div>
            ) : (
                <p className="text-lg text-center">No badges yet!</p>
            )}
        </div>
    )
}

export default UpcomingBadge;