/*
  Arquivo: login.js
  Autor: Gabriel Lara Jurgensen
  Descrição: validações da tela de login (campos obrigatórios,
  formato de e-mail/usuário e tamanho da senha).
  Esforço: 1h
 */

const formLogin = document.getElementById('form-login');
const campoUsuario = document.getElementById('campo-usuario');
const campoSenha = document.getElementById('campo-senha');

// Funcao para aceitar Nome de Usuario ou email
function validarUsuario(valor) {
  const v = valor.trim();
  if (!v) return 'Informe seu e-mail ou usuário.';
  if (v.includes('@')) return validarEmail(v);
  if (!REGEX_NOME.test(v)) { // Confirma por nome da pessoa ao inves de usuario, necessario adicionar campo de usuario no cadastro
    return 'Usuário deve ter de 3 a 30 caracteres (letras, números, ponto, hífen ou sublinhado).';
  }
  return '';
}

// Valida o tamanho da senha
function validarSenhaLogin(valor) {
  if (!valor) return 'Informe sua senha.';
  if (valor.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
  if (valor.length > 64) return 'A senha deve ter no máximo 64 caracteres.';
  return '';
}

// Valida cada campo e limpa o erro ao digitar
campoUsuario.addEventListener('blur', () => validarCampo(campoUsuario, validarUsuario));
campoSenha.addEventListener('blur', () => validarCampo(campoSenha, validarSenhaLogin));
campoUsuario.addEventListener('input', () => limparErro(campoUsuario));
campoSenha.addEventListener('input', () => limparErro(campoSenha));

// Impede o envio enquanto houver dados inválidos
formLogin.addEventListener('submit', (evento) => {
  evento.preventDefault();
  limparMensagemFormulario();

  const usuarioOk = validarCampo(campoUsuario, validarUsuario);
  const senhaOk = validarCampo(campoSenha, validarSenhaLogin);

  if (!usuarioOk || !senhaOk) {
    // Volta ao primeiro campo com erro
    (usuarioOk ? campoSenha : campoUsuario).focus();
    return;
  }

  // Envio ao servidor será implementado nas próximas etapas
  mostrarMensagemFormulario('Dados válidos! O envio ao servidor ainda não foi implementado.', 'sucesso');
});
