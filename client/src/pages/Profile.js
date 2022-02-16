import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_FRIENDS } from '../utils/queries';
import { ADD_BADGE, ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import ProfileUserInfo from '../components/ProfileUserInfo';
import { checkFriends } from '../utils/helpers';
// import Achievements from '../components/Achievements';
// import Progress from '../components/Progress'

const Profile = () => {
    const [friendStatus, setFriendStatus] = useState(false);
    const { username: userParam } = useParams();
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { username: userParam },
    });
    const myFriends = useQuery(QUERY_FRIENDS);

    let friendID;
    if (data) {
        friendID = data.user._id;
    }
    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    const [addBadge] = useMutation(ADD_BADGE);

    useEffect(() => {
        handler();
    }, []);

    const handleAddFriend = async (event) => {
        event.preventDefault();
        const data = await addFriend({
            variables: { friendID },
        });
        if (data) {
            const friendBadge = checkFriends(data.data.addFriend.friendCount)
            if (friendBadge) {
                addBadge({ variables: { badgeName: friendBadge }})
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

    const handler = async () => {
        const friendArr = await myFriends.data?.me.friends.map((friend) => {
            return friend.username;
        });
        if (!myFriends.loading) {
            if (friendArr.includes(`${userParam}`)) {
                setFriendStatus(true);
            } else {
                setFriendStatus(false);
            }
        }
    };
    console.log(friendStatus);
    return (
        <main className="flex-grow">
            {data && <ProfileUserInfo data={data} />}
            <div>
                {friendStatus ? (
                    <button onClick={handleRemoveFriend}>Remove Friend</button>
                ) : (
                    <button onClick={handleAddFriend}>Add Friend</button>
                )}
            </div>
        </main>
    );
};

export default Profile;
