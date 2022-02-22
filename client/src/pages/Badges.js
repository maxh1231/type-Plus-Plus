import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import BadgeList from '../components/BadgeList/BadgeList';
import Auth from '../utils/auth';

const Badges = ({ currentPage, setCurrentPage }) => {

    useEffect(() => {
        setCurrentPage('Badges')
    })

    const [view, setView] = useState(false);

    useEffect(() => {
        setView(true);
    }, []);

    if (!Auth.loggedIn()) {
        return <Navigate to='/login'></Navigate>
    }

    return (
        <main className="flex-grow flex flex-col content-around justify-evenly items-center text-gray-700 dark:text-gray-400 dark:bg-gray-800 transition duration-200">
            <BadgeList view={view} />
        </main>
    );
};

export default Badges;
