

import { tarefas } from "./dados.js";
import { renderizarTarefas, instalarEventosDoQuadro } from "./renderizacao.js";

document.addEventListener("DOMContentLoaded", () => {
  const quadro = document.querySelector("[data-quadro]");

  if (!quadro) {
    throw new Error("Contêiner [data-quadro] não encontrado.");
  }

  instalarEventosDoQuadro(quadro, tarefas);

  renderizarTarefas(tarefas, quadro);
});