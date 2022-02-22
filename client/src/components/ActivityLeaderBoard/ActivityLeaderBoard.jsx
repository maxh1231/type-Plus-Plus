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

    function compare(a, b) {
        if (a.gameCount < b.gameCount) {
            return 1
        }
        if (a.gameCount > b.gameCount) {
            return -1;
        }
        return 0;
    }

    let tempArr = []
    if (data) {
        tempArr = data.users.slice().sort(compare)
        console.log(tempArr);
    }


    function Items({ leaderBoard, page }) {
        return (
            <>
                {tempArr ? (
                    <tbody>
                        {tempArr.map((user, i) => (
                            <tr key={uuid()} className='even:bg-gray-200 dark:even:bg-mid-gray'>
                                <td className="text-center p-2" key={uuid()}>
                                    {i + 1}.
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {user.gameCount}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    <Link
                                        to={`/profile/${user.username}`}
                                        className="text-gray-700 dark:text-gray-300 hover:text-theme-red dark:hover:text-theme-red transition-all duration-300"
                                    >
                                        {user.username}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>
                                <div className='m-auto text center w-fit pt-6'>
                                    <div className="inline-flex items-center w-fit px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-theme-blue transition ease-in-out duration-150">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    Loading...
                                    </div>
                                </div>
                            </td>
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
                <table className="table-auto mx-auto text-gray-800 dark:text-gray-400  rounded overflow-hidden">
                    <thead>
                        <tr className='bg-gray-400 dark:bg-gray-900'>
                            <th className='p-2'>#</th>
                            <th className='p-2'>Games Played</th>
                            <th className='p-2'>User</th>
                        </tr>
                    </thead>
                    <Items leaderBoard={currentItems} page={itemOffset} />
                </table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="m-auto w-1/3 flex p-2 justify-around pagination-nav"
                />
            </>
        );
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
        <section className="mx-auto my-4">
            <h1 className="block my-4 text-center text-2xl underline text-gray-600 dark:text-gray-300">
                Activity Leaderboard
            </h1>
            <PaginatedItems itemsPerPage={10} />
        </section>
    );
};

export default ActivityLeaderBoard;
