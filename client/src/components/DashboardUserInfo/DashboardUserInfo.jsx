import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import defaultPhoto from '../../assets/images/no-profile-picture.svg';

const DashboardUserInfo = ({ data, modalBio, image, setImage }) => {
    const level2 = 25;
    const level3 = 50;
    const level4 = 100;
    const level5 = 200;
    const level6 = 400;
    const level7 = 800;
    const level8 = 1600;
    const level9 = 2800;
    const level10 = 3200;


    let userLevel = 1
    let levelProgress

    let averageWPM;

    if (data.meScores.length !== 0) {
        let scoresArr = []
        for (let i = 0; i < data.meScores.length; i++) {
            scoresArr.push(data.meScores[i].wpm)
        }
        const average = (array) => scoresArr.reduce((a, b) => a + b) / scoresArr.length;
        averageWPM = average(scoresArr);
    }

    let totalXP = 70;
    // if (data) {
    //     data.meBadges.badges.map(badge => {
    //         totalXP += badge.xp
    //     })
    // }



    if (totalXP >= level2 && totalXP < level3) {
        userLevel = 2;
        levelProgress = (100 * totalXP) / level3;
    } else if (totalXP >= level3 && totalXP < level4) {
        userLevel = 3;
        levelProgress = (100 * totalXP) / level4;
    } else if (totalXP >= level4 && totalXP < level5) {
        userLevel = 4;
        levelProgress = (100 * totalXP) / level5;
    } else if (totalXP >= level5 && totalXP < level6) {
        userLevel = 5;
        levelProgress = (100 * totalXP) / level6;
    } else if (totalXP >= level6 && totalXP < level7) {
        userLevel = 6;
        levelProgress = (100 * totalXP) / level7;
    } else if (totalXP >= level7 && totalXP < level8) {
        userLevel = 7;
        levelProgress = (100 * totalXP) / level8;
    } else if (totalXP >= level8 && totalXP < level9) {
        userLevel = 8;
        levelProgress = (100 * totalXP) / level9;
    } else if (totalXP >= level9 && totalXP < level10) {
        userLevel = 9;
        levelProgress = (100 * totalXP) / level10;
    } else if (totalXP >= level10) {
        userLevel = 10;
        levelProgress = null;
    }

    console.log(userLevel)
    console.log(levelProgress);




    return (
        <section className="bg-gray-100 w-[300px]">
            <div className="flex justify-center">
                {data.me.profilePic && <img className="rounded-full w-[200px] h-[200px]" src={image} alt='' ></img>}
                {!data.me.profilePic && <img src={image} alt='' width='200' height='200'></img>}
            </div>
            <div className="mt-2">
                <h3 className="text-2xl text-center">Hello {data.me.username}</h3>
            </div>
            <div className="mt-2">
                {!modalBio && <p className="text-lg text-center">{data.me.bio}</p>}
                {modalBio && <p className="text-lg text-center">{modalBio}</p>}
            </div>
            <div className="mt-2">
                {data.meScores[0] && <p className="text-lg text-center mt-2">Highest WPM: {data.meScores[0].wpm}</p>}
                {!data.meScores[0] && <Link to='/'> Take a few tests to show your scores!</Link>}
                {data.meScores[0] && <p className="text-lg text-center mt-2">Average WPM: {averageWPM} </p>}
                {data.meScores[0] && <p className="text-lg text-center mt-2">Games Played: {data.meScores.length} </p>}
            </div>
            <div className="mt-2">
                {data.me.location && <p className="text-lg text-center">Location: {data.me.location} </p>}
                {!data.me.location && <p className="text-lg text-center">No location set</p>}
            </div>
        </section>
    )
}

export default DashboardUserInfo;