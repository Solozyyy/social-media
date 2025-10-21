import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import TrimText from '../helpers/TrimText'
import TimeAgo from 'react-timeago'

const MessageListItem = ({ conversation }) => {

    const onlineUsers = useSelector(state => state?.user?.onlineUsers)

    return (
        <Link to={`/messages/${conversation?.participants[0]?._id}`} className='messageList__item'>
            <ProfileImage image={conversation?.participants[0]?.profilePhoto}
                className={onlineUsers.includes(conversation?.participants[0]?._id) ? "active" : ""} />
            <div className="messageList__item-details">
                <h5>{conversation?.participants[0]?.fullName}</h5>
                <p><TrimText item={conversation?.lastMessage?.text} maxLength={16} /></p>
                <small><TimeAgo date={conversation?.createdAt} /></small>
            </div>
        </Link>
    )
}

export default MessageListItem