import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const ResetPassword = () => {
    const { id, token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(`/api/user/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })

            const json = await response.json()

            if (!response.ok) {
                toast.error(json.error)
            } else {
                setSuccess(true)
                toast.success('Password updated successfully!')
                setTimeout(() => navigate('/login'), 3000)
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="login reset-success-container">
                <h3 className="success-heading">Success!</h3>
                <p className="success-message">Your password has been successfully updated.</p>
                <Link to="/login" className="login-link">Click here to log in</Link>
            </div>
        )
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Reset Password</h3>
            <p className="forgot-password-desc">
                Enter your new password below.
            </p>

            <label>New Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required
            />
            <div>
                <button disabled={isLoading}>
                    {isLoading ? <div className="spinner"></div> : 'Update Password'}
                </button>
            </div>
        </form>
    )
}

export default ResetPassword
