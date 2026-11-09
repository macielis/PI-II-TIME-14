/*
  Arquivo: cadastro.js
  Autor: Gabriel Lara Jurgensen
  Descrição: validações da tela de cadastro (nome, e-mail, regras de
  senha e confirmação de senha).
  Esforço: 2h
 */

const formCadastro = document.getElementById('form-cadastro');
const campoNome = document.getElementById('campo-nome');
const campoEmail = document.getElementById('campo-email');
const campoSenha = document.getElementById('campo-senha');
const campoConfirmar = document.getElementById('campo-confirmar-senha');

// Validacoes do nome
function validarNome(valor) {
  const v = valor.trim().replace(/\s+/g, ' ');
  if (!v) return 'Informe seu nome completo.';
  if (v.length < 3) return 'O nome deve ter no mínimo 3 caracteres.';
  if (v.length > 100) return 'O nome deve ter no máximo 100 caracteres.';
  if (!REGEX_NOME.test(v)) return 'O nome deve conter apenas letras, espaços, hífen ou apóstrofo.';
  if (v.split(' ').length < 2) return 'Informe nome e sobrenome.';
  return '';
}

// Confirma se as senhas digitas são iguais
function validarConfirmacao(valor) {
  if (!valor) return 'Confirme a senha.';
  if (valor !== campoSenha.value) return 'As senhas não coincidem.';
  return '';
}

// Valida cada campo e limpa o erro ao digitar
campoNome.addEventListener('blur', () => validarCampo(campoNome, validarNome));
campoEmail.addEventListener('blur', () => validarCampo(campoEmail, validarEmail));
campoSenha.addEventListener('blur', () => validarCampo(campoSenha, validarSenhaForte));
campoConfirmar.addEventListener('blur', () => validarCampo(campoConfirmar, validarConfirmacao));

[campoNome, campoEmail, campoSenha, campoConfirmar].forEach((campo) => {
  campo.addEventListener('input', () => limparErro(campo));
});

// Se a senha mudar depois de confirmada, revalida a confirmação
campoSenha.addEventListener('input', () => {
  if (campoConfirmar.value) validarCampo(campoConfirmar, validarConfirmacao);
});

// Impede o envio enquanto houver dados inválidos
formCadastro.addEventListener('submit', (evento) => {
  evento.preventDefault();
  limparMensagemFormulario();

  const resultados = [
    [campoNome, validarCampo(campoNome, validarNome)],
    [campoEmail, validarCampo(campoEmail, validarEmail)],
    [campoSenha, validarCampo(campoSenha, validarSenhaForte)],
    [campoConfirmar, validarCampo(campoConfirmar, validarConfirmacao)],
  ];

  const primeiroInvalido = resultados.find(([, ok]) => !ok);
  if (primeiroInvalido) {
    primeiroInvalido[0].focus();
    return;
  }

  mostrarMensagemFormulario('Dados válidos! O envio ao servidor ainda não foi implementado.', 'sucesso');
});
