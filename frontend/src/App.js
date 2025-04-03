import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordReset from './pages/ForgotPasswordReset';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={ <Main /> } />
                <Route path="/forgot-password" element={ <ForgotPassword /> } />
                <Route path="/reset-password/:token" element={ <ForgotPasswordReset /> } />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
