import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

const Login = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login(email, password)
    }

  return (
    <form className='login' onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        <div>
        <button disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Log in'}
        </button>
        </div>
        <div className="forgot-password-link-container">
            <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
            </Link>
        </div>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login