/*
  Arquivo: api.js
  Autor: Gabriel Lara Jurgensen
  Descrição: envio de formulários à API e exibição de erros
  Esforço: -
 */

async function enviarFormulario(formulario, rota, dados) {
 const botao=formulario.querySelector('button[type="submit"]');
 if(botao.disabled) return null;
 botao.disabled=true; formulario.setAttribute('aria-busy','true');
 try {
  const resposta=await fetch(rota,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(dados),signal:AbortSignal.timeout(15000)});
  const resultado=await resposta.json();
  if(!resposta.ok) throw new Error(resultado.erro || 'Não foi possível concluir a operação.');
  return resultado;
 } catch(error) {
  const mensagem=error.name==='TimeoutError' ? 'O servidor demorou para responder. Tente novamente.' : error instanceof TypeError ? 'Não foi possível conectar ao servidor. Abra a página pelo endereço da API.' : error.message;
  mostrarMensagemFormulario(mensagem,'erro'); return null;
 } finally {botao.disabled=false;formulario.removeAttribute('aria-busy');}
}
