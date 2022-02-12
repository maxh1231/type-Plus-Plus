import React, { useState } from 'react'
import defaultPhoto from '../../assets/images/no-profile-picture.svg';
import { useMutation } from '@apollo/client';
import { ADD_BIO, ADD_LOCATION } from '../../utils/mutations';

import Uploader from '../Uploader'

const EditModal = ({ data, setModalBio, image, setImage, url, setUrl }) => {
    const [bio, setBio] = useState('');
    const [newBio, setNewBio] = useState('')
    const [location, setLocation] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addBio] = useMutation(ADD_BIO);
    const [addLocation] = useMutation(ADD_LOCATION)


    const handleBioChange = (event) => {
        if (event.target.value.length <= 140) {
            setBio(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleBioSubmit = async (event) => {
        event.preventDefault();
        await addBio({
            variables: { bio }
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
            variables: { location }
        });
        setLocation('');
        setCharacterCount('');
    };

    return (
        <section>
            <div>
                <img src={defaultPhoto} alt=""></img>
            </div>

            <div>
                <Uploader image={image} setImage={setImage} url={url} setUrl={setUrl} />
            </div>

            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            <div>
                <form onSubmit={handleBioSubmit}>

                    <textarea value={bio} onChange={handleBioChange}></textarea>
                    <button type="submit">Submit</button>
                </form>
                <p>{newBio}</p>
                {!data.me.bio && <span>Add bio</span>}
                {data.me.bio && <span>Update bio</span>}
            </div>
            <div>
                <form onSubmit={handleLocationSubmit}>

                    <textarea value={location} onChange={handleLocationChange}></textarea>
                    <button type="submit">Submit</button>
                </form>
                <p>{newBio}</p>
                {!data.me.location && <span>Add a locatioin</span>}
                {data.me.location && <span>Update location</span>}
            </div>
        </section>
    )
}

export default EditModal;