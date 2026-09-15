import { carregarTarefas } from "./api.js";
import { renderizarApp } from "./estados.js";
import { processarTarefas } from "./busca.js";

const estado = {
  tarefas: [],
  busca: "",
  prioridade: "",
  status: "",
  ordemPrazo: "",
  carregamento: false,
  erro: null
};

async function inicializarApp() {
  estado.carregamento = true;
  estado.erro = null;
  renderizarApp(estado);

  try {
    estado.tarefas = await carregarTarefas();
  } catch (erro) {
    if (erro.name === "TypeError") {
      estado.erro = "Falha de rede. Verifique sua conexão com a internet.";
    } else if (erro.name === "SyntaxError") {
      estado.erro = "Erro de formato. O arquivo JSON enviado é inválido.";
    } else if (erro.name === "ErroProtocolo") {
      estado.erro = `Erro de protocolo no servidor (${erro.message}).`;
    } else {
      estado.erro = erro.message || "Ocorreu uma falha desconhecida.";
    }
  } finally {
    estado.carregamento = false;
    renderizarApp(estado);
  }
}

const formFiltros = document.getElementById("form-filtros");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const selectStatus = document.getElementById("status");
const selectOrdemPrazo = document.getElementById("ordem-prazo");
const btnLimpar = document.getElementById("btn-limpar");

if (inputTitulo) {
  inputTitulo.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    renderizarApp(estado);
  });
}

if (selectPrioridade) {
  selectPrioridade.addEventListener("change", (evento) => {
    estado.prioridade = evento.target.value;
    renderizarApp(estado);
  });
}

if (selectStatus) {
  selectStatus.addEventListener("change", (evento) => {
    estado.status = evento.target.value;
    renderizarApp(estado);
  });
}

if (selectOrdemPrazo) {
  selectOrdemPrazo.addEventListener("change", (evento) => {
    estado.ordemPrazo = evento.target.value;
    renderizarApp(estado);
  });
}

if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {

    estado.busca = "";
    estado.prioridade = "";
    estado.status = "";
    estado.ordemPrazo = "";


    if (formFiltros) {
      formFiltros.reset();
    }

    renderizarApp(estado);
  });
}


const quadro = document.querySelector("[data-quadro]");

if (quadro) {
  quadro.addEventListener("click", (evento) => {
    const botao = evento.target.closest('[data-acao="ver-detalhes"]');
    if (!botao) return;

    const cartao = botao.closest("[data-tarefa-id]");
    if (!cartao) return;

    const id = cartao.dataset.tarefaId;

    const tarefasVisiveis = processarTarefas(estado.tarefas, {
      busca: estado.busca,
      prioridade: estado.prioridade,
      status: estado.status,
      ordemPrazo: estado.ordemPrazo
    });

    const tarefaEncontrada = tarefasVisiveis.find((t) => String(t.id) === String(id));

    if (tarefaEncontrada) {
      console.log("Detalhes da tarefa:", tarefaEncontrada);
    }
  });
}

document.addEventListener("DOMContentLoaded", inicializarApp);