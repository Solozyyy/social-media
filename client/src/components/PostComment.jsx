import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import TimeAgo from 'react-timeago'

const PostComment = ({ comment, onDeleteComment }) => {

    const userId = useSelector(state => state?.user?.currentUser?.id)

    const deleteComment = () => {
        onDeleteComment(comment?._id)
    }

    return (
        <li className="singlePost__comment">
            <div className="singlePost__comment-wrapper">
                <div className="singlePost__comment-author">
                    <img src={comment?.creator?.creatorPhoto} alt='' />
                </div>
                <div className="singlePost__comment-body">
                    <div>
                        <h5>{comment?.creator?.creatorName}</h5>
                        <small><TimeAgo date={comment?.createdAt} /></small>
                    </div>
                    <p>{comment?.comment}</p>
                </div>
            </div>
            {userId === comment?.creator?.creatorId &&
                <button className="singlePost__comment-delete-btn" onClick={deleteComment}>
                    <FaRegTrashAlt /></button>}
        </li>
    )
}

export default PostComment