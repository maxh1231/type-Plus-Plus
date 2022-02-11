import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

import UserInfo from '../components/UserInfo';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'
import EditModal from '../components/EditModal';
import Friends from '../components/Friends';

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER);
    console.log(data);
    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return <h4 className="flex-grow">Must be logged in</h4>;
    }

    return (
        <section>




        </section>
    );
};

export default Profile;