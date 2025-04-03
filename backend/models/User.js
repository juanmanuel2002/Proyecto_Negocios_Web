const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true }, 
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema,"usuarios"); // Nombre de la colección en plural

module.exports = User;
