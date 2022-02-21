import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import BadgeList from '../components/BadgeList/BadgeList';
import Auth from '../utils/auth';

const Badges = () => {
    const [view, setView] = useState(false);

    useEffect(() => {
        setView(true);
    }, []);

    if (!Auth.loggedIn()) {
        return <Navigate to='/login'></Navigate>
    }

    return <BadgeList view={view} />;
};

export default Badges;
