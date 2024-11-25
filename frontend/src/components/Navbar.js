// library imports
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// local imports
import { useLogout } from '../hooks/useLogout'
import { isEmptyObject } from '../utils/helpers'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useSelector((state) => state.UserSlice)

    const logoutHandler = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {isEmptyObject(user) ?
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                        :
                        <div>
                            <span>{user.email}</span>
                            <button onClick={logoutHandler}>Logout</button>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Navbar