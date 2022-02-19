import React, { useEffect } from 'react';
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
        <div className="flex justify-center transition-all duration-200">
            {badgeArr.length > 0 ? (
                <div className="block rounded-lg w-44 shadow-sm border max-w-sm text-center dark:border-gray-400">
                    <div className="py-3 px-6 text-lg border-b dark:border-gray-400">
                        Recent Badge
                    </div>
                    <img
                        src={activeBadge.img}
                        className="mx-auto my-1"
                        alt="recent badge"
                    ></img>
                    <div className="p-1">
                        <h5 className="text-lg mb-2">
                            {activeBadge.badgeName}
                        </h5>
                        <p className="mb-4">{activeBadge.description}</p>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-center">No badges yet!</p>
            )}
        </div>
    );
};

export default RecentBadge;
