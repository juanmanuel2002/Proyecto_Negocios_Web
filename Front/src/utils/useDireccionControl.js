import { useState } from 'react';

export function useDireccionControl() {
  const [showDireccionControl, setShowDireccionControl] = useState(false);

  const abrirDireccionControl = () => setShowDireccionControl(true);
  const cerrarDireccionControl = () => setShowDireccionControl(false);

  return {
    showDireccionControl,
    abrirDireccionControl,
    cerrarDireccionControl,
  };
}