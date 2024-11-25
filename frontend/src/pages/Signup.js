// library imports
import React, { useState } from 'react'

// local imports
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, loading, error } = useSignup()

    const signupHandler = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className='signup' onSubmit={signupHandler}>
            <h3>Signup</h3>
            <label>Email:</label>
            <input
                type='email'
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
            />
            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
            />
            <button disabled={loading}>Signup</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup