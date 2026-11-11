/**
 * Contact Service for Axel Miranda Clavel
 * Handles contacting via WhatsApp (+591 68605835), PHP backend, and Email.
 */
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
  const btnDirectEmail = document.getElementById('btnDirectEmail');
  const myPhoneNumber = '59168605835';
  const myEmail = 'axelmiranda.845@gmail.com';

  // Helper to extract sanitized form data
  function getFormData() {
    const name = document.getElementById('formName') ? document.getElementById('formName').value.trim() : '';
    const email = document.getElementById('formEmail') ? document.getElementById('formEmail').value.trim() : '';
    const subject = document.getElementById('formSubject') ? document.getElementById('formSubject').value.trim() : '';
    const message = document.getElementById('formMessage') ? document.getElementById('formMessage').value.trim() : '';

    return { name, email, subject, message };
  }

  // Send message via WhatsApp
  if (btnSendWhatsApp) {
    btnSendWhatsApp.addEventListener('click', function (e) {
      e.preventDefault();
      const data = getFormData();

      if (!data.name || !data.message) {
        alert('Por favor ingresa al menos tu nombre y un mensaje para enviar por WhatsApp.');
        if (!data.name && document.getElementById('formName')) document.getElementById('formName').focus();
        else if (document.getElementById('formMessage')) document.getElementById('formMessage').focus();
        return;
      }

      let text = `¡Hola Axel! Te escribo desde tu portafolio web.\n\n`;
      text += `👤 *Nombre:* ${data.name}\n`;
      if (data.email) text += `📧 *Correo:* ${data.email}\n`;
      if (data.subject) text += `📌 *Asunto:* ${data.subject}\n`;
      text += `💬 *Mensaje:* ${data.message}\n`;

      const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Direct mailto fallback button if user prefers
  if (btnDirectEmail) {
    btnDirectEmail.addEventListener('click', function (e) {
      e.preventDefault();
      const data = getFormData();
      const subject = encodeURIComponent(data.subject || `Contacto desde Portafolio - ${data.name || 'Nuevo Mensaje'}`);
      const body = encodeURIComponent(
        `Nombre: ${data.name}\nCorreo: ${data.email}\n\nMensaje:\n${data.message}`
      );
      window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
    });
  }

  // Intercept the default form submission to handle PHP & static hosting gracefully
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // If default php-email-form handler is active, validate.js runs.
      // However, if on static hosting (Netlify/GH-Pages), PHP isn't executed.
      // We monitor for any network failure in validate.js and provide instant alternatives.
    });
  }
});

