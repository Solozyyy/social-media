import React, { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile'
import HeaderInfo from '../components/HeaderInfo'
import { getUserById } from '../services'
import { useParams } from 'react-router-dom'

const Profile = () => {

    const [user, setUser] = useState({})
    const { id: userId } = useParams()

    const getUser = async () => {
        const res = await getUserById(userId)
        setUser(res?.data)
    }

    useEffect(() => {
        getUser()
    }, [userId])

    return (
        <section>
            <UserProfile />
            <HeaderInfo text={user?.fullName + ` posts`} />
        </section>
    )
}

export default Profile