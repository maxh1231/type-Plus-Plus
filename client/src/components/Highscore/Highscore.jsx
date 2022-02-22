import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { formatTime } from '../../utils/helpers';
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

const Highscore = ({ runGame }) => {
    const { loading, data, refetch } = useQuery(QUERY_ME);

    useEffect(() => {
        refetch();
    }, [runGame]);

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

    let newArr = [];

    if (data.meScores.length > 3) {
        let tmpArr = [...data.meScores];
        newArr = tmpArr.splice(0, 9);
    } else if (data.meScores.length > 0) {
        newArr = [...data.meScores];
    }

    return (
        <section className="flex flex-col">
            <div>
                <h3 className="my-4 text-center text-2xl underline text-gray-600 dark:text-gray-300">
                    Your Highest Scores
                </h3>
            </div>
            <div className="flex-grow">
                {newArr.length === 0 ? (
                    <p className="text-center mt-1 text-lg">No scores yet!</p>
                ) : (
                    <ol>
                        {newArr.map((score) => (
                            <li className="text-center mt-1" key={uuid()}>
                                {score.wpm} WPM on {formatTime(score.createdAt)}
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </section>
    );
};

export default Highscore;
