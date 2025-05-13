import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Informational.css';

const TermsAndConditions = () => {
  return (
    <div>
      <Header />
      <div className="info-container">
        <h2>Términos y Condiciones</h2>
        <p>
          Al utilizar este sitio aceptas nuestros términos. Las cajas misteriosas de Sabores Ocultos están sujetas a disponibilidad y cambios sin previo aviso.
        </p>
        <p>
          No nos hacemos responsables por daños o pérdidas que resulten del mal uso de nuestros productos. El contenido de las cajas es sorpresa, y no se aceptan devoluciones.
        </p>

        <h3>Políticas de Devolución y Cancelación</h3>
        <p>
          1. **Cancelación de Pedidos:** Los pedidos pueden ser cancelados dentro de las primeras 24 horas después de realizar la compra. Pasado este tiempo, no se aceptarán solicitudes de cancelación.
        </p>
        <p>
          2. **Devoluciones:** Debido a la naturaleza de nuestros productos (cajas sorpresa), no se aceptan devoluciones, excepto en casos donde el producto llegue dañado o incompleto.
        </p>
        <p>
          3. **Reembolsos:** En caso de cancelación dentro del período permitido o productos dañados, el reembolso será procesado dentro de los 7 días hábiles posteriores a la aprobación de la solicitud.
        </p>
        <p>
          4. **Contacto:** Para iniciar un proceso de cancelación o devolución, por favor contáctanos a través de nuestro formulario en la sección de "Contacto" o envíanos un correo a soporte@saboresocultos.com.
        </p>
        <p>
          5. **Excepciones:** No se aceptarán devoluciones ni reembolsos en los siguientes casos:
          <ul>
            <li>Productos abiertos o usados.</li>
            <li>Daños ocasionados por el cliente.</li>
            <li>Solicitudes realizadas fuera del período permitido.</li>
          </ul>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;