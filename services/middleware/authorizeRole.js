export const authorizeRole = (requiredRole) => (req, res, next) => {
    const { role } = req.user; 
    if (role !== requiredRole) {
        return res.status(403).json({ error: 'No tienes permiso para acceder a este recurso' });
    }
    next(); // Si el rol coincide, continuar con el siguiente middleware o controlador
};