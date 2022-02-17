import GlobalLeaderBoard from '../components/GlobalLeaderBoard/GlobalLeaderBoard';
import ActivityLeaderBoard from '../components/ActivityLeaderBoard/ActivityLeaderBoard';
import WeeklyLeaderBoard from '../components/WeeklyLeaderBoard/';
import React, { useState } from 'react';

const LeaderBoard = () => {
    const [activeBoard, setActiveBoard] = useState('global')
    
    return (
        <section>
            <div>
                <ol className='flex justify-around m-2'>
                    <p onClick={() => setActiveBoard('global')}>Global</p>
                    <p onClick={() => setActiveBoard('weekly')}>Weekly</p>
                    <p onClick={() => setActiveBoard('games')}>Games Played</p>
                </ol>
            </div>
            <main className="flex-grow">
                {activeBoard === 'global' && (
                    <GlobalLeaderBoard displayCount={10}/>
                )}
                {activeBoard === 'games' && (
                    <ActivityLeaderBoard />
                )}
                {activeBoard === 'weekly' && (
                    <WeeklyLeaderBoard />
                )}
            </main>
        </section>
    );
};

export default LeaderBoard;
