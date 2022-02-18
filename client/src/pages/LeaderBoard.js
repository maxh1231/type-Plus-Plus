import GlobalLeaderBoard from '../components/GlobalLeaderBoard/GlobalLeaderBoard';
import ActivityLeaderBoard from '../components/ActivityLeaderBoard/ActivityLeaderBoard';
import WeeklyLeaderBoard from '../components/WeeklyLeaderBoard/';
import React, { useState } from 'react';

const LeaderBoard = () => {
    const [activeBoard, setActiveBoard] = useState('global');

    return (
        <main className="flex-grow flex flex-col items-center text-gray-700 dark:text-gray-400 dark:bg-gray-800">
            <div className="grid grid-cols-3 container my-5">
                <p className="text-center">
                    <span
                        className="cursor-pointer  text-lg hover:text-theme-red transition-all duration-300"
                        onClick={() => setActiveBoard('global')}
                    >
                        Global
                    </span>
                </p>
                <p className="text-center">
                    <span
                        className="cursor-pointer  text-lg hover:text-theme-red transition-all duration-300"
                        onClick={() => setActiveBoard('weekly')}
                    >
                        Weekly
                    </span>
                </p>
                <p className="text-center">
                    <span
                        className="cursor-pointer  text-lg hover:text-theme-red transition-all duration-300"
                        onClick={() => setActiveBoard('games')}
                    >
                        Games Played
                    </span>
                </p>
            </div>
            <section className="flex-grow">
                {activeBoard === 'global' && (
                    <GlobalLeaderBoard displayCount={10} />
                )}
                {activeBoard === 'games' && <ActivityLeaderBoard />}
                {activeBoard === 'weekly' && <WeeklyLeaderBoard />}
            </section>
        </main>
    );
};

export default LeaderBoard;
