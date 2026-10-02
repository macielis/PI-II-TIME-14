const formulario = document.querySelector("#formCadastro");

const campoTitulo = document.querySelector("#titulo");
const campoDescricao = document.querySelector("#descricao");
const campoDemanda = document.querySelector("#demanda");
const campoPrioridade = document.querySelector("#prioridade");
const campoStatus = document.querySelector("#status");
const campoProjeto = document.querySelector("#projeto");
const campoResponsavel = document.querySelector("#responsavel");
const campoPrazo = document.querySelector("#prazo")

const erroTitulo = document.querySelector("#erroTitulo");
const erroDescricao = document.querySelector("#erroDescricao");
const erroDemanda = document.querySelector("#erroDemanda");
const erroPrioridade = document.querySelector("#erroPrioridade");
const erroStatus = document.querySelector("#erroStatus");
const erroProjeto = document.querySelector("#erroProjeto");
const erroResponsavel = document.querySelector("#erroResponsavel");
const erroPrazo = document.querySelector("#erroPrazo");

const painelResultado = document.querySelector("#painelResultado");
const resultado = document.querySelector("#resultado");

const camposComErro = [
    campoTitulo,
    campoDescricao,
    campoDemanda,
    campoPrioridade,
    campoStatus,
    campoProjeto,
    campoResponsavel,
    campoPrazo
];

const mensagensDeErro = [
    erroTitulo,
    erroDescricao,
    erroDemanda,
    erroPrioridade,
    erroStatus,
    erroProjeto,
    erroResponsavel,
    erroPrazo
];

function mostrarErro(campo, elementoErro, mensagem) {
    campo.classList.add("is-invalid");
    elementoErro.innerText = mensagem;
}

function limparErros() {
    camposComErro.forEach(function (campo) {
        campo.classList.remove("is-invalid");
    });

    mensagensDeErro.forEach(function (elementoErro) {
        elementoErro.innerText = "";
    });
}
formulario.addEventListener("reset", function (event) {
    limparErros();
    painelResultado.classList.add("d-none");
})

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    limparErros();

    const titulo = campoTitulo.value.trim();
    const descricao = campoDescricao.value.trim();
    const demanda = campoDemanda.value;
    const prioridade = campoPrioridade.value;
    const status = campoStatus.value;
    const projeto = campoProjeto.value;
    const responsavel = campoResponsavel.value;
    const prazo = campoPrazo.value;

    let formValido = true;

    if (titulo === ""){
        mostrarErro(campoTitulo, erroTitulo, "Título é obrigatório");
        formValido = false;
    }
    if (descricao === ""){
        mostrarErro(campoDescricao, erroDescricao, "Descrição é obrigatória");
        formValido = false;
    }
    if (demanda === "Selecione"){
        mostrarErro(campoDemanda, erroDemanda, "Selecione o tipo de demanda");
        formValido = false;
    }
    if (prioridade === "Selecione"){
        mostrarErro(campoPrioridade, erroPrioridade, "Selecione a prioridade");
        formValido = false;
    }
    if (status === "Selecione"){
        mostrarErro(campoStatus, erroStatus, "Selecione um status");
        formValido = false;
    }
    if (projeto === ""){
        mostrarErro(campoProjeto, erroProjeto, "Nome do projeto é obrigatório");
        formValido = false;
    }
    if (responsavel === ""){
        mostrarErro(campoResponsavel, erroResponsavel, "Nome do responsável é obrigatório");
        formValido = false;
    }
    if (prazo === ""){
        mostrarErro(campoPrazo, erroPrazo, "Prazo do projeto é obrigatório");
        formValido = false;
    }
    if (!formValido){
        painelResultado.classList.add("d-none");
        return;
    }
    const DemandaProjeto = {
        titulo, descricao, demanda, prioridade, status, projeto, responsavel, prazo
    };

    console.log(DemandaProjeto);
    resultado.innerText = JSON.stringify(DemandaProjeto,null,2);
    painelResultado.classList.remove("d-none");
})  
