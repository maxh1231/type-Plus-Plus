import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_FRIENDS } from '../utils/queries';
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

    let friendID;
    if (data) {
        friendID = data.user._id
    }
    const [addFriend] = useMutation(ADD_FRIEND);

    const handleFriendSubmit = async (event) => {
        event.preventDefault();
        await addFriend({
            variables: { friendID }
        });
        console.log('click')
    };

    const myFriends = useQuery(QUERY_FRIENDS);
    if (myFriends.loading) {
        console.log('loading')
    }

    // let myFriendsArr;
    // if (!myFriends.loading) {
    //     console.log(myFriends.data.me.friends)
    //     myFriendsArr = myFriends.data.me.friends;
    // }
    // console.log(myFriendsArr);
    // console.log(data);


    // let isFriends;
    // if (myFriendsArr.includes(userParam)) {
    //     isFriends = true;
    // } else {
    //     isFriends = false;
    // }

    let myFriendsArr = [];
    if (!myFriends.loading) {
        for (let i = 0; i < myFriends.data.me.friends.length; i++) {
            myFriendsArr.push(myFriends.data.me.friends[i].username)
            console.log(myFriendsArr);
        }
    }

    return (
        <section>
            {data && <ProfileUserInfo data={data} />}


            <div>
                {myFriendsArr.includes(`${userParam}`) && <button onClick={handleFriendSubmit}>Remove Friend</button>}
            </div>



            {/* <div>
                <button type="submit" onClick={handleFriendSubmit}>Add friend</button>
            </div> */}
        </section>
    );
};

export default Profile;