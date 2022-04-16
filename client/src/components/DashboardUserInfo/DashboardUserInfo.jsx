import React from 'react';
import { Link } from 'react-router-dom';
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';
import { checkLevel, checkLevelBadge } from '../../utils/helpers';

const DashboardUserInfo = ({ data, modalBio, image }) => {
    let averageWPM;

    if (data.meScores.length !== 0) {
        let scoresArr = [];
        for (let i = 0; i < data.meScores.length; i++) {
            scoresArr.push(data.meScores[i].wpm);
        }
        const average = (array) =>
            scoresArr.reduce((a, b) => a + b) / scoresArr.length;
        averageWPM = average(scoresArr);
        averageWPM = Math.floor(averageWPM);
    }

    let totalXP = 0;
    if (data) {
        data.meBadges.badges.map((badge) => {
            totalXP += badge.xp;
            return totalXP;
        });
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
                <img className="rounded-full w-[171px] h-[171px] object-cover" src={image} alt="User avatar"></img>
                <img className="w-[64px] h-[64px] absolute top-[158px]" src={levelIcon} alt="level icon"></img>
            </CircularProgressbarWithChildren>

            <div className="mt-5">
                <h3 className="text-2xl text-center">{data.me.username}</h3>
            </div>
            <div className="mt-2">
                {!modalBio && <p className="text-center">{data.me.bio}</p>}
                {modalBio && <p className="text-center">{modalBio}</p>}
            </div>
            <div className="mt-2">
                {data.meScores[0] && (
                    <>
                        <p className="text-center mt-2">
                            Highest WPM: {data.meScores[0].wpm}
                        </p>
                        <p className="text-center mt-2">
                            Average WPM: {averageWPM}{' '}
                        </p>
                        <p className="text-center mt-2">
                            Games Played: {data.meScores.length}{' '}
                        </p>
                    </>
                )}
                {!data.meScores[0] && (
                    <Link to="/">
                        <p className="hover:text-theme-red text-center italic transition-all duration-300">
                            Take a few tests to show your scores!
                        </p>
                    </Link>
                )}
            </div>
            <div className="mt-2">
                {data.me.location && (
                    <p className="text-center">Location: {data.me.location} </p>
                )}
                {!data.me.location && (
                    <p className="text-center">No location set</p>
                )}
            </div>
        </section>
    );
};

export default DashboardUserInfo;
