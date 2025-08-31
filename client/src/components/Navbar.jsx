import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Navbar = () => {

    const userId = useSelector(state => state?.user?.currentUser?.id)
    const profilePhoto = useSelector(state => state?.user?.currentUser?.profilePhoto)
    const token = useSelector(state => state?.user?.currentUser?.token)
    const navigate = useNavigate()
    console.log(profilePhoto);

    useEffect(() => {
        if (!token) {
            navigate('/login')
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
                        <ProfileImage image={profilePhoto} />
                    </Link>
                    {token ? <Link to="/logout" >Logout</Link> : <Link to="/login" >Login</Link>}
                </div>
            </div>
        </nav >
    )
}

export default Navbar