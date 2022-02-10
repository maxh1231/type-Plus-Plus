import React from 'react';

const Uploader = ({ image, setImage, url, setUrl }) => {
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mhpreset")
        data.append("cloud_name", "djevcwcbq")
        fetch("  https://api.cloudinary.com/v1_1/djevcwcbq/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            {image && <div className="w-[200px] h-[200px]">
                {<img className="w-full h-full object-cover" src={url} alt="" />}
            </div>}
        </>
    )

}
export default Uploader;