// src/utils/importProductosImages.js
export function importProductosImages() {
  const req = require.context(
    '../assets/productos', // ruta relativa
    false,                 // sin subcarpetas
    /\.(png|jpe?g|gif|svg)$/i
  );
  // Construye un objeto { nombreSinExt: url }
  return req.keys().reduce((imagesMap, path) => {
    const fileName = path.replace('./', '');         // e.g. "Cafe.jpg"
    const key        = fileName.split('.')[0];       // e.g. "Cafe"
    imagesMap[key]   = req(path);
    return imagesMap;
  }, {});
}
