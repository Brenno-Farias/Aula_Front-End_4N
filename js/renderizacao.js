
export function criarCartao(tarefa) {
  const li = document.createElement("li");

  li.className = `card-${tarefa.status}`;

  const cartao = document.createElement("article");
  cartao.className = "cartao";
  cartao.dataset.tarefaId = tarefa.id;
  

  const titulo = document.createElement("h3");
  titulo.className = "titulo-cartao";
  titulo.textContent = tarefa.titulo;


  const info = document.createElement("p");
  info.className = "info-cartao";
  info.textContent = `Prioridade: ${tarefa.prioridade} | Prazo: ${tarefa.prazo}`;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "btn-detalhes";
  botao.dataset.acao = "ver-detalhes";

  const spanTexto = document.createElement("span");
  spanTexto.textContent = "Ver detalhes";
  botao.append(spanTexto);

  cartao.append(titulo, info, botao);
  li.append(cartao);

  return li;
  
}

export function renderizarTarefas(tarefas, quadro) {
  const colunas = quadro.querySelectorAll("[data-lista-status]");

  colunas.forEach((coluna) => {
    const statusColuna = coluna.dataset.listaStatus;
    const tarefasFiltradas = tarefas.filter((t) => t.status === statusColuna);

    if (tarefasFiltradas.length === 0) {
      const mensagemVazia = document.createElement("p");
      mensagemVazia.className = "lista-vazia";
      mensagemVazia.textContent = "Nenhuma tarefa nesta coluna.";
      coluna.replaceChildren(mensagemVazia);
    } else {
      const cartoes = tarefasFiltradas.map(criarCartao);
      coluna.replaceChildren(...cartoes);
      
    }
  });
}

export function instalarEventosDoQuadro(quadro, tarefas) {
  quadro.addEventListener("click", (evento) => {

    if (!(evento.target instanceof Element)) return;

    const botao = evento.target.closest('button[data-acao="ver-detalhes"]');

    if (!botao || !quadro.contains(botao)) return;

    const cartao = botao.closest("[data-tarefa-id]");
    const tarefaId = cartao?.dataset.tarefaId;

    const tarefa = tarefas.find((item) => item.id === tarefaId);
    if (!tarefa) return;

    console.log("Detalhes da tarefa:", tarefa);
  });
}