import React from 'react';
import { useMutation, gql } from '@apollo/client'
import { UPLOAD_FILE } from '../../utils/mutations';

const Uploader = ({ image, setImage }) => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)

    })

    const handleFileChange = e => {
        e.preventDefault()
        const file = e.target.files[0];
        if (!file) return
        uploadFile({ variables: { file } })
        setImage(`images/${file.name}`)
        console.log(file.name)
        console.log(typeof (file.name))
    }

    return (
        <section>
            <input type="file" onChange={handleFileChange}></input>
        </section>
    )

}
export default Uploader;