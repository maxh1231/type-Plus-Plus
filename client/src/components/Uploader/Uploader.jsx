import React from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '../../utils/mutations';

const Uploader = ({ setImage }) => {
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        await uploadFile({ variables: { file } });
        await setImage(`images/${file.name}`);
    };

    return (
        <section className="w-full flex items-center text-center mb-4">
            <label htmlFor="file-upload" className="w-full text-center mt-3 py-1 rounded text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 focus:outline-none my-1 transition-all duration-300 hover:cursor-pointer">
                Upload New Photo
            </label>
            <input type="file" id="file-upload" className="hidden" onChange={handleFileChange}></input>
        </section>
    );
};
export default Uploader;
