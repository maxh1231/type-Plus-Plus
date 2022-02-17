import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import { formatTime } from '../../utils/helpers'


const Highscore = () => {
    const { loading, data } = useQuery(QUERY_ME)

    return (
        <section>
            <div>
                <h3 className="text-center">Your Highest Scores</h3>
            </div>
            <div>
                {data.meScores[0] &&
                    <ol>
                        <li className="text-center mt-1">{data.meScores[0].wpm} WPM on {formatTime(data.meScores[0].createdAt)}</li>
                        <li className="text-center mt-1">{data.meScores[1].wpm} WPM on {formatTime(data.meScores[1].createdAt)}</li>
                        <li className="text-center mt-1">{data.meScores[2].wpm} WPM on {formatTime(data.meScores[2].createdAt)}</li>
                    </ol>}
            </div>
        </section>
    )
}

export default Highscore