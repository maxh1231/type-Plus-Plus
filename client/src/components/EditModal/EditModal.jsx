import React, { useState } from 'react'
import defaultPhoto from '../../assets/images/no-profile-picture.svg';
import { useMutation } from '@apollo/client';
import { ADD_BIO } from '../../utils/mutations';

const EditModal = ({ data, modalBio, setModalBio }) => {
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
                <img src={defaultPhoto} alt=""></img>
            </div>
            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            {/* Bio */}
            <div>
                <form onSubmit={handleSubmit}>

                    <textarea value={bio} onChange={handleChange}></textarea>
                    <button type="submit">Submit</button>
                </form>

                <p>{newBio}</p>

                {!data.me.bio && <span>Add bio</span>}

                {data.me.bio && <span>Update bio</span>}
            </div>
            {/* Test results */}
            <div>
                <p>Location: United States </p>
            </div>
        </section>
    )

}

export default EditModal;