import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

import ProfilePic from './ProfilePic';
import UserInfo from './UserInfo'
import Achievements from './Achievements';
import Progess from './Progess'


const Dashboard = ({ image, setImage, url, setUrl }) => {
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