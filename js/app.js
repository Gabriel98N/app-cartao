import Validacao from "./validacao.js";

const el = (el) => document.querySelector(el);
const els = (els) => document.querySelectorAll(els);
const createEl = (tag) => document.createElement(tag);

const validacao = Validacao("#form [required]", ".btn-cadastrar");
const boxCartao = el(".box-cartao");
const buttonAdicionar = el(".adicionar-cartao");
const containerForm = el(".container-formulario");
const fecharForm = el(".fechar-form");
const buttonCadastrar = el(".btn-cadastrar");
const inputInstituicao = el("#instituicao");
const inputNumeroCartao = el("#numero-cartao");
const inputNomeCartao = el("#nome-cartao");
const ativo = "ativo";

const jsonCartao = async () => {
  const response = await fetch("js/cartoes.json");
  const dados = await response.json();
  return dados;
};

// funcão para fechar o formulario
const fechar = () => {
  containerForm.classList.remove(ativo);
  validacao.zerarInput();
};

function App() {
  const storageCartao = window.localStorage.getItem("cartao");
  let arrCartao = storageCartao ? JSON.parse(storageCartao) : [];

  function areaFechar() {
    // Fechar modal formulário
    fecharForm.addEventListener("click", (e) => {
      e.preventDefault();
      fechar();
    });

    function handleClickFechar(e) {
      if (e.target === this) fechar();
    }
    containerForm.addEventListener("click", handleClickFechar);
  }

  function removerCartao(card) {
    const excluirCartao = card.querySelector(".excluir-cartao");
    excluirCartao.addEventListener("click", (e) => {
      e.preventDefault();
      arrCartao = arrCartao.filter(({ cartao }) => {
        return cartao.id !== card.dataset.id;
      });
      localStorage.setItem("cartao", JSON.stringify(arrCartao));
      card.remove();
    });
  }

  function salvarCartao() {
    if (storageCartao) {
      arrCartao.forEach(({ cartao, numero_cartao, nome_cartao }) => {
        const card = el(".modelo-cartao .cartao").cloneNode(true);
        const logoBandeira = card.querySelector(".logo-bandeira img");
        const logoCartao = card.querySelector(".logo-cartao img");
        const numeroCartao = card.querySelector(".numero-cartao");
        const nomeCartao = card.querySelector(".nome-cartao");
        const nomeBandeira = cartao.nome_bandeira;

        card.setAttribute("data-id", cartao.id);
        card.setAttribute("data-bandeira", nomeBandeira.toLowerCase());
        logoBandeira.src = cartao.bandeira;
        logoCartao.src = cartao.logo !== null ? cartao.logo : "";
        numeroCartao.innerText = numero_cartao;
        nomeCartao.innerText = nome_cartao;
        boxCartao.prepend(card);
        removerCartao(card);
      });
    }
  }

  async function cadastrarCartao() {
    const getCartao = await jsonCartao();

    buttonAdicionar.addEventListener("click", (e) => {
      e.preventDefault();
      containerForm.classList.add(ativo);
    });

    buttonCadastrar.addEventListener("click", () => {
      const card = el(".modelo-cartao .cartao").cloneNode(true);
      const logoBandeira = card.querySelector(".logo-bandeira img");
      const logoCartao = card.querySelector(".logo-cartao img");
      const numeroCartao = card.querySelector(".numero-cartao");
      const nomeCartao = card.querySelector(".nome-cartao");

      getCartao.cartao.forEach((cartao) => {
        if (inputInstituicao.value === cartao.id) {
          const nomeBandeira = cartao.nome_bandeira;
          card.setAttribute("data-id", cartao.id);
          card.setAttribute("data-bandeira", nomeBandeira.toLowerCase());
          logoBandeira.src = cartao.bandeira;
          logoCartao.src = cartao.logo;
          numeroCartao.innerText = inputNumeroCartao.value;
          nomeCartao.innerText = inputNomeCartao.value.toUpperCase();

          arrCartao.push({
            cartao,
            numero_cartao: numeroCartao.innerText,
            nome_cartao: nomeCartao.innerText,
          });
          localStorage.setItem("cartao", JSON.stringify(arrCartao));
        }
      });
      boxCartao.prepend(card);
      removerCartao(card);
      fechar();
    });
  }

  function init() {
    cadastrarCartao();
    salvarCartao();
    areaFechar();
  }

  return {
    init,
  };
}

export default App;
