import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_FRIEND_SCORES } from '../../utils/queries';
import { formatTime } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const FriendLeaderBoard = ({ runGame }) => {
    const { loading, data, refetch } = useQuery(QUERY_FRIEND_SCORES);
    const myScore = data?.me.scores || [];
    
    useEffect(() => {
        refetch();
    }, [runGame]); // eslint-disable-line react-hooks/exhaustive-deps

    const myScoreArr = myScore.map((score) => {
        return {
            wpm: score.wpm,
            accuracy: score.accuracy,
            username: score.username,
            date: formatTime(score.createdAt),
        };
    });

    const friendsList = data?.me.friends || [];
    const friendScore = friendsList.map(friend => {
        return friend.scores
    })
    const friendScoreArr = []
    for (let i = 0; i < friendScore.length; i++) {
        for (let j = 0; j < friendScore[i].length; j++) {
            let tmp = friendScore[i];
            friendScoreArr.push({
                wpm: tmp[j].wpm,
                accuracy: tmp[j].accuracy,
                username: tmp[j].username,
                date: formatTime(tmp[j].createdAt),
            });
        }
    }

    const unsortedArr = myScoreArr.concat(friendScoreArr);
    const leaderBoardArr = unsortedArr.sort(function(a, b) {
        return b.wpm - a.wpm
    });

    function Items({ leaderBoard, page }) {
        return (
            <>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map((score, i) => (
                            <tr key={uuid()} className='even:bg-gray-200 dark:even:bg-mid-gray'>
                                <td className="text-center p-2" key={uuid()}>
                                    {i + page + 1}.
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {score.wpm}
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {i + page === 0 && (
                                        <img alt="1st place badge" className="inline m1" src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto.png"/>
                                    )}{' '}
                                    {i + page === 1 && (
                                        <img alt="2nd place badge" className="inline m1" src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-2.png"/>
                                    )}{' '}
                                    {i + page === 2 && (
                                        <img alt="3rd place badge" className="inline m1" src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-13.png"/>
                                    )}
                                    <Link to={`/profile/${score.username}`} className="text-gray-700 dark:text-gray-300 hover:text-theme-red dark:hover:text-theme-red transition-all duration-300">
                                        {score.username}
                                    </Link>
                                </td>
                                <td className="text-center p-2" key={uuid()}>
                                    {score.accuracy}
                                </td>
                                <td className="text-center p-2 hidden sm:block xl:hidden 2xl:block" key={uuid()}>
                                    {score.date}
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
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
            setCurrentItems(leaderBoardArr.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(leaderBoardArr.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % leaderBoardArr.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <table className="table-auto mx-auto text-gray-800 dark:text-gray-400  rounded overflow-hidden">
                    <thead>
                        <tr className='bg-gray-400 dark:bg-gray-900'>
                            <th className='p-2'>#</th>
                            <th className='p-2'>WPM</th>
                            <th className='p-2'>User</th>
                            <th className='p-2'>Accuracy</th>
                            <th className="p-2 hidden sm:block xl:hidden 2xl:block">
                                Date
                            </th>
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
                    className="m-auto flex p-2 justify-center pagination-nav"
                />
            </>
        );
    }

    if (loading) {
        return (
            <div className='m-auto text center w-fit pt-6'>
                <div className="inline-flex items-center w-fit px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-theme-blue transition ease-in-out duration-150">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
                Friends Leaderboard
            </h1>
            {friendScoreArr.length > 0 ? (
                <PaginatedItems itemsPerPage={10} />
            ) : (
                <p className='text-xl text-center'>Add some friends to see how you compare!</p>
            )}
        </section>
    );
};

export default FriendLeaderBoard;