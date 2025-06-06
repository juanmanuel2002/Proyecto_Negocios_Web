import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Tienda from './pages/Tienda';
import Suscripciones from './pages/Suscripciones';
import SobreNosotros from './pages/SobreNosotros';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordReset from './pages/ForgotPasswordReset';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './components/ScrollToTop';
import MisPedidos from './pages/MisPedidos'; 
import Carrito from './pages/Carrito';
import Paypal from './pages/Paypal';
import Perfil from './pages/Perfil';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <AuthProvider>
        <ThemeProvider>
             <CartProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/main" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/tienda" element={<Tienda />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/suscripciones" element={<Suscripciones />} />
                        <Route path="/nosotros" element={<SobreNosotros />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="__/auth/action/*" element={<ForgotPasswordReset />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/" element={<Navigate to="/main" />} />
                        <Route path="/carrito" element={<Carrito />} />
                        <Route path="/paypal" element={<Paypal />} />
                        <Route path="/mis-pedidos" element={<MisPedidos />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    </Routes>
                </Router>
            </CartProvider>
        </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
