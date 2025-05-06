import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ total }) => {
  const hasRendered = useRef(false); 

  // eslint-disable-next-line
  useEffect(() => {
    if (!window.paypal || hasRendered.current) return;

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
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
    }).render('#paypal-button-container');

    hasRendered.current = true; 
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
