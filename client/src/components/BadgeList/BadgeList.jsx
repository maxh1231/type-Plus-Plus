import React from 'react'
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES } from '../../utils/queries';

const BadgeList = () => {
    const { loading, data } = useQuery(QUERY_BADGES);

    const badgeArr = data?.badges || [];
    
    console.log(badgeArr)
    return (
        <section className='w-full'>
            <div className='container flex flex-wrap w-full'>
                    {badgeArr.map(badge => (
                        <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                            <img src={`.${badge.img}`} key={uuid()} className='m-auto'></img>
                            <p key={uuid()} className='p-1 text-center font-bold'>{badge.badgeName}</p>
                            <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default BadgeList;