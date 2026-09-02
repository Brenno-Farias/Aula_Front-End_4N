import { renderizarTarefas } from "./renderizacao.js";

export function renderizarEstado(estado, dados = null) {
  const statusRegiao = document.getElementById("status-regiao");
  const quadro = document.querySelector("[data-quadro]");

  if (!statusRegiao || !quadro) return;

  if (estado === "carregando") {
    statusRegiao.textContent = "Carregando tarefas...";
  } else if (estado === "sucesso") {
    const total = dados ? dados.length : 0;
    statusRegiao.textContent = `${total} tarefas carregadas com sucesso.`;
    renderizarTarefas(dados, quadro);
  } else if (estado === "vazio") {
    statusRegiao.textContent = "Nenhuma tarefa encontrada no sistema.";
    renderizarTarefas([], quadro);
  } else if (estado === "erro") {
    statusRegiao.textContent = `Erro ao carregar o quadro: ${dados}`;
  }
}