import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MYBADGE } from '../../utils/queries';

const RecentBadge = ({ runGame }) => {
    const { loading, data, refetch } = useQuery(QUERY_MYBADGE);

    useEffect(() => {
        refetch();
    }, [runGame]); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return (
            <div className="m-auto text center w-fit pt-6">
                <div className="inline-flex items-center w-fit px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-theme-blue transition ease-in-out duration-150">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Loading...
                </div>
            </div>
        );
    }

    const badgeArr = data?.meBadges.badges || [];
    const activeBadge = badgeArr[badgeArr.length - 1];

    return (
        <div className="flex justify-center transition-all duration-200 h-60">
            {badgeArr.length > 0 ? (
                <div className="block rounded-lg w-44 shadow-sm border max-w-sm text-center dark:border-gray-400">
                    <div className="py-3 text-center text-lg border-b dark:border-gray-400 bg-gray-100 dark:bg-gray-900 rounded-t-lg">
                        Recent Badge
                    </div>
                    <div className="h-[9.5rem] overflow-auto">
                        <img
                            src={activeBadge.img}
                            className="m-auto"
                            alt="recent badge"
                        ></img>
                        <div className="px-1 ">
                            <h5 className="text-lg font-bold">
                                {activeBadge.badgeName}
                            </h5>
                            <p className="pb-1">{activeBadge.description}</p>
                        </div>
                    </div>
                    <div className="p-1 border-t dark:border-gray-400">
                        <Link
                            to="/badges"
                            className="hover:text-theme-red dark:hover:text-theme-red transition-all duration-300"
                        >
                            View all badges
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col rounded-lg w-44 shadow-sm border max-w-sm text-center dark:border-gray-400">
                    <div className="py-3 text-center text-lg border-b dark:border-gray-400 bg-gray-100 dark:bg-gray-900 rounded-t-lg">
                        Recent Badge
                    </div>
                    <div className="p-1 grow">
                        <p className="my-1 p-1">
                            You haven't earned any badges yet! Click below to
                            see how you can earn some.
                        </p>
                    </div>
                    <div className="p-1 border-t dark:border-gray-400">
                        <Link
                            to="/badges"
                            className="hover:text-theme-red dark:hover:text-theme-red transition-all duration-300"
                        >
                            View all badges
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentBadge;
