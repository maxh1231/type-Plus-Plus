import React, { useState } from 'react';
import defaultPhoto from '../../assets/images/no-profile-picture.svg';
import { useMutation } from '@apollo/client';
import { ADD_BIO, ADD_LOCATION } from '../../utils/mutations';

import Uploader from '../Uploader';

const EditModal = ({ data, setModalBio, image, setImage }) => {
    const [bio, setBio] = useState('');
    const [newBio, setNewBio] = useState('');
    const [location, setLocation] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addBio] = useMutation(ADD_BIO);
    const [addLocation] = useMutation(ADD_LOCATION);

    const handleBioChange = (event) => {
        if (event.target.value.length <= 140) {
            setBio(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleBioSubmit = async (event) => {
        event.preventDefault();
        await addBio({
            variables: { bio },
        });
        setBio('');
        setCharacterCount('');
        setNewBio(bio);
        setModalBio(bio);
    };

    const handleLocationChange = (event) => {
        if (event.target.value.length <= 140) {
            setLocation(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleLocationSubmit = async (event) => {
        event.preventDefault();
        await addLocation({
            variables: { location },
        });
        setLocation('');
        setCharacterCount('');
    };

    return (
        <section>
            <div>
                {data.me.profilePic && (
                    <img src={image} alt="" width="100" height="100"></img>
                )}
                {!data.me.profilePic && (
                    <img src={image} alt="" width="100" height="100"></img>
                )}
            </div>

            <div>
                <Uploader image={image} setImage={setImage} />
            </div>

            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            <div>
                <form onSubmit={handleBioSubmit}>
                    {data.me.bio && (
                        <input
                            value={bio}
                            placeholder="Update Bio"
                            onChange={handleBioChange}
                        ></input>
                    )}
                    {!data.me.bio && (
                        <input
                            value={bio}
                            placeholder="Add Bio"
                            onChange={handleBioChange}
                        ></input>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleLocationSubmit}>
                    {data.me.location && (
                        <input
                            value={location}
                            placeholder="Update Location"
                            onChange={handleLocationChange}
                        ></input>
                    )}
                    {!data.me.location && (
                        <input
                            value={location}
                            placeholder="Add Location"
                            onChange={handleLocationChange}
                        ></input>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default EditModal;
