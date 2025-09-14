import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPostByIdService } from '../services'
import TimeAgo from 'react-timeago'
import ProfileImage from '../components/ProfileImage'
import LikeDislikePost from '../components/LikeDislikePost'
import { FaRegCommentDots } from 'react-icons/fa'
import { IoMdSend, IoMdShare } from 'react-icons/io'
import BookmarkPost from '../components/BookmarkPost'
import PostComment from '../components/PostComment'

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = React.useState(null)
    const [comments, setComments] = React.useState([])
    const [comment, setComment] = React.useState("")

    const getPost = async () => {
        try {
            const res = await getPostByIdService(id)
            console.log(res);

            setPost(res)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async () => {
        try {

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <section className="singlePost">
            <header className="feed__header">
                <ProfileImage image={post?.creator?.profilePhoto} />
                <div className="feed__header-details">
                    <h4>{post?.creator?.fullName}</h4>
                    <small><TimeAgo date={post?.createdAt} /></small>
                </div>
            </header>
            <div className="feed__body">
                <p>{post?.body}</p>
                <div className="feed__images">
                    <img src={post?.image} alt="" />
                </div>
            </div>
            <div className="feed__footer">
                <div>
                    {post?.likes && <LikeDislikePost post={post} />}
                    <button className="feed__footer-comments">
                        <FaRegCommentDots />
                    </button>
                    <button className="feed__footer-share">
                        <IoMdShare />
                    </button>
                </div>
                <BookmarkPost post={post} />
            </div>
            <ul className="singlePost__comments">
                <form className="singlePost__comments-form">
                    <textarea placeholder='Enter your comment...' onChange={e => setComment(e.target.value)}>
                        {comment}
                    </textarea>
                    <button className="singlePost__comments-btn"><IoMdSend /></button>
                </form>
                {post?.comments?.map(comment =>
                    <PostComment key={comment?.id} comment={comment} onDeleteComment={deleteComment} />
                )}
            </ul>
        </section>
    )
}

export default SinglePost