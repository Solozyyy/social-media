import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const LikeDislikePost = () => {
    const [post, setPost] = useState({})
    const userId = useSelector(state => state?.user?.currentUser?.id)
    const [postLiked, setPostLiked] = useState(post?.likes?.includes?.userId)

    const handleLikeDislikePost = () => {
        try {

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <button className="feed__footer-comments" onClick={handleLikeDislikePost}>

        </button>
    )
}

export default LikeDislikePost