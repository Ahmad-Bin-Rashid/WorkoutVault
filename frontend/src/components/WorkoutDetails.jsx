import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    
    if (!user) {
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
    }
  }


  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>Created: {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined delete" onClick={handleClick}>Delete</span>
      {/* <span className="material-symbols-outlined update" onClick={handleClick}>Update</span> */}
    </div>
  )
}

export default WorkoutDetails
