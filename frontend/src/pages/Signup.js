import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [ errors, setErrors ] = useState(null)
    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (password !== password2) {
          setErrors('Both Passwords do not match!!')
        }
        else {
          await signup(username, email, password)
          setErrors(error)
        }
    }

  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Username</label>
        <input type="text" 
          onChange={(e) => setUsername(e.target.value)} 
          onPaste={(e) => setUsername(e.target.value)} 
          value={username} 
          required/>

        <label>Email</label>
        <input type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          onPaste={(e) => setEmail(e.target.value)}
          value={email} 
          required/>

        <label>Password</label>
        <input type="password"
          onChange={(e) => setPassword(e.target.value)}
          onPaste={(e) => setPassword(e.target.value)}
          value={password} required/>

        <label>Confirm Password</label>
        <input type="password" 
          onChange={(e) => setPassword2(e.target.value)} 
          onPaste={(e) => setPassword2(e.target.value)}
          value={password2} 
          required/>

        <button disabled={isLoading}>Sign up</button>
        {errors && <div className="error">{errors}</div>}
    </form>
  )
}

export default Signup