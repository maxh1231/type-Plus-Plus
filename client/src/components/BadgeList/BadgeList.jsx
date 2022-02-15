import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES, QUERY_MYBADGE, QUERY_ME } from '../../utils/queries';
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/outline';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BadgeList = () => {
    const [viewGrid, setViewGrid] = useState(true);
    const { loading, data } = useQuery(QUERY_BADGES);
    const myBadgeData = useQuery(QUERY_MYBADGE);
    const myData = useQuery(QUERY_ME);
    
    // Get all badges and user specific badges
    const badgeArr = data?.badges || [];
    const myBadgeArr = myBadgeData.data?.meBadges.badges || [];
    
    // Get specific user data
    const myDataArr = myData.data?.me || [];
    const gameCount = myDataArr.gameCount;
    const friendCount = myDataArr.friendCount;
    const maxScore = myDataArr.maxScore;
    const maxAccuracy = myDataArr.maxAccuracy;
    const userAge = myDataArr.age;

    // Get badges that have not been earned
    let tmpArr = [...badgeArr]
    for (let i = 0; i < badgeArr.length - 1; i++) {
        for (let j = 0; j < myBadgeArr.length; j++) {
            if (badgeArr[i]._id === myBadgeArr[j]._id) {
                tmpArr.splice(i, 1);
            }
        }
    }
    console.log({myData: myDataArr, badgeArr: badgeArr, tmpArr: tmpArr, myBadge: myBadgeArr})
    // Toggle display view
    const setGrid = () => {
        setViewGrid(true);
    };
    const setList = () => {
        setViewGrid(false);
    };

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
                return 0
            case 'age':
                return userAge
            case 'secret':
                return 0
            default:
                return 0
        }
    }

    return (
        <section className='w-full'>
            <div className='h-12 m-1 p-1'>
                <button className='m-2 float-right bg-gray-100' onClick={setGrid}><ViewGridIcon className='h-5 w-5 m-2 inline'/></button>
                <button className='m-2 float-right bg-gray-100' onClick={setList}><ViewListIcon className='h-5 w-5 m-2 inline'/></button>
            </div>
            {viewGrid ? (
                <div className='flex flex-wrap w-full'>
                    <div className='flex flex-wrap w-full'>
                        <p className='text-xl font-bold text-center w-full'>Earned</p>
                        {myBadgeArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto' alt='badge'></img>
                                <p key={uuid()} className='p-1 text-center font-bold'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-wrap w-full'>
                        <p className='text-xl font-bold text-center w-full'>Not Yet Earned</p>
                        {tmpArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.placeholder}`} key={uuid()} className='m-auto' alt='badge'></img>
                                <p key={uuid()} className='p-1 text-center font-bold'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                                <div className='w-20 h-20 m-auto'>
                                    <CircularProgressbar value={Math.round(renderProgress(badge.category)/badge.targetVal * 100)} text={`${Math.round(renderProgress(badge.category)/badge.targetVal * 100)}%`} />
                                </div>
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
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto p-2 inline border-r' alt='badge'></img>
                                <p key={uuid()} className='p-2 text-center font-bold inline'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-2 text-center italic inline'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className='w-full justify-center'>
                        <p className='text-xl font-bold m-2'>Not Yet Earned</p>
                        {tmpArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-2'>
                                <img src={`.${badge.placeholder}`} key={uuid()} className='m-auto p-2 inline border-r' alt='badge'></img>
                                <p key={uuid()} className='p-2 text-center font-bold inline'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-2 text-center italic inline'>{badge.description}</p>
                                <p>Progress: {renderProgress(badge.category)}/{badge.targetVal}</p>
                                <div className="w-full bg-gray-200 rounded-full">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: `${renderProgress(badge.category)/badge.targetVal * 100}%`}}>{Math.floor(renderProgress(badge.category)/badge.targetVal * 100)}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default BadgeList;