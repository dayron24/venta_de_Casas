const mongoose = require('mongoose');

const casaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  ubicacion: String,
  precio: Number,
  imagenes: [String], // Lista de imágenes
});

const Casa = mongoose.model('Casa', casaSchema);

module.exports = Casa;