// Autor: Felipe Ferles Moratori — Dashboard, Reunião 3.
const mensagem = document.querySelector("#mensagemdashboard");
const tabela = document.querySelector("#demandasrecentes");

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
    mensagem.focus();
}

// A consulta usa apenas as linhas que já existem no HTML.
function consultarDemandas() {
    mostrarMensagem("Estas são as demandas de exemplo do Dashboard. A listagem completa ainda não está integrada a esta versão.");
    tabela.scrollIntoView({ block: "center" });
    tabela.focus();
}

document.querySelector("#novademanda").addEventListener("click", function () {
    window.location.href = "cadastro-edicao-demanda.html";
});

document.querySelector("#vertodos").addEventListener("click", consultarDemandas);

document.querySelectorAll("[data-acao]").forEach(function (link) {
    link.addEventListener("click", function (evento) {
        evento.preventDefault();

        if (link.dataset.acao === "consultar") {
            consultarDemandas();
        } else if (link.dataset.acao === "inicio") {
            mensagem.hidden = true;
            window.scrollTo(0, 0);
        } else {
            // Impede que um link sem destino pareça executar uma ação.
            const nome = link.querySelector("strong") || link;
            mostrarMensagem(nome.textContent.trim() + ": esta tela ainda não está disponível nesta versão.");
        }
    });
});
