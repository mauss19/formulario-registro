// --- ⚙️ SELECCIÓN DE ELEMENTOS ---
console.log("¡Hola, el archivo JS está conectado con éxito!");
const form = document.querySelector('form'); 
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const confirmarPassword = document.getElementById('confirmar-password');

const errorNombre = document.getElementById('error-nombre');
const errorCorreo = document.getElementById('error-correo');
const errorPassword = document.getElementById('error-password');
const errorConfirmarPassword = document.getElementById('error-confirmar-password');

// --- 📋 FUNCIONES DE VALIDACIÓN ---

// 1. Validación de Nombre
function validarNombre() {
  const nombreValor = nombre.value.trim();

  if (nombreValor === '' || nombreValor.length < 3) {
    nombre.classList.add('invalid');
    nombre.classList.remove('valid');
    errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
    return false;
  } else {
    nombre.classList.add('valid');
    nombre.classList.remove('invalid');
    errorNombre.textContent = '';
    return true;
  }
}

// 2. Validación de Correo Electrónico
function validarCorreo() {
  const correoValor = correo.value.trim();
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexCorreo.test(correoValor)) {
    correo.classList.add('invalid');
    correo.classList.remove('valid');
    errorCorreo.textContent = 'Ingresa un correo electrónico válido.';
    return false;
  } else {
    correo.classList.add('valid');
    correo.classList.remove('invalid');
    errorCorreo.textContent = '';
    return true;
  }
}

// 3. Validación de Contraseña
function validarPassword() {
  const passwordValor = password.value; 
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!regexPassword.test(passwordValor)) {
    password.classList.add('invalid');
    password.classList.remove('valid');
    errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
    return false;
  } else {
    password.classList.add('valid');
    password.classList.remove('invalid');
    errorPassword.textContent = '';
    return true;
  }
}

// 4. Validación de Confirmar Contraseña
function validarConfirmarPassword() {
  const passwordValor = password.value;
  const confirmarValor = confirmarPassword.value;

  if (confirmarValor === '') {
    confirmarPassword.classList.add('invalid');
    confirmarPassword.classList.remove('valid');
    errorConfirmarPassword.textContent = 'Por favor, confirma tu contraseña.';
    return false;
  } else if (confirmarValor !== passwordValor) {
    confirmarPassword.classList.add('invalid');
    confirmarPassword.classList.remove('valid');
    errorConfirmarPassword.textContent = 'Las contraseñas no coinciden.';
    return false;
  } else {
    confirmarPassword.classList.add('valid');
    confirmarPassword.classList.remove('invalid');
    errorConfirmarPassword.textContent = '';
    return true;
  }
}

// --- 🎧 EVENTOS EN TIEMPO REAL (input) ---
nombre.addEventListener('input', validarNombre);
correo.addEventListener('input', validarCorreo);
password.addEventListener('input', validarPassword);
confirmarPassword.addEventListener('input', validarConfirmarPassword);

// Re-validar confirmación si el usuario edita la contraseña principal
password.addEventListener('input', () => {
  if (confirmarPassword.value !== '') {
    validarConfirmarPassword();
  }
});
/*
// --- 🗳️ EVENTO SUBMIT ÚNICO (Al enviar el formulario) ---
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Forzamos la validación de los 4 campos al intentar enviar
  const nombreEsValido = validarNombre();
  const correoEsValido = validarCorreo();
  const passwordEsValido = validarPassword();
  const confirmarEsValido = validarConfirmarPassword();

  // Si TODOS los campos devuelven true, el formulario es 100% seguro
  if (nombreEsValido && correoEsValido && passwordEsValido && confirmarEsValido) {
    alert('🎉 ¡Formulario completado correctamente! Cuenta lista para ser creada.');
    form.reset(); // Limpia los campos del formulario
    
    // Limpiamos los bordes verdes de éxito tras el reinicio
    [nombre, correo, password, confirmarPassword].forEach(input => input.classList.remove('valid'));
  } else {
    alert('❌ Por favor, corrige los errores en rojo antes de enviar.');
  }
});*/
// --- 🗳️ EVENTO SUBMIT ÚNICO (Al enviar el formulario) ---
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Forzamos la validación de los 4 campos al intentar enviar
  const nombreEsValido = validarNombre();
  const correoEsValido = validarCorreo();
  const passwordEsValido = validarPassword();
  const confirmarEsValido = validarConfirmarPassword();

  // Si TODOS los campos devuelven true, el formulario es 100% seguro
  if (nombreEsValido && correoEsValido && passwordEsValido && confirmarEsValido) {
    
    // 1. 📦 CREAMOS EL OBJETO CON LOS DATOS CAPTURADOS
    const datosUsuario = {
      nombre: nombre.value.trim(),
      correo: correo.value.trim(),
      password: password.value // En un proyecto real aquí se encriptaría
    };

    // 2. 🔄 CONVERTIMOS EL OBJETO A FORMATO JSON (TEXTO UNIVERSAL)
    const datosEnJSON = JSON.stringify(datosUsuario);

    // 3. 🖥️ LO MOSTRAMOS EN LA CONSOLA PARA VER CÓMO QUEDÓ
    console.log("¡Datos empaquetados en JSON listos para enviar!");
    console.log(datosEnJSON);

    alert('🎉 ¡Formulario completado! Datos convertidos a JSON con éxito.');
    
    form.reset(); // Limpia los campos del formulario
    
    // Limpiamos los bordes verdes de éxito tras el reinicio
    [nombre, correo, password, confirmarPassword].forEach(input => input.classList.remove('valid'));
  } else {
    alert('❌ Por favor, corrige los errores en rojo antes de enviar.');
  }
});