
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages
import Home from './pages/Home.jsx';

// components
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

//hooks
import { useAuthContext } from './hooks/useAuthContext';

import { Toaster } from 'react-hot-toast';

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <Toaster position="top-center" />
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element= {user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element= {!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element= {!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;