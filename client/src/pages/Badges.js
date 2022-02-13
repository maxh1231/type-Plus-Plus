import BadgeList from "../components/BadgeList/BadgeList";
import { useQuery } from "@apollo/client";
import { QUERY_MYBADGE } from "../utils/queries";

const Badges = () => {
    const { loading, data } = useQuery(QUERY_MYBADGE);
    const userBadgeArr = data?.meBadges.badges || []
    const userBadgeCount = data?.meBadges.badgeCount || 0
    // logging logged in users badges
    console.log({badges: userBadgeArr, badgeCount: userBadgeCount});

    return (
        <BadgeList />
    )
}

export default Badges;