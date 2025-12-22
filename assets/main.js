document.addEventListener('DOMContentLoaded',()=>{
  function showToast(message, type='success'){
    const el = document.getElementById('toast');
    if(!el) return;
    el.textContent = message;
    el.classList.remove('success','error');
    el.classList.add(type,'show');
    clearTimeout(el._t);
    el._t = setTimeout(()=>{ el.classList.remove('show'); }, 4000);
  }
  const form = document.querySelector('.newsletter-form');
  if(form){
    form.addEventListener('submit',()=>{
      alert('Gracias por suscribirte. (Demo)');
    });
  }

  // Contact form mailto handler
  const cform = document.getElementById('contact-form');
  if(cform){
    cform.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('cf-name')?.value?.trim() || '';
      const email = document.getElementById('cf-email')?.value?.trim() || '';
      const subject = document.getElementById('cf-subject')?.value?.trim() || 'Consulta desde la web';
      const message = document.getElementById('cf-message')?.value?.trim() || '';
      const to = 'glitchimpresiones@gmail.com';
      // Validación mínima
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        showToast('Ingresá un email válido para poder responderte.', 'error');
        return;
      }
      // Construir el cuerpo con CRLF y codificar completo
      const lines = [
        `Nombre: ${name}`,
        `Email: ${email}`,
        '',
        'Mensaje:',
        message
      ];
      const body = encodeURIComponent(lines.join('\r\n'));
      const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
      // Usar un enlace temporal para ejecutar el mailto dentro del gesto del usuario
      const a = document.createElement('a');
      a.href = href;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Abrí tu app de correo para completar el envío. Si no se abre, configurá tu cliente o Gmail como predeterminado.', 'success');
      // Limpiar el formulario tras el intento de abrir el mail
      setTimeout(()=>{ try{ cform.reset(); }catch(_){} }, 150);
    });
  }
});
