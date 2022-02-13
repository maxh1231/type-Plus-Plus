import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_BADGES } from '../../utils/queries';

const BadgeList = () => {
    const { loading, data } = useQuery(QUERY_BADGES);

    const badgeArr = data?.badges || [];
    
    console.log(badgeArr)
    return (
        <section>
            <div className='container flex flex-wrap'>
                {badgeArr.map(badge => (
                    <img src={`.${badge.img}`}></img>
                ))}
            </div>
        </section>
    )
}

export default BadgeList;