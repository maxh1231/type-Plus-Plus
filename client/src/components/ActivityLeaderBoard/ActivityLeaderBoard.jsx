import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_SCORE_COUNT } from '../../utils/queries';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const ActivityLeaderBoard = () => {
    const { loading, data, refetch } = useQuery(QUERY_SCORE_COUNT);
    refetch();
    const leaderBoard = data?.users;

    function Items({ leaderBoard, page }) {
        return (
            <>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map((user, i) => (
                            <tr key={uuid()}>
                                <td className="text-center p-2" key={uuid()}>
                                    {i + 1}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {user.gameCount}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    <Link to={`/profile/${user.username}`}>
                                        {user.username}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td className="text-center p-2">Loading...</td>
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
                            <th>Games Played</th>
                            <th>User</th>
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
                Activity Leaderboard
            </h1>
            <PaginatedItems itemsPerPage={5} />
        </section>
    );
};

export default ActivityLeaderBoard;
