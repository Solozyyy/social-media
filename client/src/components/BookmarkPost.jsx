import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createBookmarkService, getUserById } from "../services"
import { FaBookmark } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'

const BookmarkPost = ({ post }) => {
    const [user, setUser] = useState({})
    const [postBookmarked, setPostBookmarked] = useState(user?.bookmarks?.includes(post?._id))
    const userId = useSelector(state => state?.user?.currentUser?.id)

    const getUser = async () => {

        try {
            const res = await getUserById(userId)
            setUser(res?.data)
        } catch (error) {
            console.log(error);

        }
    }

    const createBookmark = async () => {
        try {
            const res = await createBookmarkService(post?._id)
            if (res?.data?.bookmarks?.includes(post?._id)) {
                setPostBookmarked(true)
            }
            else {
                setPostBookmarked(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [user, postBookmarked])

    return (
        <button className="feed__footer-bookmark" onClick={createBookmark}>
            {postBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
    )
}

export default BookmarkPost