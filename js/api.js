export async function carregarTarefas() {
  const resposta = await fetch("./dados.json");

  if (!resposta.ok) {
    const erroProtocolo = new Error(`HTTP status: ${resposta.status}`);
    erroProtocolo.name = "ErroProtocolo";
    throw erroProtocolo;
    
  }

  const dados = await resposta.json();
  return dados.tarefas;

}