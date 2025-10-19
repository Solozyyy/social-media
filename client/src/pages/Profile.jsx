import React, { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile'
import HeaderInfo from '../components/HeaderInfo'
import { deletePostService, getUserById, getUserPostsService, updatePostService } from '../services'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import { useSelector } from 'react-redux'
import EditPostModal from '../components/EditPostModal'
import EditProfileModal from '../components/EditProfileModal'

const Profile = () => {

    const [user, setUser] = useState({})
    const { id: userId } = useParams()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const editPostModalOpen = useSelector(state => state?.ui?.editPostModalOpen)
    const editProfileModalOpen = useSelector(state => state?.ui?.editProfileModalOpen)

    const getUser = async () => {
        const res = await getUserById(userId)
        setUser(res?.data)
    }

    const getUserPosts = async () => {
        setIsLoading(true)
        try {
            const res = await getUserPostsService(userId)
            setPosts(res?.data?.posts)
            console.log("user post: ", res?.data?.posts);

        } catch (error) {
            console.log(error);

        }
    }

    const deletePost = async (postId) => {
        try {
            const res = await deletePostService(postId)
            setPosts(posts?.filter(p => p._id != postId))
        } catch (error) {
            console.log(error);

        }
    }

    const updatePost = async (postId, data) => {
        try {
            const res = await updatePostService(postId, data)
            if (res?.status === 200) {
                const updatedPost = res?.data
                setPosts(posts?.map(p => {
                    if (updatedPost?._id.toString() == p?._id.toString()) {
                        p.body = updatedPost.body
                    }
                    return p
                }))
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUser()
        getUserPosts()
    }, [userId])

    return (
        <section>
            <UserProfile />
            <HeaderInfo text={user?.fullName + ` posts`} />
            <section className="profile__posts">
                {
                    posts?.length < 1 ? <p className='center'>No posts by this user</p> :
                        posts?.map(post => <Feed key={post._id} post={post} onDeletePost=
                            {deletePost} />
                        )
                }
            </section>
            {editPostModalOpen && <EditPostModal onUpdatePost={updatePost} />}
            {editProfileModalOpen && <EditProfileModal />}
        </section>
    )
}

export default Profile