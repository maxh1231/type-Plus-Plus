import { useEffect, useState } from 'react';
import BadgeList from '../components/BadgeList/BadgeList';

const Badges = () => {
    const [view, setView] = useState(false);

    useEffect(() => {
        setView(true);
    }, []);

    return <BadgeList view={view} />;
};

export default Badges;
