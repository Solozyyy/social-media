import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createCommentService, deleteCommentService, getPostByIdService } from '../services'
import TimeAgo from 'react-timeago'
import ProfileImage from '../components/ProfileImage'
import LikeDislikePost from '../components/LikeDislikePost'
import { FaRegCommentDots, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdSend, IoMdShare } from 'react-icons/io'
import BookmarkPost from '../components/BookmarkPost'
import PostComment from '../components/PostComment'

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = React.useState({})
    const [comments, setComments] = React.useState([])
    const [comment, setComment] = React.useState("")

    const getPost = async () => {
        try {
            const res = await getPostByIdService(id)
            // console.log(res);

            setPost(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await deleteCommentService(commentId)
            setComments(comments?.filter(c => c?._id != commentId))
        } catch (error) {
            console.log(error);
        }
    }

    const createComment = async () => {
        try {
            console.log("comment: ", comment);
            const res = await createCommentService(id, comment)
            const newComment = res?.data
            setComments([newComment, ...comments])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost()
    }, [deleteComment])

    //console.log(comment);


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
                <form className="singlePost__comments-form" onSubmit={createComment}>
                    <textarea placeholder='Enter your comment...' onChange={e => setComment(e.target.value)}>
                        {comment}
                    </textarea>
                    <button type="submit" className="singlePost__comments-btn" ><IoMdSend /></button>
                </form>
                {post?.comments?.map(comment =>
                    <PostComment key={comment?._id} comment={comment} onDeleteComment={deleteComment} />
                )}
            </ul>
        </section>
    )
}

export default SinglePost