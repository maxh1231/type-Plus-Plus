import GlobalLeaderBoard from '../components/GlobalLeaderBoard/GlobalLeaderBoard';
import ActivityLeaderBoard from '../components/ActivityLeaderBoard/ActivityLeaderBoard';
import WeeklyLeaderBoard from '../components/WeeklyLeaderBoard/';
import React, { useState } from 'react';

const LeaderBoard = () => {
    const [activeBoard, setActiveBoard] = useState('global');

    return (
        <main className="flex-grow flex flex-col items-center text-gray-700 dark:text-gray-400 dark:bg-gray-800">
            <div className="grid grid-cols-3 container mt-5 h-10 w-1/2 items-center">
                <p className={`text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x-2 border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'global' ? ('bg-inherit text-theme-red') : ('border-b-2')}`} onClick={() => setActiveBoard('global')}>
                    <span className="text-lg transition-all duration-300" >
                        Global
                    </span>
                </p>
                <p className={`text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x-2 border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'weekly' ? ('bg-inherit text-theme-red') : ('border-b-2')}`} onClick={() => setActiveBoard('weekly')}>
                    <span className="text-lg transition-all duration-300" >
                        Weekly
                    </span>
                </p>
                <p className={`text-center bg-mid-gray h-full pt-1 rounded-t-xl border-x-2 border-t-2 hover:text-theme-red hover:opacity-80 cursor-pointer ${activeBoard === 'games' ? ('bg-inherit text-theme-red') : ('border-b-2')}`} onClick={() => setActiveBoard('games')}>
                    <span className="text-lg transition-all duration-300" >
                        Games Played
                    </span>
                </p>
            </div>
            <section className="flex-grow border-x-2 border-b-2 rounded-b-xl mb-5">
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
