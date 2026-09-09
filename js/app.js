import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { processarTarefas } from "./busca.js";


const estado = {
  tarefas: [],
  filtros: {
    titulo: "",
    prioridade: "",
    status: "",
    ordemPrazo: ""
  }
};


function aplicarFiltrosEObrigaRenderizacao() {
  const resultado = processarTarefas(estado.tarefas, estado.filtros);

  if (resultado.length === 0) {
    renderizarEstado("vazio");
  } else {
    renderizarEstado("sucesso", resultado);
  }
}

async function inicializarApp() {
  renderizarEstado("carregando");

  try {
    estado.tarefas = await carregarTarefas();

    if (estado.tarefas.length === 0) {
      renderizarEstado("vazio");
    } else {
      aplicarFiltrosEObrigaRenderizacao();
    }
  } catch (erro) {
    let mensagemExibida = "Ocorreu uma falha desconhecida.";

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


const formFiltros = document.getElementById("form-filtros");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const selectStatus = document.getElementById("status");
const selectOrdemPrazo = document.getElementById("ordem-prazo");
const btnLimpar = document.getElementById("btn-limpar");

if (formFiltros) {

  formFiltros.addEventListener("submit", (evento) => {
    evento.preventDefault();
    aplicarFiltrosEObrigaRenderizacao();
  });


  if (inputTitulo) {
    inputTitulo.addEventListener("input", (evento) => {
      estado.filtros.titulo = evento.target.value;
      aplicarFiltrosEObrigaRenderizacao();
    });
  }

  if (selectPrioridade) {
    selectPrioridade.addEventListener("change", (evento) => {
      estado.filtros.prioridade = evento.target.value;
      aplicarFiltrosEObrigaRenderizacao();
    });
  }

  if (selectStatus) {
    selectStatus.addEventListener("change", (evento) => {
      estado.filtros.status = evento.target.value;
      aplicarFiltrosEObrigaRenderizacao();
    });
  }

  if (selectOrdemPrazo) {
    selectOrdemPrazo.addEventListener("change", (evento) => {
      estado.filtros.ordemPrazo = evento.target.value;
      aplicarFiltrosEObrigaRenderizacao();
    });
  }


  if (btnLimpar) {
    btnLimpar.addEventListener("click", () => {

      estado.filtros = {
        titulo: "",
        prioridade: "",
        status: "",
        ordemPrazo: ""
      };


      formFiltros.reset();


      aplicarFiltrosEObrigaRenderizacao();
    });
  }
}


const quadro = document.querySelector("[data-quadro]");

if (quadro) {
  quadro.addEventListener("click", (evento) => {
    const botao = evento.target.closest('[data-acao="ver-detalhes"]');
    if (!botao) return;

    const cartao = botao.closest("[data-tarefa-id]");
    if (!cartao) return;

    const id = cartao.dataset.tarefaId;
    const tarefaEncontrada = estado.tarefas.find((t) => String(t.id) === String(id));

    if (tarefaEncontrada) {
      console.log("Detalhes da tarefa:", tarefaEncontrada);
    }
  });
}


document.addEventListener("DOMContentLoaded", inicializarApp);