import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUserById, updateUserService } from '../services'
import { uiSliceActions } from '../store/ui-slice'

const EditProfileModal = () => {

    const [userData, setUserData] = React.useState({ fullName: "", bio: "" })
    const dispatch = useDispatch()
    const userId = useSelector(state => state?.user?.currentUser?.id)

    const getUser = async () => {
        try {
            const res = await getUserById(userId)
            setUserData({ fullName: res?.data?.fullName, bio: res?.data?.bio })

        } catch (error) {
            console.log(error);

        }
    }

    const closeModal = (e) => {
        if (e.target.classList.contains("editProfile")) {
            dispatch(uiSliceActions.closeEditProfileModal())
        }
    }

    const updateUser = async () => {
        try {
            const res = await updateUserService(userData)
        } catch (error) {
            console.log(error);

        }
    }

    const changeUserData = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <section className="editProfile" onClick={e => closeModal(e)}>
            <div className="editProfile__container">
                <h3>Edit Profile</h3>
                <form onSubmit={updateUser}>
                    <input type="text" name='fullName' value={userData?.fullName} onChange={changeUserData} placeholder='Full Name' />
                    <input type="text" name='bio' value={userData?.bio} onChange={changeUserData} placeholder='Bio' />
                    <button type='submit' className='btn primary'>Update</button>
                </form>
            </div>

        </section>

    )
}

export default EditProfileModal