import GlobalLeaderBoard from "../components/GlobalLeaderBoard/GlobalLeaderBoard"
import ActivityLeaderBoard from "../components/ActivityLeaderBoard/ActivityLeaderBoard"
import WeeklyLeaderBoard from "../components/WeeklyLeaderBoard/"

const LeaderBoard = () => {
    return (
        <>
            <GlobalLeaderBoard />
            <ActivityLeaderBoard />
            <WeeklyLeaderBoard />
        </>
    )
}

export default LeaderBoard