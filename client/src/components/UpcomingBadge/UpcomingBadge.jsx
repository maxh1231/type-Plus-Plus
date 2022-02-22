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
    }, [runGame]); // eslint-disable-line react-hooks/exhaustive-deps

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
    let tmpArr = [...badgeArr];
    for (let i = 0; i < badgeArr.length; i++) {
        for (let j = 0; j < myBadgeArr.length; j++) {
            if (badgeArr[i]._id === myBadgeArr[j]._id) {
                const index = tmpArr.findIndex((x) => {
                    return x._id === badgeArr[i]._id;
                });
                tmpArr.splice(index, 1);
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
                return maxScore;
            case 'accuracy':
                return maxAccuracy;
            case 'streak':
                return streak;
            case 'age':
                return userAge;
            case 'secret':
                return 0;
            default:
                return 0;
        }
    };

    // const randomNum = Math.floor(Math.random() * tmpArr.length)
    const displayBadge = tmpArr[0];
    return (
        <div className="flex justify-center transition-all duration-200 h-60">
            {badgeArr.length > 0 ? (
                <div className="block rounded-lg w-44 shadow-sm border max-w-sm text-center dark:border-gray-400">
                    <div className="py-3 text-center text-lg border-b dark:border-gray-400 bg-gray-100 dark:bg-gray-900 rounded-t-lg">
                        Upcoming Badge
                    </div>
                    <div id="card" key={uuid()} className="px-2">
                        <img
                            src={`.${displayBadge.placeholder}`}
                            key={uuid()}
                            className="m-auto"
                            alt="badge"
                        ></img>
                        <p
                            key={uuid()}
                            className="px-1 text-center font-bold text-lg"
                        >
                            {displayBadge.badgeName}
                        </p>
                        <p key={uuid()} className="px-1 text-center italic">
                            {displayBadge.description}
                        </p>
                        <p>
                            Progress: {renderProgress(displayBadge.category)}/
                            {displayBadge.targetVal}
                        </p>
                        <div className="w-full rounded-full m-1 bg-gray-300">
                            <div
                                className="bg-theme-blue text-xs font-bold text-gray-700 text-center p-0.5 leading-none rounded-l-full"
                                style={{
                                    width: `${(renderProgress(displayBadge.category) /
                                        displayBadge.targetVal) *
                                        100
                                        }%`,
                                }}
                            >
                                {Math.floor(
                                    (renderProgress(displayBadge.category) /
                                        displayBadge.targetVal) *
                                    100
                                )}
                                %
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-center">No badges yet!</p>
            )}
        </div>
    );
};

export default UpcomingBadge;
