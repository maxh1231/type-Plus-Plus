import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'



const Highscore = () => {
    const { loading, data } = useQuery(QUERY_ME)

    if (!loading) {
        console.log(data);
    }
    return (
        <section>

        </section>
    )
}

export default Highscore