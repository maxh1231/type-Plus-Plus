import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_FRIENDS } from '../utils/queries';
import { ADD_BADGE, ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import ProfileUserInfo from '../components/ProfileUserInfo';
import { checkFriends } from '../utils/helpers';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'

const Profile = ({ currentPage, setCurrentPage }) => {

    useEffect(() => {
        setCurrentPage('Profile')
    })

    const [friendStatus, setFriendStatus] = useState(false);
    const { username: userParam } = useParams();


    const { loading, error, data } = useQuery(QUERY_USER, {
        errorPolicy: 'all',
        variables: { username: userParam },
    });

    const myFriends = useQuery(QUERY_FRIENDS);
    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    const [addBadge] = useMutation(ADD_BADGE);

    const newData = myFriends.data?.me || [];

    const handler = async () => {
        if (!myFriends.loading) {
            const friendArr = await newData.friends.map((friend) => {
                return friend.username;
            });
            if (friendArr.includes(`${userParam}`)) {
                setFriendStatus(true);
            } else {
                setFriendStatus(false);
            }
        }
    };

    useEffect(() => {
        handler();
    }, [myFriends.data]);

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (!loading && data.user === null) {
        return <Navigate to='/'></Navigate>
    }

    let friendID;
    if (data) {
        friendID = data.user._id;
    }

    const handleAddFriend = async (event) => {
        event.preventDefault();
        const data = await addFriend({
            variables: { friendID },
        });
        if (data) {
            const friendBadge = checkFriends(data.data.addFriend.friendCount)
            if (friendBadge) {
                addBadge({ variables: { badgeName: friendBadge } })
            }
        }
        setFriendStatus(true);
    };

    const handleRemoveFriend = async (event) => {
        event.preventDefault();
        await removeFriend({
            variables: { friendID },
        });
        setFriendStatus(false);
    };

    let button;
    if (Auth.loggedIn() && friendStatus) {
        button = <button id="1" className="w-full text-center py-3 px-4 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300" onClick={handleRemoveFriend}>Remove Friend</button>
    } else if (Auth.loggedIn() && !friendStatus) {
        button = <button id="2" className="w-full text-center py-3 px-4 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300" onClick={handleAddFriend}>Add Friend</button>
    } else {
        button = <button id="3" className="w-full text-center py-3 px-4 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"><Link to='/login'>Login to Add Friend</Link></button>
    }

    return (
        <main className="grow flex flex-col items-center justify-center dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4">
            {data && <ProfileUserInfo data={data} />}
            <div className="mt-2">
                {button}
            </div>
        </main>
    );
};

export default Profile;
