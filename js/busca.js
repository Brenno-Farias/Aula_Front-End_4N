
export function processarTarefas(tarefas, { titulo = "", prioridade = "", status = "", ordemPrazo = "" }) {
  const termoTitulo = titulo.trim().toLowerCase();

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const atendeTitulo = !termoTitulo || tarefa.titulo.toLowerCase().includes(termoTitulo);
    const atendePrioridade = !prioridade || tarefa.prioridade === prioridade;
    const atendeStatus = !status || tarefa.status === status;

    return atendeTitulo && atendePrioridade && atendeStatus;

  });

  if (ordemPrazo) {
    return [...tarefasFiltradas].sort((a, b) => {
      const dataA = new Date(a.prazo);
      const dataB = new Date(b.prazo);

      if (ordemPrazo === "crescente") {
        return dataA - dataB;
      } else if (ordemPrazo === "decrescente") {
        return dataB - dataA;
      }
      return 0;
    });
  }

  return tarefasFiltradas;
}