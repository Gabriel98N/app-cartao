function Validacao(input, button) {
  const inputs = document.querySelectorAll(input);
  const btn = document.querySelector(button);

  function checarInput(inputs) {
    let campo = true;
    inputs.forEach((input) => {
      if (!input.value) {
        campo = false;
      }
    });
    return campo;
  }

  function validarFormulario() {
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (checarInput(inputs)) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
      });
    });
  }
  validarFormulario();

  function zerarInput() {
    btn.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.value = "";
      });
    });
  }

  return {
    zerarInput,
  };
}

export default Validacao;
