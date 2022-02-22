import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_BADGES, QUERY_MYBADGE, QUERY_ME } from '../../utils/queries';
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/outline';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BadgeList = ({view}) => {
    const [viewGrid, setViewGrid] = useState(true);
    const { loading, data, refetch } = useQuery(QUERY_BADGES);
    const myBadgeData = useQuery(QUERY_MYBADGE);
    const myData = useQuery(QUERY_ME);

    useEffect(() => {
        refetch();
        myBadgeData.refetch();
        myData.refetch();
    }, [view]) // eslint-disable-line react-hooks/exhaustive-deps

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
                return streak
            case 'age':
                return userAge
            case 'secret':
                return 0
            default:
                return 0
        }
    }

    if (loading) {
        return (
            <div className='m-auto text center w-fit pt-6'>
                <div className="inline-flex items-center w-fit px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-theme-blue transition ease-in-out duration-150">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                Loading...
                </div>
            </div>
        )
    }

    return (
        <section className='w-full'>
            <div className='h-12 m-1 p-4'>
                <button className='p-2 float-right bg-gray-100 dark:bg-gray-900' onClick={setGrid}><ViewGridIcon className={`h-5 w-5 inline ${viewGrid && 'stroke-theme-red'}`}/></button>
                <button className='p-2 float-right bg-gray-100 dark:bg-gray-900' onClick={setList}><ViewListIcon className={`h-5 f-2 inline ${!viewGrid && 'stroke-theme-red'}`}/></button>
            </div>
            {viewGrid ? (
                <div className='flex flex-wrap w-full p-4'>
                    <p className='text-xl font-bold text-center w-full text-gray-600 dark:text-gray-200 p-2'>Earned</p>
                    <div className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {myBadgeArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 w-full bg-gray-100 dark:bg-inherit shadow-md'>
                                <img src={`.${badge.img}`} key={uuid()} className='m-auto' alt='badge'></img>
                                <p key={uuid()} className='p-1 text-center font-bold dark:text-gray-200'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                            </div>
                        ))}
                    </div>
                    <p className='text-xl font-bold text-center w-full text-gray-600 dark:text-gray-200 p-2'>Unearned</p>
                    <div className='grid w-full grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {tmpArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 w-full flex flex-col justify-between bg-gray-100 dark:bg-inherit shadow-md'>
                                <img src={`.${badge.placeholder}`} key={uuid()} className='m-auto' alt='badge'></img>
                                <p key={uuid()} className='p-1 text-center font-bold dark:text-gray-200'>{badge.badgeName}</p>
                                <p key={uuid()} className='p-1 text-center italic'>{badge.description}</p>
                                <div className='w-20 h-20 m-auto bottom-0'>
                                    <CircularProgressbar value={Math.round(renderProgress(badge.category)/badge.targetVal * 100)} text={`${Math.round(renderProgress(badge.category)/badge.targetVal * 100)}%`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (                
                <div className='w-full p-4'>
                    <div className='w-full justify-center'>
                        <p className='text-xl font-bold m-2 text-gray-600 dark:text-gray-200'>Earned</p>
                        {myBadgeArr.map(badge => (
                            <div id='card' key={uuid()} className='flex border rounded-md p-2 m-4 bg-gray-100 dark:bg-inherit shadow-md'>
                                <img src={`.${badge.img}`} key={uuid()} className='p-2 h-max my-auto' alt='badge'></img>
                                <div className='p-1 border-l'>
                                    <p key={uuid()} className='p-2 font-bold block dark:text-gray-200'>{badge.badgeName}</p>
                                    <p key={uuid()} className='p-2 italic block'>{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='w-full justify-center'>
                        <p className='text-xl font-bold m-2 text-gray-600 dark:text-gray-200'>Not Yet Earned</p>
                        {tmpArr.map(badge => (
                            <div id='card' key={uuid()} className='border rounded-md p-2 m-4 bg-gray-100 dark:bg-inherit shadow-md'>
                                <div className='flex'>
                                    <img src={`.${badge.placeholder}`} key={uuid()} className='p-2 h-max my-auto' alt='badge'></img>
                                    <div className='p-1 border-l'>
                                        <p key={uuid()} className='p-2 font-bold block dark:text-gray-200'>{badge.badgeName}</p>
                                        <p key={uuid()} className='p-2 italic block'>{badge.description}</p>
                                    </div>
                                </div>
                                <p className='mt-2'>Progress: {renderProgress(badge.category)}/{badge.targetVal}</p>
                                <div className="w-full bg-gray-300 rounded-full">
                                    <div className="bg-theme-blue text-xs font-bold text-black text-center p-0.5 leading-none rounded-l-full" style={{width: `${renderProgress(badge.category)/badge.targetVal * 100}%`}}>{Math.floor(renderProgress(badge.category)/badge.targetVal * 100)}%</div>
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