import React from 'react'
import { getPostByIdService, getUserById } from '../services'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import TimeAgo from 'react-timeago'
import { useSelector } from 'react-redux'
import LikeDislikePost from './LikeDislikePost'
import { FaRegCommentDots } from 'react-icons/fa'
import { IoMdShare } from 'react-icons/io'
import TrimText from "../helpers/TrimText"

const Feed = ({ post }) => {
    const userId = useSelector(state => state?.user?.currentUser?.id)
    const location = useLocation()

    const [creator, setCreator] = React.useState({})
    const [showFeedHeaderMenu, setShowFeedHeaderMenu] = React.useState(false)

    const getPostCreator = async () => {
        try {
            const res = await getUserById(post?.creator)
            setCreator(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostCreator()
    }, [])

    return (
        <artical className="feed">
            <header className="feed__header">
                <Link to={`/users/${post.creator}`} className="feed__header-profile" >
                    <ProfileImage image={creator?.profilePhoto} />
                    <div className="feed__header-details">
                        <h4>{creator?.fullName}</h4>
                        <small><TimeAgo date={post?.createdAt} /></small>
                    </div>
                </Link>
                {showFeedHeaderMenu && userId == post?.creator && location.pathname.includes("users") &&
                    <menu className="feed__headermenu">
                        <button onClick={showEditPostModal}>Edit</button>
                        <button onClick={deletePost}>Delete</button>
                    </menu>
                }
            </header>
            <Link to={`posts/${post?._id}`} className='feed__body'>
                <p><TrimText item={post?.body} maxLength={160} /></p>
                <div className="feed__images">
                    <img src={post?.image} alt="" />
                </div>
            </Link>
            <footer className="feed__footer">
                <div>
                    <LikeDislikePost post={post} />
                    <button className="feed___footer-comments">
                        <Link to={`posts/${post?._id}`}>
                            <FaRegCommentDots />
                        </Link>
                        <small>{post?.comments?.length}</small>
                    </button>
                    <button className="feed__footer-share">
                        <IoMdShare />
                    </button>
                </div>
            </footer>
        </artical>
    )
}

export default Feed