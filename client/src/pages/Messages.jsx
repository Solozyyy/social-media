import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesService, getUserById, sendMessageService } from '../services'
import { useEffect } from 'react'
import ProfileImage from '../components/ProfileImage'
import { IoMdSend } from 'react-icons/io'
import { userActions } from '../store/user-slice'
import MessageItem from '../components/MessageItem'

const Messages = () => {
    const { receiverId } = useParams()
    const [messages, setMessages] = useState([])
    const [otherMessager, setOtherMessager] = useState({})
    const [messageBody, setMessageBody] = useState("")
    const [conversationId, setConversationId] = useState("")
    const messageEndRef = useRef(null)
    const dispatch = useDispatch()
    const conversations = useSelector(state => state?.user?.conversations)

    const getOtherMessager = async () => {
        const res = await getUserById(receiverId)
        setOtherMessager(res?.data)
    }

    useEffect(() => {
        messageEndRef?.current?.scrollIntoView()
    }, [messages])

    const getMessages = async () => {
        try {
            const res = await getMessagesService(receiverId)
            setMessages(res?.data)
            setConversationId(res?.data[0]?.conversationId)
        } catch (error) {
            console.log(error);
        }
    }

    const socket = useSelector(state => state?.user?.socket)

    const sendMessage = async (e) => {
        e.preventDefault()
        try {
            const res = await sendMessageService(receiverId, messageBody)
            setMessages(prevMessages => [...prevMessages, res?.data])
            setMessageBody("")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        socket?.on("newMessage", (message) => {
            setMessages(prevMessages => [...prevMessages, message])

            dispatch(userActions?.setConversation(conversations.map(conversation => {
                if (conversation?._id == conversationId) {
                    return { ...conversation, lastMessage: { ...conversation.lastMessage, seen: true } }
                }
            })))

            return () => socket.off("newMessage")
        })
    }, [socket, messages])

    useEffect(() => {
        getMessages()
        getOtherMessager()
    }, [receiverId])

    return (
        <>
            {<section className='messagesBox' >
                <header className="messagesBox__header">
                    <ProfileImage image={otherMessager?.profilePhoto} />
                    <div className="messagesBox__header-info">
                        <h4>{otherMessager?.fullName}</h4>
                        <small>last seen 2 mins ago</small>
                    </div>
                </header>
                <ul className="messagesBox__messages">
                    {
                        messages?.map(message => <MessageItem message={message} />)
                    }
                    <div ref={messageEndRef}></div>
                </ul>
                <form onSubmit={sendMessage}>
                    <input type="text" value={messageBody} onChange={({ target }) => setMessageBody(target.value)}
                        placeholder='Enter message...' autoFocus />
                    <button type='submit'><IoMdSend /></button>
                </form>
            </section>}
        </>
    )
}

export default Messages