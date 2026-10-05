// Validações do formulário de filtros da tela "Listagem de Demandas".
// Autor: Ramiro Alexander

window.onload = function () {
  var formulario = document.getElementById("form-filtros");
  var campoBusca = document.getElementById("busca");
  var campoStatus = document.getElementById("status");
  var campoPrioridade = document.getElementById("prioridade");

  var erroBusca = document.getElementById("erro-busca");
  var erroStatus = document.getElementById("erro-status");
  var erroPrioridade = document.getElementById("erro-prioridade");

  function validar() {
    var valido = true;

    erroBusca.innerHTML = "";
    erroStatus.innerHTML = "";
    erroPrioridade.innerHTML = "";

    var valorBusca = campoBusca.value.trim();

    if (valorBusca.length > 0 && valorBusca.length < 2) {
      erroBusca.innerHTML = "Digite pelo menos 2 caracteres para buscar.";
      valido = false;
    }

    if (valorBusca.length > 60) {
      erroBusca.innerHTML = "A busca pode ter no máximo 60 caracteres.";
      valido = false;
    }

    var valorStatus = campoStatus.value;

    if (valorStatus !== "Todos" && valorStatus !== "Pendente" && valorStatus !== "Em andamento" && valorStatus !== "Concluída" && valorStatus !== "Atrasada") {
      erroStatus.innerHTML = "Selecione um status válido.";
      valido = false;
    }

    var valorPrioridade = campoPrioridade.value;

    if (valorPrioridade !== "Todas" && valorPrioridade !== "Crítica" && valorPrioridade !== "Alta" && valorPrioridade !== "Média" && valorPrioridade !== "Baixa") {
      erroPrioridade.innerHTML = "Selecione uma prioridade válida.";
      valido = false;
    }

    return valido;
  }

  campoBusca.addEventListener("input", validar);
  campoStatus.addEventListener("change", validar);
  campoPrioridade.addEventListener("change", validar);

  formulario.addEventListener("submit", function (evento) {
    if (!validar()) {
      evento.preventDefault();
    }
  });
};
