import React from 'react'
import { Link } from 'react-router-dom';
import defaultPhoto from '../../assets/images/no-profile-picture.svg';

const UserInfo = ({ data, modalBio }) => {

    let averageWPM;

    if (data.scoresByUser.length !== 0) {
        let scoresArr = []
        for (let i = 0; i < data.scoresByUser.length; i++) {
            scoresArr.push(data.scoresByUser[i].wpm)
        }
        const average = (array) => scoresArr.reduce((a, b) => a + b) / scoresArr.length;
        averageWPM = average(scoresArr);
    }

    return (
        <section>
            <div>
                <img src={defaultPhoto} alt='' width='100' height='100'></img>
            </div>
            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            <div>
                {!modalBio && <p>{data.me.bio}</p>}
                {modalBio && <p>{modalBio}</p>}
            </div>
            <div>
                {data.scoresByUser[0] && <p>Highest WPM: {data.scoresByUser[0].wpm}</p>}
                {!data.scoresByUser[0] && <Link to='/'> Take a few tests to show your scores!</Link>}
                {data.scoresByUser[0] && <p>Average WPM: {averageWPM} </p>}
                {data.scoresByUser[0] && <p>Games Played: {data.scoresByUser.length} </p>}
            </div>
            <div>
                <p>Location: United States </p>
            </div>
        </section>
    )
}

export default UserInfo;