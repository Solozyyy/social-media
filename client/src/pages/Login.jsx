import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginService } from '../services'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'

const Login = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeInputHandler = (e) => {
        setUserData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    console.log(userData);

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const res = await loginService(userData)
            console.log(res);
            if (res?.success) {
                dispatch(userActions.changeCurrentUser(res?.data))
                localStorage.setItem("currentUser", JSON.stringify(res?.data))
                navigate('/')
            } else {
                setError("Login failed!")
            }
        } catch (error) {
            setError(error?.response?.data?.message || error.message)

        }
    }

    return (
        <section className="register">
            <div className="container register__container">
                <h2>Login</h2>
                <form onSubmit={loginUser}>
                    {error && <p className="form__error-message">{error}</p>}
                    <input type='text' name='email' placeholder='Email' onChange={changeInputHandler} autoFocus />

                    <div className="password__controller">
                        <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' onChange={changeInputHandler} autoFocus />
                        <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                    <button type='submit' className='btn primary'>Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login