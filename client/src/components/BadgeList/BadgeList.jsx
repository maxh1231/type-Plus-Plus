import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES } from '../../utils/queries';
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/outline';


const BadgeList = () => {
    const [viewGrid, setViewGrid] = useState(true);
    const { loading, data } = useQuery(QUERY_BADGES);
    const badgeArr = data?.badges || [];
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
                <div className='container flex flex-wrap w-full'>
                    {badgeArr.map(badge => (
                        <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                            <img src={`.${badge.img}`} key={uuid()} className='m-auto'></img>
                            <p key={uuid()} className='p-1 text-center font-bold'>{badge.badgeName}</p>
                            <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                        </div>
                    ))}
                </div>
            ) : (                
                <div className='container'>
                    {badgeArr.map(badge => (
                        <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                            <img src={`.${badge.img}`} key={uuid()} className='p-2 inline border-r-2'></img>
                            <p key={uuid()} className='p-2 inline text-center font-bold'>{badge.badgeName}</p>
                            <p key={uuid()} className='p-2 inline text-center italic'>{badge.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default BadgeList;