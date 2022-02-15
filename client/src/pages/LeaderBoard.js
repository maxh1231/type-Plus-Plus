import GlobalLeaderBoard from '../components/GlobalLeaderBoard/GlobalLeaderBoard';
import ActivityLeaderBoard from '../components/ActivityLeaderBoard/ActivityLeaderBoard';
import WeeklyLeaderBoard from '../components/WeeklyLeaderBoard/';

const LeaderBoard = () => {
    return (
        <main className="flex-grow">
            <GlobalLeaderBoard />
            <ActivityLeaderBoard />
            <WeeklyLeaderBoard />
        </main>
    );
};

export default LeaderBoard;
