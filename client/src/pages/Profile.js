import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

import ProfileUserInfo from '../components/ProfileUserInfo';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'
import EditModal from '../components/EditModal';
import Friends from '../components/Friends';

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });


    console.log(data);
    return (
        <section>
            <ProfileUserInfo />



        </section>
    );
};

export default Profile;