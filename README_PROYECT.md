# Sabores Ocultos

Proyecto de e-commerce desarrollado con React y Node.js para la materia de Negocios Web.

---

## Descripción

Sabores Ocultos es una tienda en línea para la venta de productos gourmet y bebidas, con funcionalidades como:

- Catálogo de productos con filtros y búsqueda
- Carrito de compras y suscripciones
- Comparación de precios con La Europea
- Validación y captura de dirección antes de la compra
- Integración con PayPal para pagos
- Autenticación de usuarios y control de sesión
- Panel de administración (opcional)

---

## Tecnologías utilizadas

**Frontend:**
- React
- React Router DOM
- AOS (animaciones)
- Axios
- @mui/icons-material
- @fortawesome/fontawesome-free
- Firebase (auth y firestore)
- CSS personalizado

**Backend:**
- Node.js
- Express
- Firebase Admin
- Cors
- Dotenv

---

## Instalación

**Frontend:**
1. Entra a la carpeta del frontend:
   - `cd Proyecto_Negocios_Web`
2. Instala las dependencias:
   - `npm install`
   - O instala los paquetes principales:
     - `npm install aos axios react-icons react-router-dom @mui/icons-material @fortawesome/fontawesome-free firebase firebaseui`

**Backend:**
1. Clona la rama del backend:
2. Instala las dependencias:
   - `npm install`
   - O instala los paquetes principales:
     - `npm install express cors firebase dotenv firebase-admin react react-dom`

---

## Scripts disponibles

**Frontend:**
- `npm start` — Inicia la aplicación en modo desarrollo en [http://localhost:3000](http://localhost:3000)
- `npm test` — Ejecuta los tests en modo interactivo
- `npm run build` — Genera la versión optimizada para producción en la carpeta `build`
- `npm run eject` — Expone la configuración de Create React App (irreversible)

**Backend:**
- `nodemon start` — Inicia el servidor Express

---

## Funcionalidades principales

- **Catálogo y búsqueda:** Filtra productos por nombre y categoría.
- **Carrito y suscripciones:** Agrega productos y paquetes de suscripción.
- **Comparación de precios:** Compara precios con La Europea usando scrapping.
- **Dirección:** Formulario inteligente que autocompleta datos por código postal.
- **Pagos:** Integración con PayPal.
- **Autenticación:** Registro, login y control de sesión con Firebase.
- **Mensajes y validaciones:** Modales amigables para errores y confirmaciones.

---

## Estructura del proyecto

```
proyecto_negocios_web/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   └── App.js/
│
├── public/
│   └── imagenes/
│

├── package.json
└── README.md
```

---

## Notas

- El formulario de dirección utiliza la API de SEPOMEX para autocompletar datos.
- El footer es sticky y siempre se muestra al fondo de la página.
- El proyecto está preparado para despliegue en servicios como Vercel, Netlify o Firebase Hosting.

---

## Créditos

Desarrollado por el equipo de Sabores Ocultos para la materia de Negocios Web.

---

¿Tienes dudas o sugerencias? ¡Contáctanos!