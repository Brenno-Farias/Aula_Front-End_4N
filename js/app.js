import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

// Variável para armazenar as tarefas carregadas em memória
let listaTarefas = [];

async function inicializarApp() {
  // 1. Estado de carregando deve ser ativado ANTES do await
  renderizarEstado("carregando");

  try {
    listaTarefas = await carregarTarefas();

    if (listaTarefas.length === 0) {
      renderizarEstado("vazio");
    } else {
      renderizarEstado("sucesso", listaTarefas);
    }
  } catch (erro) {
    let mensagemExibida = "Ocorreu uma falha desconhecida.";

    // Distinção de erros por erro.name
    if (erro.name === "TypeError") {
      mensagemExibida = "Falha de rede. Verifique sua conexão com a internet.";
    } else if (erro.name === "SyntaxError") {
      mensagemExibida = "Erro de formato. O arquivo JSON enviado é inválido.";
    } else if (erro.name === "ErroProtocolo") {
      mensagemExibida = `Erro de protocolo no servidor (${erro.message}).`;
    } else if (erro.message) {
      mensagemExibida = erro.message;
    }

    renderizarEstado("erro", mensagemExibida);
  }
}

// 2. Delegação de Eventos no Quadro (Requisito mantido da E2)
const quadro = document.querySelector("[data-quadro]");

if (quadro) {
  quadro.addEventListener("click", (evento) => {
    const botao = evento.target.closest('[data-acao="ver-detalhes"]');
    if (!botao) return;

    const cartao = botao.closest("[data-tarefa-id]");
    if (!cartao) return;

    const id = cartao.dataset.tarefaId;
    const tarefaEncontrada = listaTarefas.find((t) => String(t.id) === String(id));

    if (tarefaEncontrada) {
      console.log("Detalhes da tarefa:", tarefaEncontrada);
    }
  });
}

// 3. Execução inicial ao carregar o DOM (sem top-level await)
document.addEventListener("DOMContentLoaded", inicializarApp);