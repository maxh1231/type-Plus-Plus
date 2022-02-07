import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import ProfilePic from '../components/Dashboard/ProfilePic';
import UserInfo from '../components/Dashboard/UserInfo'
import Achievements from '../components/Dashboard/Achievements';
import Progess from '../components/Dashboard/Progess'


const Dashboard = ({ image, setImage, url, setUrl }) => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                Must be logged in
            </h4>
        );
    }
    return (
        <section>
            <ProfilePic image={image} setImage={setImage} url={url} setUrl={setUrl} />
            <UserInfo />
            <Achievements />
            <Progess />
        </section>
    )
}

export default Dashboard;