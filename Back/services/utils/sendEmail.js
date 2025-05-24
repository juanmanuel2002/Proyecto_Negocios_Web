import nodemailer from 'nodemailer';
import config from '../../config.js';

export const sendEmail = async (tipo,email,orderDetails,total,orderId, fechaCreacion,nombre, userAddress) => {
  try {
    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: config.email.user, 
        pass: config.email.pass 
      }
    });
    
    let subject = '';
    let html = '';

    if (tipo === 'bienvenida') {
      subject = '¡Bienvenido a Sabores Ocultos!';
      html = `
        <h1>¡Hola ${nombre}, bienvenido a Sabores Ocultos!</h1>
        <p>Gracias por registrarte en nuestra aplicación. Estamos emocionados de tenerte con nosotros.</p>
        <p>Explora nuestros productos y disfruta de una experiencia única.</p>
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>¡Esperamos verte pronto!</p>
      `;
    } else if (tipo === 'compra') {
      subject = 'Confirmación de compra';
      html = `
        <h1>¡Hola ${nombre}, Gracias por tu compra!</h1>
        <p>Gracias por confiar en nosotros. Aquí están los detalles de tu compra:</p>
        <ul>
          <li>ID de pedido: ${orderId}</li>
          <li>Fecha de compra: ${new Date(fechaCreacion).toLocaleDateString()}</li>
        </ul>
        <ul>
          ${orderDetails.map(item => `<li>${item.nombre} - Cantidad: ${item.cantidad}</li>`).join('')}
        </ul>
         <p><strong>Dirección de entrega:</strong></p>
        <ul>
          <li>Calle: ${userAddress.calle} ${userAddress.numeroExterior}${userAddress.numeroInterior ? ', Int. ' + userAddress.numeroInterior : ''}</li>
          <li>Colonia: ${userAddress.colonia}</li>
          <li>Delegación: ${userAddress.delegacion}</li>
          <li>Ciudad: ${userAddress.ciudad}</li>
          <li>Estado: ${userAddress.estado}</li>
          <li>Código Postal: ${userAddress.codigoPostal}</li>
          <li>País: ${userAddress.pais}</li>
        </ul>
        <p>Total: <strong>${total}</strong></p>
        <p>¡Esperamos verte pronto!</p>
      `;
    } else {
      throw new Error('Tipo de correo no soportado');
    }

    const mailOptions = {
        from: `"Sabores Ocultos" <${config.email.user}>`,
        to: email,
        subject,
        html
      };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
 } catch (error) {
    console.error(`Error al enviar el correo de tipo "${tipo}":`, error.message);
    throw new Error(`No se pudo enviar el correo de tipo "${tipo}"`);
  }
};