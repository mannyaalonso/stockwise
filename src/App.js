import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import { CheckSession } from './services/Auth'
import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import FourOhFour from './pages/404'
import { useNavigate } from 'react-router-dom'

function App() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const handleLogOut = () => {
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem("userId")
        localStorage.removeItem("email")
        localStorage.removeItem("watchlistId")
        navigate('/')
    }

    const checkToken = async () => {
        const user = await CheckSession()
        setUser(user)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            checkToken()
        }
    }, [])

    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn setUser={setUser} />} />
                <Route path='/registration' element={<Registration />}  />
                <Route
                    path='/dashboard'
                    element={
                        <Dashboard user={user} handleLogOut={handleLogOut} />
                    }
                />
                <Route path='*' element={<FourOhFour />} />
            </Routes>
        </main>
    )
}

export default App
