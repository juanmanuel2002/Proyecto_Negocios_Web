export function importCarouselImages() {
  const req = require.context(
    '../assets/carousel', // ruta relativa al archivo
    false,                // no busca subcarpetas
    /\.(png|jpe?g|gif|svg)$/i
  );
  return req.keys().map(req); // req(key) devuelve la URL del asset
}