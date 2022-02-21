import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_FRIENDS } from '../utils/queries';
import { ADD_BADGE, ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import ProfileUserInfo from '../components/ProfileUserInfo';
import { checkFriends } from '../utils/helpers';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'

const Profile = ({ currentPage, setCurrentPage }) => {
    setCurrentPage('Profile')
    const [friendStatus, setFriendStatus] = useState(false);
    const { username: userParam } = useParams();
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { username: userParam },
    });
    const myFriends = useQuery(QUERY_FRIENDS);
    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    const [addBadge] = useMutation(ADD_BADGE);

    const newData = myFriends.data?.me || [];

    const handler = async () => {
        const friendArr = await newData.friends.map((friend) => {
            return friend.username;
        });

        console.log("hi")
        if (friendArr.includes(`${userParam}`)) {
            setFriendStatus(true);
        } else {
            setFriendStatus(false);
        }
    };

    useEffect(() => {
        if (!myFriends.loading)
            handler();
        console.log(myFriends);

    }, []);


    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
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
        console.log('click');
        setFriendStatus(false);
    };





    console.log(friendStatus);
    return (
        <main className="grow flex flex-col items-center justify-center dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            {data && <ProfileUserInfo data={data} />}
            <div className="mt-2">
                {friendStatus ? (
                    <button className="w-full text-center py-3 px-4 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300" onClick={handleRemoveFriend}>Remove Friend</button>
                ) : (
                    <button className="w-full text-center py-3 px-4 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300" onClick={handleAddFriend}>Add Friend</button>
                )}
            </div>
        </main>
    );
};

export default Profile;
