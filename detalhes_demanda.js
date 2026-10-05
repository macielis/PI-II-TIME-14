const formulario = document.querySelector("#form_comentario");
const campoComentario = document.querySelector("#comentario_id");
const erroComentario = document.querySelector("#erro_comentario");

function mostrarErro(campo, elementoErro, mensagem) {
    campo.classList.add("is-invalid");
    elementoErro.innerText = mensagem;
}

function limparErro() {
    campoComentario.classList.remove("is-invalid");
    erroComentario.innerText = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    limparErro();

    const comentario = campoComentario.value.trim();

    if (comentario === "") {
        mostrarErro(campoComentario, erroComentario, "O comentário é obrigatório!");
    } else if (comentario.length < 3) {
        mostrarErro(campoComentario, erroComentario, "O comentário deve ter pelo menos 3 caracteres");
    } else if (comentario.length > 500) {
        mostrarErro(campoComentario, erroComentario, "O comentário pode ter no máximo 500 caracteres");
    } else {
        /* aqui cria o objeto */
        const dadosComentario = {
            comentario: comentario,
            data: new Date().toISOString()
        };

        /* converte o objeto em JSON */
        const json = JSON.stringify(dadosComentario, null, 2);

        /* confere no console */
        console.log(dadosComentario);
        console.log(json);

        /* limpa a caixa de comentários */
        campoComentario.value = "";
    }
});

campoComentario.addEventListener("input", limparErro);