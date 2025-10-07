import React, { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile'
import HeaderInfo from '../components/HeaderInfo'
import { getUserById, getUserPostsService } from '../services'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'

const Profile = () => {

    const [user, setUser] = useState({})
    const { id: userId } = useParams()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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

    const deletePost = async () => {

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
                    posts?.length < 1 ? <p className='center'>Np posts by this user</p> :
                        posts?.map(post => <Feed key={post._id} post={post} onDeletePosts=
                            {deletePost} />
                        )
                }
            </section>
        </section>
    )
}

export default Profile