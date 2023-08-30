document.addEventListener(`DOMContentLoaded`, function () {
  // Variables

  const email = {
    nombre: ``,
    email: ``,
    mensaje: ``,
  };

  const inputName = document.querySelector(`#name`);
  const inputEmail = document.querySelector(`#email`);
  const inputMessage = document.querySelector(`#message`);
  const form = document.querySelector(`#form`);
  const btnSubmit = document.querySelector(`#btnSubmit`);
  const btnReset = document.querySelector(`#btnReset`);
  const spinner = document.querySelector(`#spinner`);

  // Eventos

  inputName.addEventListener(`blur`, validar);
  inputEmail.addEventListener(`blur`, validar);
  inputMessage.addEventListener(`blur`, validar);
  form.addEventListener(`submit`, enviarEmail);
  btnReset.addEventListener(`click`, (e) => {
    e.preventDefault();

    resetForm();
  });

  // Funciones

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add(`contacto__spinner--activo`);
    spinner.classList.remove(`contacto__spinner`);
    setTimeout(() => {
      spinner.classList.remove(`contacto__spinner--activo`);
      spinner.classList.add(`contacto__spinner`);

      resetForm();

      // Crear una alerta
      const alertaExito = document.createElement(`P`);
      alertaExito.classList.add(`contacto__exito`);
      alertaExito.textContent = "Mensaje enviado exitosamente";

      form.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 2000);

    }, 3000);
  }

  function validar(e) {
    const vacio = ``;
    const referencia = e.target.parentElement;

    if (e.target.value.trim() === vacio) {
      mostrarAlerta(`El ${e.target.name} es obligatorio`, referencia);
      email[e.target.name] = ``;
      comprobarEmail();

      return;
    }

    if (e.target.name === `email` && !validarEmail(e.target.value)) {
      mostrarAlerta(`El email no es valido`, referencia);
      email[e.target.name] = ``;
      comprobarEmail();

      return;
    }

    cleanAlert(referencia);

    // Asignar valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    cleanAlert(referencia);

    // Generar alerta en HTML
    const claseBorde = referencia.querySelector(`.form__field`);
    const error = document.createElement(`P`);

    claseBorde.classList.add(`form__field--error`);
    error.textContent = mensaje;
    error.classList.add(`form__error`);

    // Inyectar el error en el form
    referencia.appendChild(error);
  }

  function cleanAlert(referencia) {
    // Comprobar si ya existe una alerta
    const alerta = referencia.querySelector(`.form__error`);
    const alertaBorde = referencia.querySelector(`.form__field--error`);

    if (alerta) {
      alerta.remove();
      alertaBorde.classList.remove(`form__field--error`);
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);

    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes(``)) {
      btnSubmit.disabled = true;

      return;
    }
    btnSubmit.disabled = false;
  }

  function resetForm() {
    // Reiniciar el objeto
    email.nombre = ``;
    email.email = ``;
    email.mensaje = ``;

    form.reset();

    comprobarEmail();
  }
});
