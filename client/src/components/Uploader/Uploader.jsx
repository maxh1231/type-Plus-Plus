import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { UPLOAD_FILE } from '../../utils/mutations';

const Uploader = ({ image, setImage }) => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => console.log(data),
    });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        await uploadFile({ variables: { file } });
        await setImage(`images/${file.name}`);
        console.log(file.name);
    };

    return (
        <section className="flex items-center text-center">
            <label
                for="file-upload"
                className="px-3 py-1 text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 font-medium uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg transition duration-300 ease-in-out my-6"
            >
                Upload New Photo
            </label>
            <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
            ></input>
        </section>
    );
};
export default Uploader;
