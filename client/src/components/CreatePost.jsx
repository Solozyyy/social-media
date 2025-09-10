import React from 'react'
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { SlPicture } from 'react-icons/sl'

const CreatePost = ({ onCreatePost, error }) => {

    const [body, setBody] = useState("")

    const [image, setImage] = useState("")
    const profilePhoto = useSelector(state => state?.user?.currentUser?.profilePhoto)

    const setText = (e) => {
        console.log(e.target.value);
        setBody(e.target.value)
    }

    const CreatePost = (e) => {
        e.preventDefault()
        const postData = new FormData()
        postData.append("body", body)
        postData.append("image", image)
        onCreatePost(postData)
        console.log(postData?.get("body"), postData?.get("image"));

        //console.log(body, image);

        setBody("")
        setImage("")
    }


    return (
        <form className="createPost" encType="multipart/form-data" onSubmit={CreatePost}>
            {error && <p className='createPost__error-message'>{error}</p>}
            <div className="createPost__top">
                <ProfileImage image={profilePhoto} />
                <textarea value={body} onChange={setText}
                    placeholder="What's on your mind?"></textarea>
            </div>
            <div className="createPost__bottom">
                <span>
                    <div className="createPost__actions">
                        <label htmlFor="image"><SlPicture /></label>
                        <input type="file" id="image" onChange={e => setImage(e.target.files[0])} />
                        <button type='submit'>Post</button>
                    </div>
                </span>
            </div>
        </form>
    )
}

export default CreatePost