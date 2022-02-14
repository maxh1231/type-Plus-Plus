import React from 'react';
import { useMutation, gql } from '@apollo/client'
import { UPLOAD_FILE } from '../../utils/mutations';

const Uploader = ({ image, setImage, url, setUrl }) => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    const handleFileChange = e => {
        const file = e.target.files[0]
        if (!file) return
        uploadFile({ variables: { file } })
    }

    return (
        <section>
            <input type="file" onChange={handleFileChange}></input>
        </section>
    )

}
export default Uploader;