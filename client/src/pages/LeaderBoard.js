import React, { useEffect, useState } from 'react';
import GlobalLeaderBoard from '../components/GlobalLeaderBoard/GlobalLeaderBoard';
import ActivityLeaderBoard from '../components/ActivityLeaderBoard/ActivityLeaderBoard';
import WeeklyLeaderBoard from '../components/WeeklyLeaderBoard/';
import FriendLeaderBoard from '../components/FriendLeaderBoard/FriendLeaderBoard';
import Auth from '../utils/auth';

const LeaderBoard = ({ currentPage, setCurrentPage }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (Auth.loggedIn()) {
            setLoggedIn(true);
        }
    }, [])
    useEffect(() => {
        setCurrentPage('Leaderboard')
    })

    const [activeBoard, setActiveBoard] = useState('global');

    return (
        <main className="flex-grow flex flex-col items-center text-gray-700 dark:text-gray-400 dark:bg-gray-800">
            <div className={`w-full grid ${loggedIn ? 'grid-cols-4' : 'grid-cols-3'} mt-5 h-10 items-center sm:w-5/6 md:w-2/3 lg:w-1/2`}>
                <p
                    className={`flex justify-center items-center text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x-2 border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'global'
                        ? 'bg-inherit text-theme-red'
                        : 'border-b-2'
                        }`}
                    onClick={() => setActiveBoard('global')}
                >
                    <span className="text-lg transition-all duration-300">
                        Global
                    </span>
                </p>
                <p
                    className={`flex justify-center items-center text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'weekly'
                        ? 'bg-inherit text-theme-red'
                        : 'border-b-2'
                        }`}
                    onClick={() => setActiveBoard('weekly')}
                >
                    <span className="text-lg transition-all duration-300">
                        Weekly
                    </span>
                </p>
                <p
                    className={`flex justify-center items-center text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x-2 border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'games'
                        ? 'bg-inherit text-theme-red'
                        : 'border-b-2'
                        }`}
                    onClick={() => setActiveBoard('games')}
                >
                    <span className="text-lg transition-all duration-300">
                        Games Played
                    </span>
                </p>
                {loggedIn && 
                    <p
                        className={`flex justify-center items-center text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x-2 border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'friends'
                            ? 'bg-inherit text-theme-red'
                            : 'border-b-2'
                            }`}
                        onClick={() => setActiveBoard('friends')}
                    >
                        <span className="text-lg transition-all duration-300">
                            Friends
                        </span>
                    </p>
                }
            </div>
            <section className="w-full grow border-b-2 border-x-2 rounded-b-xl mb-5 pt-5 sm:w-5/6 md:w-2/3 lg:w-1/2 ">
                {activeBoard === 'global' && (
                    <GlobalLeaderBoard
                        displayCount={10}
                        leaderboardPage={true}
                    />
                )}
                {activeBoard === 'games' && <ActivityLeaderBoard />}
                {activeBoard === 'weekly' && <WeeklyLeaderBoard />}
                {activeBoard === 'friends' && <FriendLeaderBoard />}
            </section>
        </main>
    );
};

export default LeaderBoard;
