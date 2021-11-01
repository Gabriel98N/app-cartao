import Validacao from "./validacao.js";

const el = (el) => document.querySelector(el);
const els = (els) => document.querySelectorAll(els);
const createEl = (tag) => document.createElement(tag);

const validacao = Validacao("#form [required]", ".btn-cadastrar");

function App() {
  const containerCard = el(".container-card");
  const addCartao = el(".adicionar-cartao");
  const inputInstituicao = el("#instituicao");
  const inputNumeroCartao = el("#numero-cartao");
  const inputNomeCartao = el("#nome-cartao");
  const formulario = el(".container-formulario");
  const fecharForm = el(".fechar-form");
  const btnCadastrar = el(".btn-cadastrar");
  const getArrCartao = window.localStorage.getItem("cartao");
  let arrCartao = getArrCartao ? JSON.parse(getArrCartao) : [];

  function areaFormulario() {
    const fechar = () => formulario.classList.remove("ativar");

    fecharForm.addEventListener("click", (e) => {
      e.preventDefault();
      fechar();
    });

    function handleClickFora(e) {
      if (e.target === this) fechar();
    }
    formulario.addEventListener("click", handleClickFora);
  }

  async function adicionarCartao() {
    const response = await fetch("js/cartoes.json");
    const { cartao } = await response.json();

    addCartao.addEventListener("click", (e) => {
      e.preventDefault();
      formulario.classList.add("ativar");
      validacao.zerarInput();
    });

    btnCadastrar.addEventListener("click", (e) => {
      e.preventDefault();
      formulario.classList.remove("ativar");

      const card = el(".modelo-cartao .box-card").cloneNode(true);
      const logoBandeira = card.querySelector(".logo-bandeira img");
      const logoCartao = card.querySelector(".logo-cartao img");
      const numeroCartao = card.querySelector(".numero-cartao");
      const nomeCartao = card.querySelector(".nome-cartao");

      containerCard.prepend(card);
      cartao.forEach((c) => {
        const id = c.id;
        const numCartao = inputNumeroCartao.value;
        const nomCartao = inputNomeCartao.value;

        if (inputInstituicao.value === id) {
          card.setAttribute("data-id", id);
          logoBandeira.src = c.bandeira;
          logoCartao.src = c.logo;
          numeroCartao.innerText = numCartao;
          nomeCartao.innerText = nomCartao.toUpperCase();
          arrCartao.push({
            c,
            numeroCartao: numCartao,
            nomeCartao: nomCartao.toUpperCase(),
          });
          window.localStorage.setItem("cartao", JSON.stringify(arrCartao));
        }
      });
      btnCadastrar.disabled = true;
      removerCartao();
    });
  }

  function salvarCartao() {
    arrCartao.forEach((cartao) => {
      const card = el(".modelo-cartao .box-card").cloneNode(true);
      const logoBandeira = card.querySelector(".logo-bandeira img");
      const logoCartao = card.querySelector(".logo-cartao img");
      const numeroCartao = card.querySelector(".numero-cartao");
      const nomeCartao = card.querySelector(".nome-cartao");

      card.setAttribute("data-id", cartao.c.id);
      logoBandeira.src = cartao.c.bandeira;
      logoCartao.src = cartao.c.logo;
      numeroCartao.innerText = cartao.numeroCartao;
      nomeCartao.innerText = cartao.nomeCartao;

      containerCard.prepend(card);
    });
    removerCartao();
  }

  async function removerCartao() {
    const excluirCard = containerCard.querySelectorAll(".excluir-cartao");
    const cards = containerCard.querySelectorAll(".box-card");
  }

  function init() {
    adicionarCartao();
    areaFormulario();
    salvarCartao();
  }

  return {
    init,
  };
}

export default App;
