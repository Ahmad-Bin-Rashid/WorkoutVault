import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        try {
            const response = await fetch('/api/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            const json = await response.json()

            if (!response.ok) {
                toast.error(json.error)
            } else {
                setMessage(json.message)
                toast.success('Password reset link sent!')
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Forgot Password</h3>
            <p className="forgot-password-desc">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <label>Email address:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                required
            />
            <div>
                <button disabled={isLoading}>
                    {isLoading ? <div className="spinner"></div> : 'Send Reset Link'}
                </button>
            </div>
            
            {message && <div className="form-message">
                <span className="material-symbols-outlined info-icon">info</span> 
                 <span> {message}</span>
                </div>}

            <div className="back-to-login">
                <Link className="back-to-login-link" to="/login">
                    Back to Login
                </Link>
            </div>
        </form>
    )
}

export default ForgotPassword
