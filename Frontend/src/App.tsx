import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Dashboard from './modules/Dashboard/DashboardPage'
import LoginPage from './modules/Login/LoginPage'
import Sidebar from './components/navigation/SideBar' // Sidebar component
import UserPage from './modules/Dashboard/UserPage' // User page for profile details

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>(null) // Store user data after login

  // Function to handle login logic
  const handleLogin = (user: any) => {
    setIsLoggedIn(true)
    setUserData(user) // Store user data on successful login
  }

  // Function to handle logout logic
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(null) // Clear user data on logout
  }

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" /> // Redirect to dashboard if already logged in
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Dashboard Route - Protected Route */}
        <Route
          path="/dashboard"
          element={
            <div style={{ display: 'flex' }}>
              <Sidebar onLogout={handleLogout} />
              <div style={{ flex: 1 }}>
                <Dashboard onLogout={handleLogout} />
              </div>
            </div>
          }
        />

        {/* User Profile Route */}
        <Route
          path="/user"
          element={
            isLoggedIn ? (
              <div style={{ display: 'flex' }}>
                {/* Sidebar remains visible */}
                <Sidebar onLogout={handleLogout} />
                <div style={{ flex: 1 }}>
                  {/* Pass the userData to UserPage component */}
                  <UserPage user={userData} />
                </div>
              </div>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
