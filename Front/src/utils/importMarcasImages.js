// src/utils/importMarcasImages.js
export function importMarcasImages() {
  const req = require.context(
    '../assets/marcas', // ruta relativa al archivo
    false,               // no busca subcarpetas
    /\.(png|jpe?g|gif|svg)$/i
  );
  return req.keys().map(req); // devuelve la URL de cada imagen
}
