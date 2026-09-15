import { renderizarTarefas } from "./renderizacao.js";
import { processarTarefas } from "./busca.js";

export function renderizarApp(estado) {
  const statusRegiao = document.getElementById("status-regiao");
  const quadro = document.querySelector("[data-quadro]");

  if (!statusRegiao || !quadro) return;


  if (estado.carregamento) {
    statusRegiao.textContent = "Carregando tarefas...";
    renderizarTarefas([], quadro);
    return;
  }


  if (estado.erro) {
    statusRegiao.textContent = `Erro ao carregar o quadro: ${estado.erro}`;
    renderizarTarefas([], quadro);
    return;
  }

  const totalOriginal = estado.tarefas.length;


  if (totalOriginal === 0) {
    statusRegiao.textContent = "Nenhuma tarefa encontrada no sistema.";
    renderizarTarefas([], quadro);
    return;
  }


  const tarefasVisiveis = processarTarefas(estado.tarefas, {
    busca: estado.busca,
    prioridade: estado.prioridade,
    status: estado.status,
    ordemPrazo: estado.ordemPrazo
  });

  const totalVisiveis = tarefasVisiveis.length;


  renderizarTarefas(tarefasVisiveis, quadro);


  if (totalVisiveis === 0) {
    statusRegiao.textContent = `Nenhum resultado encontrado para os filtros aplicados (0 de ${totalOriginal} tarefas).`;
  } else {
    statusRegiao.textContent = `Exibindo ${totalVisiveis} de ${totalOriginal} tarefas.`;
  }
}