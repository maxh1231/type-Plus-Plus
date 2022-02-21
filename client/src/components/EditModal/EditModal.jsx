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
            <div className="w-full flex flex-col items-center justify-around">
                {data.me.profilePic && (
                    <img
                        src={image}
                        alt=""
                        width="100"
                        height="100"
                        className="rounded-md"
                    ></img>
                )}
                {!data.me.profilePic && (
                    <img
                        src={image}
                        alt=""
                        width="100"
                        height="100"
                        className="rounded-md"
                    ></img>
                )}
                <Uploader image={image} setImage={setImage} />
            </div>

            <div className="mb-4">
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleBioSubmit}
                >
                    {data.me.bio && (
                        <input
                            value={bio}
                            placeholder="Update Bio"
                            onChange={handleBioChange}
                            className="border w-full p-3 rounded mb-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                        ></input>
                    )}
                    {!data.me.bio && (
                        <input
                            value={bio}
                            placeholder="Add Bio"
                            onChange={handleBioChange}
                            className="border w-full p-3 rounded mb-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                        ></input>
                    )}
                    <button
                        className="w-full text-center py-1 rounded text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 focus:outline-none my-1 transition-all duration-300"
                        type="submit"
                    >
                        Store
                    </button>
                </form>
            </div>
            <div className="mb-4">
                <form
                    className="flex flex-col items-center justify-around"
                    onSubmit={handleLocationSubmit}
                >
                    {data.me.location && (
                        <input
                            value={location}
                            placeholder="Update Location"
                            onChange={handleLocationChange}
                            className="border w-full p-3 rounded mb-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                        ></input>
                    )}
                    {!data.me.location && (
                        <input
                            value={location}
                            placeholder="Add Location"
                            onChange={handleLocationChange}
                            className="border w-full p-3 rounded mb-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                        ></input>
                    )}
                    <button
                        className="w-full text-center py-1 rounded text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 focus:outline-none my-1 transition-all duration-300"
                        type="submit"
                    >
                        Store
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditModal;
