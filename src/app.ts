/*
  Arquivo: app.ts
  Autor: Gabriel Lara Jurgensen
  Descrição: configuração do Express, das rotas e dos arquivos estáticos
  Esforço: -
 */

import express, { type ErrorRequestHandler } from 'express';
import path from 'node:path';
import { criarUsuariosRouter } from './routes/usuarios.routes';

export function criarApp() {
  const app = express();
  app.disable('x-powered-by');

  app.use(express.json({ limit: '16kb' }));
  app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.get('/', (_req, res) => res.redirect('/login.html'));
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use(criarUsuariosRouter());
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use((_req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada.' });
  });

  const tratarErro: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error.type === 'entity.parse.failed') {
      res.status(400).json({ erro: 'JSON inválido.' });
      return;
    }
    if (error.type === 'entity.too.large') {
      res.status(413).json({ erro: 'Requisição muito grande.' });
      return;
    }

    console.error('Falha interna da API.');
    res.status(500).json({ erro: 'Não foi possível concluir a operação. Tente novamente.' });
  };
  app.use(tratarErro);

  return app;
}
