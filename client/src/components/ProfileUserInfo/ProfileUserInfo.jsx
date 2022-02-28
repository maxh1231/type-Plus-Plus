import defaultPhoto from '../../assets/images/no-profile-picture.svg';
import { checkLevel, checkLevelBadge } from '../../utils/helpers';
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';

const ProfileUserInfo = ({ data }) => {
    let totalXP = 0;
    if (data) {
        data.user.badges.map((badge) => {
            totalXP += badge.xp;
            return totalXP;
        });
    }

    let averageWPM;
    if (data.scoresByUser.length !== 0) {
        let scoresArr = [];
        for (let i = 0; i < data.scoresByUser.length; i++) {
            scoresArr.push(data.scoresByUser[i].wpm);
        }
        const average = (array) =>
            scoresArr.reduce((a, b) => a + b) / scoresArr.length;
        averageWPM = average(scoresArr);
        averageWPM = Math.floor(averageWPM);
    }

    let userLevel = checkLevel(totalXP).userLevel
    let levelProgress = checkLevel(totalXP).levelProgress
    let levelIcon = checkLevelBadge(userLevel);

    return (
        <section className="w-[200px]">
            <CircularProgressbarWithChildren
                value={levelProgress}
                styles={buildStyles({
                    pathColor: '#35a2eb',
                    trailColor: '#94cbf1',
                })}
            >
                {data.user.profilePic && (
                    <img className="rounded-full w-[171px] h-[171px] object-cover" src={`../${data.user.profilePic}`} alt=""></img>
                )}
                {!data.user.profilePic && (
                    <img className="rounded-full w-[171px] h-[171px] object-cover" src={defaultPhoto} alt=""></img>
                )}
                <img className="w-[64px] h-[64px] absolute top-[158px]" src={levelIcon} alt="level icon"></img>
            </CircularProgressbarWithChildren>
            <div className="mt-5">
                <h3 className="text-2xl text-center">{data.user.username}</h3>
            </div>
            <div>
                <p className="text-lg text-center">{data.user.bio}</p>
            </div>
            <div className="mt-2">
                {data.scoresByUser[0] && (
                    <>   
                        <p className="text-lg text-center mt-2">
                            Highest WPM: {data.scoresByUser[0].wpm}
                        </p>
                        <p className="text-lg text-center mt-2">
                            Average WPM: {averageWPM}{' '}
                        </p>
                        <p className="text-lg text-center mt-2">
                            Games Played: {data.scoresByUser.length}{' '}
                        </p>
                    </>
                )}
                {!data.scoresByUser[0] && (
                    <p className="text-lg text-center mt-2">
                        This user has not completed any games
                    </p>
                )}
            </div>
            <div className="mt-2">
                {data.user.location && (
                    <p className="text-lg text-center">
                        Location: {data.user.location}{' '}
                    </p>
                )}
                {!data.user.location && (
                    <p className="text-lg text-center">No location set</p>
                )}
            </div>
        </section>
    );
};

export default ProfileUserInfo;
