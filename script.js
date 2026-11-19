

const botaoMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", () => {
  const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

  botaoMenu.setAttribute("aria-expanded", String(!aberto));
  menu.classList.toggle("aberto");
});



const projetos = [
  {
    nome: "Portfólio pessoal",
    tecnologia: "HTML",
    descricao: "Site desenvolvido para apresentar minhas habilidades."
  },
  {
    nome: "Calculadora",
    tecnologia: "JavaScript",
    descricao: "Projeto de uma calculadora simples."
  },
  {
    nome: "Sistema de notas",
    tecnologia: "Java",
    descricao: "Programa para calcular notas de alunos."
  },
  {
    nome: "Página web",
    tecnologia: "CSS",
    descricao: "Página criada para praticar estilos e layouts."
  }
];

const filtros = document.getElementById("filtros");
const listaProjetos = document.getElementById("lista-projetos");
const contagem = document.getElementById("contagem");
const semResultados = document.getElementById("sem-resultados");

const tecnologias = ["Todos", "HTML", "CSS", "JavaScript", "Java"];

function mostrarProjetos(filtro = "Todos") {
  listaProjetos.innerHTML = "";

  const encontrados = filtro === "Todos"
    ? projetos
    : projetos.filter(projeto => projeto.tecnologia === filtro);

  encontrados.forEach(projeto => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${projeto.nome}</h3>
      <p>${projeto.descricao}</p>
      <small>Tecnologia: ${projeto.tecnologia}</small>
    `;

    listaProjetos.appendChild(card);
  });

  contagem.textContent = `${encontrados.length} projeto(s) encontrado(s).`;
  semResultados.hidden = encontrados.length > 0;
}

tecnologias.forEach(tecnologia => {
  const botao = document.createElement("button");
  botao.textContent = tecnologia;

  botao.addEventListener("click", () => {
    mostrarProjetos(tecnologia);
  });

  filtros.appendChild(botao);
});

mostrarProjetos();



const formulario = document.getElementById("form-contato");
const motivo = document.getElementById("motivo");
const campoAssunto = document.getElementById("campo-assunto");
const assunto = document.getElementById("assunto");
const status = document.getElementById("status");
const modoTeste = document.getElementById("modo-teste");

motivo.addEventListener("change", () => {
  const outro = motivo.value === "Outro";

  campoAssunto.hidden = !outro;
  assunto.disabled = !outro;
  assunto.required = outro;

  if (!outro) {
    assunto.value = "";
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  let erros = [];

  if (nome.length < 2) {
    erros.push("Digite seu nome corretamente.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.push("Digite um e-mail válido.");
  }

  if (!motivo.value) {
    erros.push("Selecione o motivo do contato.");
  }

  if (motivo.value === "Outro" &&
      (assunto.value.trim().length < 5 ||
       assunto.value.trim().length > 100)) {
    erros.push("O assunto deve ter entre 5 e 100 caracteres.");
  }

  if (mensagem.length < 5) {
    erros.push("A mensagem deve ter pelo menos 5 caracteres.");
  }

  if (erros.length > 0) {
    document.getElementById("resumo-erros").hidden = false;
    document.getElementById("resumo-erros").innerHTML =
      erros.map(erro => `<p>${erro}</p>`).join("");

    status.textContent = "Corrija os erros antes de enviar.";
    return;
  }

  document.getElementById("resumo-erros").hidden = true;

  if (modoTeste.value === "sucesso") {
    status.textContent = "Mensagem enviada com sucesso! (Simulação)";
    formulario.reset();
    campoAssunto.hidden = true;
    assunto.disabled = true;
  } else {
    status.textContent = "Falha ao enviar a mensagem. Tente novamente.";
  }
});
