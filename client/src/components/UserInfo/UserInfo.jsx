import React, { useState } from 'react'
import defaultPhoto from '../../assets/images/no-profile-picture.svg';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_BIO } from '../../utils/mutations';
import { QUERY_ME_SCORES } from '../../utils/queries';

const UserInfo = ({ data, modalBio, setModalBio }) => {
    const [bio, setBio] = useState('');
    const [newBio, setNewBio] = useState('')
    const [characterCount, setCharacterCount] = useState(0);
    const [addBio, { error }] = useMutation(ADD_BIO);

    const handleChange = (event) => {
        if (event.target.value.length <= 140) {
            setBio(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addBio({
            variables: { bio }
        });

        setBio('');
        setCharacterCount('');
        setNewBio(bio);
        setModalBio(bio);
    };




    return (
        <section>
            <div>
                <img src={defaultPhoto} alt='' width='100' height='100'></img>
            </div>
            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            {/* Bio */}
            <div>
                {!modalBio && <p>{data.me.bio}</p>}
                {modalBio && <p>{modalBio}</p>}
            </div>
            {/* Test results */}
            <div>
                <p>Highest WPM: 105</p>
                <p>Average WPM: 87</p>
            </div>
            <div>
                <p>Location: United States </p>
            </div>
        </section>
    )
}

export default UserInfo;