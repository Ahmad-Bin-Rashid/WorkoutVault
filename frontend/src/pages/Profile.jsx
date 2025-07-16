import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import toast from 'react-hot-toast'

const Profile = () => {
    const { user, dispatch } = useAuthContext()
    const { logout } = useLogout()

    const [username, setUsername] = useState(user?.username || '')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!user) return

        setIsLoading(true)

        const updateData = {}
        if (username !== user.username) updateData.username = username
        if (password) updateData.password = password

        if (Object.keys(updateData).length === 0) {
            toast('No changes made', { icon: 'ℹ️' })
            setIsLoading(false)
            return
        }

        const apiUrl = import.meta.env.VITE_API_URL || ''
        const response = await fetch(apiUrl + '/api/user/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updateData)
        })

        const json = await response.json()

        if (!response.ok) {
            toast.error(json.error || 'Failed to update profile')
        } else {
            // Update local storage and context
            const updatedUser = { ...user, username: json.username }
            localStorage.setItem('user', JSON.stringify(updatedUser))
            dispatch({ type: 'LOGIN', payload: updatedUser })
            
            toast.success('Profile updated successfully')
            setPassword('')
        }

        setIsLoading(false)
    }

    const handleDelete = async () => {
        if (!user) return

        if (!window.confirm("Are you sure you want to delete your account? This will also permanently delete all your workouts. This action cannot be undone.")) {
            return
        }

        setIsDeleting(true)

        const apiUrl = import.meta.env.VITE_API_URL || ''
        const response = await fetch(apiUrl + '/api/user/profile', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (!response.ok) {
            const json = await response.json()
            toast.error(json.error || 'Failed to delete account')
            setIsDeleting(false)
        } else {
            toast.success('Account deleted')
            logout()
        }
    }

    return (
        <div className="profile-container">
            <form className="profile-form" onSubmit={handleUpdate}>
                <h3>Account Settings</h3>

                <label>Username</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>New Password</label>
                <input 
                    type="password" 
                    placeholder="Leave blank to keep current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button disabled={isLoading}>
                    {isLoading ? <div className="spinner"></div> : 'Update Profile'}
                </button>
            </form>

            <div className="danger-zone">
                <h4>Warning!</h4>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="delete-btn" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? <div className="spinner"></div> : 'Delete Account'}
                </button>
            </div>
        </div>
    )
}

export default Profile
