import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import toast from 'react-hot-toast'

export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(apiUrl + '/api/user/login', {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error || 'Failed to login')
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            toast.success('Logged in successfully')
        }
    }

    return { login, isLoading , error }
}
