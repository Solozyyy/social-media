import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { changeAvatarService, getUserById, followUnfollowUserService } from '../services'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LuUpload } from 'react-icons/lu'
import { FaCheck } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'
import { useNavigate } from 'react-router-dom'
import { uiSliceActions } from '../store/ui-slice'

const UserProfile = () => {

    const loggedInUserId = useSelector(state => state?.user?.currentUser?.id)
    const currentUser = useSelector(state => state?.user?.currentUser)

    const [user, setUser] = useState({})
    const { id: userId } = useParams()
    const [followsUser, setFollowsUser] = useState(user?.followers?.includes(loggedInUserId))
    const [avatar, setAvatar] = useState(user?.profilePhoto)
    const [avatarTouch, setAvatarTouch] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //console.log(userId, "userId");

    const getUser = async () => {
        try {
            const res = await getUserById(userId)
            setUser(res?.data)
            console.log(res?.data, "userData")
            setFollowsUser(res?.data?.followers?.includes(loggedInUserId))
            setAvatar(res?.data?.profilePhoto)
        } catch (error) {
            console.log(error)
        }
    }

    const changeAvatarHandle = async (e) => {
        e.preventDefault()
        setAvatarTouch(true)
        try {
            const postData = new FormData()
            postData.set("avatar", avatar)
            const res = await changeAvatarService(postData)
            dispatch(userActions?.changeCurrentUser({ ...currentUser, profilePhoto: res?.data?.profilePhoto }))
            navigate(0)
        } catch (error) {
            console.log(error);

        }
    }

    const openEditProfileModal = () => {
        dispatch(uiSliceActions.openEditProfileModalOpen())
    }

    const followUnfollowUser = async () => {
        try {
            const res = await followUnfollowUserService(userId)
            setFollowsUser(res?.data?.folllowers?.includes(loggedInUserId))
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUser()
    }, [userId, followsUser])

    console.log(user);


    return (
        <section className="profile">
            <div className="profile__container">
                <form className='profile__image' onSubmit={changeAvatarHandle} encType='multipart/form-data'>
                    <img src={user?.profilePhoto} alt='' />
                    {!avatarTouch ? <label htmlFor="avatar" className='profile__image-edit'>
                        <span><LuUpload /></span>
                    </label> :
                        <button type='submit' className="profile__image-btn">
                            <FaCheck />
                        </button>}
                    <input type="file" name='avatar' id='avatar' onChange={e => {
                        setAvatarTouch(true);
                        setAvatar(e.target.files[0])
                    }} accept='png, jpg, jpeg' />
                </form>
                <h4>{user?.fullName}</h4>
                <small>{user?.email}</small>
                <ul className="profile__follows">
                    <li>
                        <h4>{user?.following?.length}</h4>
                        <small>Following</small>
                    </li>
                    <li>
                        <h4>{user?.followers?.length}</h4>
                        <small>Followers</small>
                    </li>
                    <li>
                        <h4>0</h4>
                        <small>Likes</small>
                    </li>
                </ul>
                <div className="profile__actions-wrapper">
                    {user?._id === loggedInUserId ? <button className='btn' onClick={openEditProfileModal} >
                        Edit Profile
                    </button> : <button onClick={followUnfollowUser} className='btn dark'>{followsUser ? "Unfollow" : "Follow"}</button>}
                    {user?._id !== loggedInUserId && <Link to={`/messages/${user?._id}`} className='btn default'>Message</Link>}
                </div>
                <article className="profile__bio">
                    <p>{user?.bio}</p>
                </article>
            </div>
        </section>
    )

}
export default UserProfile