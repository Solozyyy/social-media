import React, { use, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../store/user-slice'

const LogOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.changeCurrentUser({}))
        localStorage.setItem("currentUser", null)
        navigate('/login')
    }, [])
    return (
        <div>LogOut</div>
    )
}

export default LogOut