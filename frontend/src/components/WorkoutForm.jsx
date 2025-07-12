import { useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext";
import toast from 'react-hot-toast'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle ] = useState('')
    const [load, setLoad ] = useState('')
    const [reps, setReps ] = useState('')
    const [error, setError ] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('Please Sign in!!')
            return
        }

        setIsLoading(true)

        const workout = {title, load, reps}

        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(apiUrl + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields || [])
            toast.error(json.error || 'Failed to add workout')
        }

        if (response.ok) {
            setError(null)
            setEmptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            toast.success('Workout added successfully')
        }
        
        setIsLoading(false)
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            ></input>

            <label>Load (in kg)</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            ></input>

            <label>Reps</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            ></input>

            <button disabled={isLoading}>
                {isLoading ? <div className="spinner"></div> : 'Add Workout'}
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm