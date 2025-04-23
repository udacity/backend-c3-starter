import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import AdminPanel from './pages/AdminPanel';
import LogoutPage from './pages/LogoutPage';
import WithNavBar from './components/WithNavBar';
import Unauthorized from './pages/Unauthorized';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';


function App() {

  const [user, setUser] = useState(() => {
    const access_token = localStorage.getItem('access_token');
        if (access_token) {
          try {
            const decoded = jwtDecode(access_token);
            return decoded;
          } catch (error) {
            console.error('Failed to decode access token', error);
            return null;}
        }
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/profile"
          element={
            <WithNavBar>
              <ProfilePage />
            </WithNavBar>
          }
        />
        <Route
          path="/tasks"
          element={
            <WithNavBar>
              <TasksPage />
            </WithNavBar>
          }
        />
        <Route
          path="/logout"
          element={
            <WithNavBar>
              <LogoutPage />
            </WithNavBar>
          }
        />
      <Route
    path="/admin"
    element={
      user?.roles?.includes('admin')
        ? <AdminPanel />
        : <Unauthorized />
    }
  />
      </Routes>
    </Router>
  );
}

export default App;
