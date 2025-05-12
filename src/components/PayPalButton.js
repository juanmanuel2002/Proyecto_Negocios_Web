import React, { useEffect, useRef, useState } from 'react';
import { fetchPayPalClientId } from '../services/api';

const PayPalButton = ({ total }) => {
  const containerRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const clientId = await fetchPayPalClientId();

      const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
      if (existingScript) {
        existingScript.remove();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=MXN`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => {
        console.error('Error cargando el script de PayPal');
        alert('No se pudo cargar PayPal.');
      };

      document.body.appendChild(script);
    };

    addPayPalScript();
  }, []);

  useEffect(() => {
    if (sdkReady && window.paypal && containerRef.current) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'MXN',
                  value: total.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Pago completado por ${details.payer.name.given_name}`);
          });
        },
        onError: (err) => {
          console.error('Error en el pago:', err);
          alert('Hubo un problema con el pago. Inténtalo de nuevo.');
        },
      }).render(containerRef.current);
    }
  }, [sdkReady, total]);

  return <div ref={containerRef} id="paypal-button-container" />;
};

export default PayPalButton;
