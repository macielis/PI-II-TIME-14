/*
  Arquivo: validacoes.js
  Autor: Gabriel Lara Jurgensen
  Descrição: funções reutilizáveis de validação e de exibição de mensagens
  de erro, usadas pelas telas de login e cadastro.
  Esforço: 2h
 */

// Email
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Nome usuario
const REGEX_USUARIO = /^[A-Za-z0-9._-]{3,30}$/;

// Nome pessoa
const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ' -]*$/;

// Mensagem de erro
function mostrarErro(campo, mensagem) {
  const span = document.getElementById('erro-' + campo.id);
  span.textContent = mensagem;
  campo.classList.add('campo-invalido');
  campo.setAttribute('aria-invalid', 'true');
}

function limparErro(campo) {
  const span = document.getElementById('erro-' + campo.id);
  span.textContent = '';
  campo.classList.remove('campo-invalido');
  campo.removeAttribute('aria-invalid');
}

function validarCampo(campo, funcaoValidadora) {
  const mensagem = funcaoValidadora(campo.value);
  if (mensagem) {
    mostrarErro(campo, mensagem);
    return false;
  }
  limparErro(campo);
  return true;
}

// Validacao do email
function validarEmail(valor) {
  const v = valor.trim();
  if (!v) return 'Informe o e-mail.';
  if (v.length > 100) return 'O e-mail deve ter no máximo 100 caracteres.';
  if (!REGEX_EMAIL.test(v)) return 'Formato de e-mail inválido. Exemplo: nome@exemplo.com';
  return '';
}

// Regras de senha para o cadastro
function validarSenhaForte(valor) {
  if (!valor) return 'Informe a senha.';
  if (valor.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
  if (valor.length > 60) return 'A senha deve ter no máximo 60 caracteres.';
  if (!/[A-Z]/.test(valor)) return 'A senha deve conter ao menos uma letra maiúscula.';
  if (!/[a-z]/.test(valor)) return 'A senha deve conter ao menos uma letra minúscula.';
  if (!/[0-9]/.test(valor)) return 'A senha deve conter ao menos um número.';
  if (!/[^A-Za-z0-9\s]/.test(valor)) return 'A senha deve conter ao menos um caractere especial (ex.: @, #, !).';
  return '';
}

// Mostra mensagem resultado do formulario
function mostrarMensagemFormulario(texto, tipo) {
  const caixa = document.getElementById('mensagem-formulario');
  caixa.textContent = texto;
  caixa.className = 'mensagem-formulario ' + tipo;
}

// Limpa a mensagem do formulario
function limparMensagemFormulario() {
  const caixa = document.getElementById('mensagem-formulario');
  caixa.textContent = '';
  caixa.className = 'mensagem-formulario';
}
