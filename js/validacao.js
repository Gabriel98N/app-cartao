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
      input.addEventListener("input", (e) => {
        const target = e.target;
        const mensagem = target.nextElementSibling;

        if (checarInput(inputs)) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }

        // Mensagem
        if (!target.value) {
          mensagem.style.display = "block";
        } else {
          mensagem.style.display = "none";
        }

        if (target.id === "numero-cartao") {
          const digito = 19;
          if (target.value.length > digito) {
            mensagem.style.display = "block";
            mensagem.innerText = `Número do cartão passou de ${digito} digítos`;
            target.value = "";
          } else {
            mensagem.innerText = "Campo obrigatório*";
          }
        }

        if (target.id === "nome-cartao") {
          const digito = 15;
          if (target.value.length > digito) {
            mensagem.style.display = "block";
            mensagem.innerText = `Digite um nome com até ${digito} caracteres`;
            target.value = "";
          } else {
            mensagem.innerText = "Campo obrigatório*";
          }
        }
      });
    });
  }
  validarFormulario();

  function zerarInput() {
    inputs.forEach((input) => {
      input.value = "";
      btn.disabled = true;
    });
  }

  return {
    zerarInput,
  };
}

export default Validacao;
