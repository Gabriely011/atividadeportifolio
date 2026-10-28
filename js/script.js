
/*
  ABOUT GABRIELY — JavaScript do portfólio.

  Uso de IA: ChatGPT auxiliou na organização e na escrita inicial
  do código. A autora deve revisar, testar e compreender as funções.
*/

// ELEMENTOS DO SITE

const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const greeting = document.querySelector("#greeting");
const currentYear = document.querySelector("#currentYear");
const backToTop = document.querySelector("#backToTop");

const revealCampaignButton = document.querySelector(
  "#revealCampaignButton"
);

const campaignImageContainer = document.querySelector(
  "#campaignImageContainer"
);

// MENU HAMBÚRGUER

// Abre ou fecha o menu e atualiza o estado acessível do botão.
function alternarMenu() {
  const menuEstaAberto = siteNav.classList.toggle("is-open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(menuEstaAberto)
  );

  menuToggle.setAttribute(
    "aria-label",
    menuEstaAberto ? "Fechar menu" : "Abrir menu"
  );
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", alternarMenu);

  // Fecha o menu quando uma seção é selecionada.
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// SAUDAÇÃO DINÂMICA

// Recebe uma hora e retorna a saudação correspondente.
function obterSaudacao(hora) {
  if (hora < 12) {
    return "Bom dia";
  } else if (hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

// Exibe a saudação com base no horário local do navegador.
function atualizarSaudacao() {
  const horaAtual = new Date().getHours();

  if (greeting) {
    greeting.textContent =
      `${obterSaudacao(horaAtual)}, seja bem-vindo(a)!`;
  }
}

atualizarSaudacao();

// MODO CLARO E ESCURO

// Aplica o tema e atualiza o botão de forma acessível.
function aplicarTema(temaEscuroAtivo) {
  document.body.classList.toggle(
    "dark-theme",
    temaEscuroAtivo
  );

  if (themeIcon) {
    themeIcon.textContent = temaEscuroAtivo ? "☀" : "☾";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-pressed",
      String(temaEscuroAtivo)
    );

    themeToggle.setAttribute(
      "aria-label",
      temaEscuroAtivo
        ? "Ativar modo claro"
        : "Ativar modo escuro"
    );
  }
}

// Guarda a escolha do tema quando o navegador permite.
function salvarTema(temaEscuroAtivo) {
  try {
    localStorage.setItem(
      "aboutGabrielyTema",
      temaEscuroAtivo ? "escuro" : "claro"
    );
  } catch (erro) {
    // O site continua funcionando sem armazenamento local.
  }
}

// Alterna o tema atual e salva a escolha.
function alternarTema() {
  const temaEscuroAtivo =
    !document.body.classList.contains("dark-theme");

  aplicarTema(temaEscuroAtivo);
  salvarTema(temaEscuroAtivo);
}

// Recupera a preferência salva, se existir.
function carregarTemaSalvo() {
  try {
    const temaSalvo = localStorage.getItem("aboutGabrielyTema");

    aplicarTema(temaSalvo === "escuro");
  } catch (erro) {
    aplicarTema(false);
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", alternarTema);
}

carregarTemaSalvo();

// REVELAR OU ESCONDER AS FOTOS DA CAMPANHA

// Alterna a exibição das duas imagens da campanha educativa.
function alternarImagensCampanha() {
  const deveRevelar = campaignImageContainer.hidden;

  campaignImageContainer.hidden = !deveRevelar;

  revealCampaignButton.setAttribute(
    "aria-expanded",
    String(deveRevelar)
  );

  revealCampaignButton.textContent = deveRevelar
    ? "OCULTAR IMAGENS DO PROJETO"
    : "REVELE A IMAGEM DO PROJETO";
}

if (revealCampaignButton && campaignImageContainer) {
  revealCampaignButton.addEventListener(
    "click",
    alternarImagensCampanha
  );
}

// ANO AUTOMÁTICO NO RODAPÉ

// Atualiza o ano sem precisar editar o HTML anualmente.
function atualizarAno() {
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

atualizarAno();

// BOTÃO VOLTAR AO TOPO

// Mostra o botão flutuante depois de uma rolagem da página.
function atualizarBotaoTopo() {
  if (backToTop) {
    backToTop.classList.toggle(
      "is-visible",
      window.scrollY > 450
    );
  }
}

// Retorna suavemente ao início da página.
function voltarAoTopo() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", atualizarBotaoTopo, {
  passive: true
});

if (backToTop) {
  backToTop.addEventListener("click", voltarAoTopo);
}

