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
        return <p>Loading...</p>;
    }

    const badgeArr = data?.meBadges.badges || [];
    const activeBadge = badgeArr[badgeArr.length - 1];

    return (
        <div className="flex justify-center transition-all duration-200 h-60">
            {badgeArr.length > 0 ? (
                <div className="block rounded-lg w-44 shadow-sm border max-w-sm text-center dark:border-gray-400">
                    <div className="py-3 px-6 text-lg border-b dark:border-gray-400 bg-gray-100 dark:bg-gray-900 rounded-t-lg">
                        Recent Badge
                    </div>
                    <img
                        src={activeBadge.img}
                        className="mx-auto my-1"
                        alt="recent badge"
                    ></img>
                    <div className="p-1">
                        <h5 className="text-lg mb-1">
                            {activeBadge.badgeName}
                        </h5>
                        <p className="mb-2">{activeBadge.description}</p>
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
                <p className="text-lg text-center">No badges yet!</p>
            )}
        </div>
    );
};

export default RecentBadge;
