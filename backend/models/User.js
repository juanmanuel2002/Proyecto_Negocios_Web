const mongoose = require('mongoose');
//const { use } = require('../routes/authRoutes');

const UserSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true }, 
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

const Usuario = mongoose.model('User',UserSchema,"usuarios"); 

module.exports = Usuario;
//module.exports = mongoose.model('User', UserSchema);
