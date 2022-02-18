import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_WEEKLY_SCORES } from '../../utils/queries';
import { formatTime } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const WeeklyLeaderBoard = () => {
    const { loading, data, refetch } = useQuery(QUERY_WEEKLY_SCORES);
    refetch();
    const leaderBoard = data?.weeklyScores.map((score) => {
        return {
            wpm: score.wpm,
            accuracy: score.accuracy,
            username: score.username,
            date: formatTime(score.createdAt),
        };
    });

    function Items({ leaderBoard, page }) {
        return (
            <>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map((score, i) => (
                            <tr key={uuid()}>
                                <td className="text-center p-2" key={uuid()}>
                                    {i + 1}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {score.wpm}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {i + page === 0 && (
                                        <img
                                            alt="1st place badge"
                                            className="inline m1"
                                            src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto.png"
                                        />
                                    )}{' '}
                                    {i + page === 1 && (
                                        <img
                                            alt="2nd place badge"
                                            className="inline m1"
                                            src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-2.png"
                                        />
                                    )}{' '}
                                    {i + page === 2 && (
                                        <img
                                            alt="3rd place badge"
                                            className="inline m1"
                                            src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-13.png"
                                        />
                                    )}
                                    <Link to={`/profile/${score.username}`}>
                                        {score.username}
                                    </Link>
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {score.accuracy}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {score.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                )}
            </>
        );
    }

    function PaginatedItems({ itemsPerPage }) {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(leaderBoard.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(leaderBoard.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % leaderBoard.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <table className="table-auto mx-auto">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>WPM</th>
                            <th>User</th>
                            <th>Accuracy</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <Items leaderBoard={currentItems} page={itemOffset} />
                </table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="m-auto w-1/3 flex p-2 justify-around pagination-nav"
                />
            </>
        );
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="w-3/4 mx-auto my-4">
            <h1 className="block text-center text-2xl underline text-gray-600 dark:text-gray-300">
                Weekly Leaderboard
            </h1>
            <PaginatedItems itemsPerPage={5} />
        </section>
    );
};

export default WeeklyLeaderBoard;
