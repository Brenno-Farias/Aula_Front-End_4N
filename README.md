# Quadro de Tarefas Acadêmico
### Dashboard Kanban modular, reativo e acessível para gerenciamento de tarefas em tempo real.

--

## Sobre o Projeto

O **Quadro de Tarefas Acadêmico** é uma aplicação web interativa no formato Kanban desenvolvida para organizar e monitorar o progresso de tarefas acadêmicas ou de desenvolvimento de software[cite: 11]. A aplicação resolve o desafio de gerenciar fluxos de trabalho através de uma interface visualmente dividida em quatro colunas de status: *A fazer*, *Em andamento*, *Em revisão* e *Concluída*[cite: 11].

### Principais Funcionalidades

* **Consumo Assíncrono de Dados:** Integração com a API nativa `fetch` para obtenção dinâmica de dados armazenados em formato JSON[cite: 10, 13].
* **Gerenciamento de Estado Único:** Controle centralizado dos filtros e dados por meio de um objeto de estado global reativo[cite: 14].
* **Busca, Filtragem e Ordenação Combinadas:** Processamento em tempo real permitindo filtrar tarefas por título, status e prioridade, além de ordenar prazos em ordem crescente ou decrescente sem alterar o array original.
* **Acessibilidade WCAG Nativa:** Comunicação de alterações de estado para tecnologias assistivas por meio de regiões vivas ARIA (`role="status"` e `aria-live="polite"`) e atualização estrita via `.textContent`[cite: 11, 17].
* **Interface Responsiva:** Layout que se adapta de dispositivos móveis a telas de alta resolução através de CSS Grid e Flexbox[cite: 12].

--

## Tecnologias Utilizadas

* **HTML5 Semântico:** Marcação estruturada com elementos semânticos e suporte a atributos de acessibilidade (ARIA)[cite: 11].
* **CSS3 Moderno:** Estilização baseada em variáveis CSS (`:root`), design responsivo via CSS Grid e Flexbox, além de efeitos visuais como `backdrop-filter`[cite: 12].
* **JavaScript ES6+ (Módulos):** Arquitetura desacoplada utilizando ES Modules (`import`/`export`), funções puras, manipulação assíncrona (`async/await`) e delegação de eventos[cite: 13, 14, 15, 17, 18].
* **JSON:** Formato leve para persistência e estruturação dos dados de tarefas[cite: 10].

--

## Pré-requisitos

Para rodar a aplicação localmente, é necessário dispor de:

1. **Navegador Web Moderno:** Versões recentes do Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari com suporte nativo a JavaScript ES6 Modules e `fetch` API[cite: 11, 13].
2. **Servidor HTTP Local:** Como o projeto utiliza chamadas `fetch` para carregar o arquivo `dados.json`, a aplicação precisa ser servida sob o protocolo `http://` ou `https://` (e não via `file://`) para evitar restrições de CORS.
   * *Exemplos recomendados:* Extensão **Live Server** no VS Code, pacote `http-server` via Node.js ou o módulo `http.server` do Python.

--

## Estrutura de Pastas

```text

.
├── index.html        # Estrutura semântica principal, formulário e quadro Kanban
├── style.css         # Variáveis de tema, layout responsivo e estilos dos cartões
├── dados.json        # Base de dados em formato JSON (8 tarefas iniciais)
└── js/
    ├── api.js          # Módulo de integração HTTP (fetch e tratamento de resposta)
    ├── app.js          # Orquestrador da aplicação, estado global e ouvintes DOM
    ├── busca.js        # Função pura para filtragem, busca e ordenação de tarefas
    ├── estados.js      # Gerenciador de telas da UI e mensagens aria-live
    └── renderizacao.js # Criação e inserção dos nós DOM dos cartões nas colunas