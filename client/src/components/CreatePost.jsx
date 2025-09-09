import React from 'react'
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux'

const CreatePost = ({ onCreatePost, error }) => {

    const [body, setBody] = React.useState("")

    const profilePhoto = useSelector(state => state?.user?.currentUser?.profilePhoto)

    const CreatePost = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onCreatePost(formData)
    }

    return (
        <form className="createPost" encType="multipart/formdata" onSubmit={CreatePost}>
            {error && <p className='createPost__error-message'>{error}</p>}
            <div className="createPost__top">
                <ProfileImage image={profilePhoto} />
                <textarea value={body} onChange={e => setBody(e.target.value)}
                    placeholder="What's on your mind?"></textarea>
            </div>
        </form>
    )
}

export default CreatePost