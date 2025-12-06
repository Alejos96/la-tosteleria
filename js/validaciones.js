// validaciones.js
// Validaciones del formulario de contacto

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  const nacimiento = document.getElementById('nacimiento');
  const edadInput = document.getElementById('edad');
  const edadVisible = document.getElementById('edadVisible');
  const messages = document.getElementById('formMessages');
  const rangoIngreso = document.getElementById('rangoIngreso');
  const rangoIngresoValor = document.getElementById('rangoIngresoValor');

  // Actualizar la etiqueta visible del rango de ingreso
  const rangoLabels = ['', 'Bajo', 'Medio Bajo', 'Medio', 'Medio Alto', 'Alto'];
  if(rangoIngreso && rangoIngresoValor){
    rangoIngreso.addEventListener('input', function(){
      rangoIngresoValor.textContent = rangoLabels[this.value];
    });
  }

  nacimiento.addEventListener('change', function(){
    const edad = calcularEdad(this.value);
    edadInput.value = edad;
    if(edadVisible){ edadVisible.value = edad; }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    messages.innerHTML = '';

    // Validación básica de campos obligatorios
    let valid = true;

    const email = document.getElementById('email');
    const nombre = document.getElementById('nombre');

    if(!email.value || !validarEmail(email.value)){
      valid = false;
      email.classList.add('is-invalid');
    } else { email.classList.remove('is-invalid'); }

    if(!nombre.value.trim()){
      valid = false;
      nombre.classList.add('is-invalid');
    } else { nombre.classList.remove('is-invalid'); }

    if(!nacimiento.value){
      valid = false;
      nacimiento.classList.add('is-invalid');
    } else { nacimiento.classList.remove('is-invalid'); }

    if(!valid){
      messages.innerHTML = '<div class="alert alert-danger">Por favor corrija los errores en el formulario.</div>';
      return;
    }

    // Si todo es válido, mostrar éxito y limpiar
    messages.innerHTML = '<div class="alert alert-success">Formulario enviado. Gracias.</div>';
    form.reset();
    edadInput.value = '';
    if(edadVisible){ edadVisible.value = ''; }
  });
});

function validarEmail(email){
  const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

function calcularEdad(fechaString){
  if(!fechaString) return '';
  const hoy = new Date();
  const nacimiento = new Date(fechaString);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if(m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())){
    edad--;
  }
  return edad;
}