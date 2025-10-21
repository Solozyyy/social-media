import React, { useState } from 'react'
import { getConversationsService } from '../services'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessageListItem from './MessageListItem'

const MessagesList = () => {

    const [conversations, setConversations] = useState([])
    const socket = useSelector(state => state?.user?.socket)

    const getConversations = async () => {
        try {
            const res = await getConversationsService()
            setConversations(res?.data)
            console.log("conversations:", res?.data);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getConversations()
    }, [socket])

    return (
        <menu className="messageList">
            <h3>Recent Messages</h3>
            {conversations.map(conversation => < MessageListItem key={conversation?._id}
                conversation={conversation} />)}
        </menu>
    )
}

export default MessagesList