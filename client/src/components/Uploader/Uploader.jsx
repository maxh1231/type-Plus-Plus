import React from 'react';

const Uploader = ({ image, setImage, url, setUrl }) => {
    // const uploadImage = () => {
    //     const data = new FormData()
    //     data.append("file", image)
    //     data.append("upload_preset", "mhpreset")
    //     data.append("cloud_name", "djevcwcbq")
    //     fetch("  https://api.cloudinary.com/v1_1/djevcwcbq/image/upload", {
    //         method: "post",
    //         body: data
    //     })
    //         .then(resp => resp.json())
    //         .then(data => {
    //             setUrl(data.url)
    //         })
    //         .catch(err => console.log(err))
    // }

    // return (
    //     <>
    //         <div>
    //             <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
    //             <button onClick={uploadImage}>Upload</button>
    //         </div>
    //         {image && <div className="w-[200px] h-[200px]">
    //             {<img className="w-full h-full object-cover" src={url} alt="" />}
    //         </div>}
    //     </>
    // )

    return (
        <section>


            <div>
                <h1>To Upload Image on mongoDB</h1>
                <form action="/" method="POST" encType="multipart/form-data">
                    <div>
                        <label htmlFor="name">Image Title</label>
                        <input type="text" id="name" placeholder="Name"
                            name="name" required></input>
                    </div>
                    <div>
                        <label htmlFor="desc">Image Description</label>
                        <textarea id="desc" name="desc" rows="2"
                            placeholder="Description" required>
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="image">Upload Image</label>
                        <input type="file" id="image"
                            name="image" required></input>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>



        </section>
    )

}
export default Uploader;