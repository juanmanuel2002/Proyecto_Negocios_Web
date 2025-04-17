import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const MainSkeleton = () => {
  return (
    <div className="skeleton-container">
      {/* Encabezado */}
      <div className="header">
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="circular" width={50} height={50} />
      </div>

      {/* Galería de imágenes */}
      <div className="gallery">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={200} height={150} />
        ))}
      </div>

      {/* Menú lateral derecho */}
      <div className="sidebar">
        {["Inicio", "Pedidos", "Artículos", "Novedades", "Favoritos", "Historial", "Cerrar sesión"].map((item, index) => (
          <Skeleton key={index} variant="text" width={150} height={30} />
        ))}
      </div>
    </div>
  );
};

export default MainSkeleton;
