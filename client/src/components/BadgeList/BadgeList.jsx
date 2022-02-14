import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES, QUERY_MYBADGE } from '../../utils/queries';
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/outline';


const BadgeList = () => {
    const [viewGrid, setViewGrid] = useState(true);
    const { loading, data } = useQuery(QUERY_BADGES);
    const myBadgeData = useQuery(QUERY_MYBADGE);
    const badgeArr = data?.badges || [];
    const myBadgeArr = myBadgeData.data?.meBadges.badges || [];
    let tmpArr = [...badgeArr]
    for (let i = 0; i < badgeArr.length - 1; i++) {
        for (let j = 0; j < myBadgeArr.length; j++) {
            if (badgeArr[i]._id === myBadgeArr[j]._id) {
                tmpArr.splice(i, 1);
            }
        }
    }
    console.log(badgeArr, myBadgeArr, tmpArr)
    const setGrid = () => {
        setViewGrid(true);
    };
    const setList = () => {
        setViewGrid(false);
    };
    return (
        <section className='w-full'>
            <div className='h-12 m-1 p-1'>
                <button className='m-2 float-right bg-gray-100' onClick={setGrid}><ViewGridIcon className='h-5 w-5 m-2 inline'/></button>
                <button className='m-2 float-right bg-gray-100' onClick={setList}><ViewListIcon className='h-5 w-5 m-2 inline'/></button>
            </div>
            {viewGrid ? (
                <div className='flex flex-wrap w-full'>
                    <div className='flex flex-wrap w-full justify-center'>
                        <p className='text-xl font-bold text-center w-full'>Earned</p>
                        {myBadgeArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto'></img>
                                <p key={uuid()} className='p-1 text-center font-bold'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-wrap w-full justify-center'>
                        <p className='text-xl font-bold text-center w-full'>Not Yet Earned</p>
                        {tmpArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto'></img>
                                <p key={uuid()} className='p-1 text-center font-bold'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (                
                <div className='w-full'>
                    <div className='w-full justify-center'>
                        <p className='text-xl font-bold m-2'>Earned</p>
                        {myBadgeArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto p-2 inline border-r'></img>
                                <p key={uuid()} className='p-2 text-center font-bold inline'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-2 text-center italic inline'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className='w-full justify-center'>
                        <p className='text-xl font-bold m-2'>Not Yet Earned</p>
                        {tmpArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto p-2 inline border-r'></img>
                                <p key={uuid()} className='p-2 text-center font-bold inline'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-2 text-center italic inline'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default BadgeList;