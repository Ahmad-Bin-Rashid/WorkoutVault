import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { theme, toggleTheme } = useContext(ThemeContext)

    const handleClick = () => {
        logout()
    }

    

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>WorkoutVault</h2>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>
                            <Link to="/profile">{user.username}</Link>
                            </span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Log in</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'light' ? 
                            <span className="material-symbols-outlined">dark_mode</span> : 
                            <span className="material-symbols-outlined">light_mode</span>
                        }
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar