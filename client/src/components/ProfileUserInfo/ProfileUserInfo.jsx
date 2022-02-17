import defaultPhoto from '../../assets/images/no-profile-picture.svg'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import { QUERY_FRIENDS } from '../../utils/queries'

const ProfileUserInfo = ({ data }) => {
    const level2 = 25;
    const level3 = 50;
    const level4 = 100;
    const level5 = 200;
    const level6 = 400;
    const level7 = 800;
    const level8 = 1600;
    const level9 = 2800;
    const level10 = 3200;

    let userLevel = 1;
    let levelProgress;
    let totalXP = 0;
    if (data) {
        data.user.badges.map(badge => {
            totalXP += badge.xp
        })
    }

    let averageWPM;
    if (data.scoresByUser.length !== 0) {
        let scoresArr = []
        for (let i = 0; i < data.scoresByUser.length; i++) {
            scoresArr.push(data.scoresByUser[i].wpm)
        }
        const average = (array) => scoresArr.reduce((a, b) => a + b) / scoresArr.length;
        averageWPM = average(scoresArr);
    }

    console.log(data);
    return (
        <section className="bg-gray-100 w-[300px]">
            <div className="flex justify-center">
                {data.user.profilePic && <img className="rounded-full w-[200px] h-[200px]" src={`../${data.user.profilePic}`} alt='' width='100' height='100'></img>}
                {!data.user.profilePic && <img className="rounded-full w-[200px] h-[200px]" src={defaultPhoto} alt='' width='100' height='100'></img>}
            </div>
            <div className="mt-2">
                <h3 className="text-2xl text-center">{data.user.username}</h3>
            </div>
            <div>
                <p className="text-lg text-center">
                    {data.user.bio}
                </p>
            </div>
            <div className="mt-2">
                {data.scoresByUser[0] && <p className="text-lg text-center mt-2">Highest WPM: {data.scoresByUser[0].wpm}</p>}
                {!data.scoresByUser[0] && <p className="text-lg text-center mt-2">This user has not completed any games</p>}
                {data.scoresByUser[0] && <p className="text-lg text-center mt-2">Average WPM: {averageWPM} </p>}
                {data.scoresByUser[0] && <p className="text-lg text-center mt-2">Games Played: {data.scoresByUser.length} </p>}
            </div>
            <div className="mt-2">
                {data.user.location && <p className="text-lg text-center">Location: {data.user.location} </p>}
                {!data.user.location && <p className="text-lg text-center">No location set</p>}
            </div>
        </section >
    )
}

export default ProfileUserInfo;