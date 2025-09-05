import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(
        (state) => state.auth
    )

    const onLogout = ()=>{
        localStorage.removeItem('user')
         dispatch(logout())
         navigate('/login')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Goal setter</Link>
            </div>
            <ul>
                <li>
                    <FaUser />
                    <Link to='/register'>Register</Link>
                </li>
                {user ? <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt />
                        logout
                    </button>
                </li>:<li>
                    <FaSignOutAlt />
                    <Link to='/login'>Login</Link>
                </li>}
            </ul>
        </header>
    )
}
