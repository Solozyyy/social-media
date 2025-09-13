import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { LikeDislikePostService } from '../services'
import { FcLike } from 'react-icons/fc'
import { FaRegHeart } from 'react-icons/fa'
import { useEffect } from 'react'

const LikeDislikePost = (props) => {
    const [post, setPost] = useState(props?.post)
    const userId = useSelector(state => state?.user?.currentUser?.id)
    const [postLiked, setPostLiked] = useState(post?.likes?.includes(userId))


    const handleLikeDislikePost = async () => {
        try {
            const res = await LikeDislikePostService(post?._id)
            setPost(res?.data)
        } catch (error) {
            console.log(error);

        }
    }

    const handleCheckIfUserLikedPost = () => {
        if (post?.likes?.includes(userId)) {
            setPostLiked(true)
        } else {
            setPostLiked(false)
        }
    }

    useEffect(() => {
        handleCheckIfUserLikedPost()
    }, [post])

    return (
        <button className="feed__footer-comments" onClick={handleLikeDislikePost}>
            {postLiked ? <FcLike /> : <FaRegHeart />}
            <small>{post?.likes?.length}</small>
        </button>
    )
}

export default LikeDislikePost