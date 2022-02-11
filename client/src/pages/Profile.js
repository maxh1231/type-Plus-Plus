import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { gql, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

import ProfileUserInfo from '../components/ProfileUserInfo';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'


const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });

    console.log(data);

    return (
        <section>
            <ProfileUserInfo data={data} />



        </section>
    );
};

export default Profile;