import defaultPhoto from '../../assets/images/no-profile-picture.svg'

const ProfileUserInfo = ({ userData }) => {
    // console.log(userData)
    let averageWPM;
    // if (userData.scoresByUser.length !== 0) {
    //     let scoresArr = []
    //     for (let i = 0; i < userData.scoresByUser.length; i++) {
    //         scoresArr.push(userData.scoresByUser[i].wpm)
    //     }
    //     const average = (array) => scoresArr.reduce((a, b) => a + b) / scoresArr.length;
    //     averageWPM = average(scoresArr);
    // }
    return (
        <section>
            <div>
                <img src={defaultPhoto} alt='' width='100' height='100'></img>
            </div>
            <div>
                {/* <h3>{userData.user.username}</h3> */}
            </div>
            <div>
                <p>
                    {/* {userData.user.bio} */}
                </p>
            </div>
            <div>
                {/* {userData.scoresByUser[0] && <p>Highest WPM: {userData.scoresByUser[0].wpm}</p>}
                {!userData.scoresByUser[0] && <p>This user has not completed any games</p>}
                {userData.scoresByUser[0] && <p>Average WPM: {averageWPM} </p>}
                {userData.scoresByUser[0] && <p>Games Played: {userData.scoresByUser.length} </p>} */}
            </div>
            <div>
                {/* location */}
            </div>
            <div>
                {/* add friend functionality (incomplete) */}
            </div>
        </section>
    )
}

export default ProfileUserInfo;