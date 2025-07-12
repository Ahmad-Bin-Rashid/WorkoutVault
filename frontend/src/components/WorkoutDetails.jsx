import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import toast from 'react-hot-toast'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  // Edit states
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(workout.title)
  const [editLoad, setEditLoad] = useState(workout.load)
  const [editReps, setEditReps] = useState(workout.reps)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    const apiUrl = import.meta.env.VITE_API_URL || '';
    const response = await fetch(apiUrl + '/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
      toast.success('Workout deleted')
    } else {
      toast.error(json.error || 'Failed to delete workout')
    }
  }

  const handleUpdate = async () => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    if (!editTitle || !editLoad || !editReps) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)

    const updatedWorkout = { title: editTitle, load: editLoad, reps: editReps }
    const apiUrl = import.meta.env.VITE_API_URL || '';
    
    const response = await fetch(apiUrl + '/api/workouts/' + workout._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json })
      setIsEditing(false)
      toast.success('Workout updated successfully')
    } else {
      toast.error(json.error || 'Failed to update workout')
    }
    
    setIsLoading(false)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditTitle(workout.title)
    setEditLoad(workout.load)
    setEditReps(workout.reps)
  }

  return (
    <div className="workout-details">
      {!isEditing ? (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>Created: {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          
          <span className="material-symbols-outlined edit" onClick={() => setIsEditing(true)}>edit</span>
          <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
        </>
      ) : (
        <>
          <h4>Edit Workout</h4>
          <label>Title</label>
          <input 
            type="text" 
            className="edit-input"
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
          />
          
          <label>Load (kg)</label>
          <input 
            type="number" 
            className="edit-input"
            value={editLoad} 
            onChange={(e) => setEditLoad(e.target.value)} 
          />
          
          <label>Reps</label>
          <input 
            type="number" 
            className="edit-input"
            value={editReps} 
            onChange={(e) => setEditReps(e.target.value)} 
          />
          
          <div className="edit-actions">
            <button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Save'}
            </button>
            <button className="cancel" onClick={cancelEdit} disabled={isLoading}>Cancel</button>
          </div>
        </>
      )}
    </div>
  )
}

export default WorkoutDetails
