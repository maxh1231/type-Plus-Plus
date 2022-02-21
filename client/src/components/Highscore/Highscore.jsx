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
        return <p>Loading...</p>;
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
