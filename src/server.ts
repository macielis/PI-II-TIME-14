/*
  Arquivo: server.ts
  Autor: Gabriel Lara Jurgensen
  Descrição: inicialização do servidor HTTP da Reunião 4
  Esforço: -
 */

import { criarApp } from './app';

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT inválida.');
}

const server = criarApp().listen(port, () => {
  console.log(`API de login e usuários disponível em http://localhost:${port}`);
});

server.on('error', () => {
  console.error('Não foi possível abrir a porta do servidor.');
  process.exitCode = 1;
});

function encerrar() {
  server.close();
}

process.once('SIGINT', encerrar);
process.once('SIGTERM', encerrar);
