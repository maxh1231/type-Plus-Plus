import BadgeList from "../components/BadgeList/BadgeList";
import { useQuery } from "@apollo/client";
import { QUERY_MYBADGE } from "../utils/queries";

const Badges = () => {
    const { loading, data } = useQuery(QUERY_MYBADGE);
    const userBadgeArr = data?.meBadges.badge || []
    
    // logging logged in users badges
    console.log(userBadgeArr);

    return (
        <BadgeList />
    )
}

export default Badges;