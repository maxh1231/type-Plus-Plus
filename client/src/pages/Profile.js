import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import ProfileUserInfo from '../components/ProfileUserInfo';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'


const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });

    const [addFriend] = useMutation(ADD_FRIEND);

    console.log(data);

    return (
        <section>
            {data && <ProfileUserInfo data={data} />}



        </section>
    );
};

export default Profile;