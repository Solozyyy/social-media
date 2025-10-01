import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserById } from '../services'

const Navbar = () => {

    const userId = useSelector(state => state?.user?.currentUser?.id)
    const token = useSelector(state => state?.user?.currentUser?.token)
    const navigate = useNavigate()
    //console.log(profilePhoto);
    const [avatar, setAvatar] = useState({})

    const getUser = async () => {
        try {
            const res = await getUserById(userId)
            console.log(res?.data, "userData");
            setAvatar(res?.data?.profilePhoto)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            getUser()
        }
    }, [])

    //log user out after an hour
    useEffect(() => {
        setTimeout(() => {
            if (token) {
                navigate('/logout')
            }
        }, 1000 * 60 * 60)
    }, [])
    return (
        <nav className="navbar">
            <div className="container navbar__container">
                <Link to="/" className="navbar__logo">Home Page</Link>
                <form className="navbar__search">
                    <input type="text" placeholder="Search..." />
                    <button type="submit" ><CiSearch /></button>
                </form>
                <div className="navbar__right">
                    <Link to={`/users/${userId}`} className="navbar__proile">
                        <ProfileImage image={avatar} />
                    </Link>
                    {token ? <Link to="/logout" >Logout</Link> : <Link to="/login" >Login</Link>}
                </div>
            </div>
        </nav >
    )
}

export default Navbar