import React from 'react';
import { useMutation, gql } from '@apollo/client'
import { UPLOAD_FILE } from '../../utils/mutations';

const Uploader = ({ image, setImage }) => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)

    })

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        await uploadFile({ variables: { file } });
        await setImage(`images/${file.name}`);
        console.log(file.name);
    }

    return (
        <section>
            <input type="file" onChange={handleFileChange}></input>
        </section>
    )

}
export default Uploader;