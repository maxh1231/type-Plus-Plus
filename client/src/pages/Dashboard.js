import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import Uploader from '../components/Uploader';
import UserInfo from '../components/UserInfo'
import Achievements from '../components/Achievements';
import Progress from '../components/Progress'


const Dashboard = () => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME);
    console.log(data);

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
            <Uploader image={image} setImage={setImage} url={url} setUrl={setUrl} />
            <UserInfo data={data} />
            <Achievements />
            <Progress />

        </section>
    )
}

export default Dashboard;