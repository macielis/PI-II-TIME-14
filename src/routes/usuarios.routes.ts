/*
  Arquivo: usuarios.routes.ts
  Autor: Gabriel Lara Jurgensen
  Descrição: rotas de login e listagem pública de usuários
  Esforço: -
 */

import { Router } from 'express';
import { usuarios, type Usuario } from '../dados/usuarios';

function usuarioPublico({ id, nome, usuario, email, perfil }: Usuario) {
  return { id, nome, usuario, email, perfil };
}

export function criarUsuariosRouter() {
  const router = Router();

  router.post('/login', (req, res) => {
    const { email, identificador, usuario, senha } = req.body ?? {};
    const login = email === undefined ? identificador ?? usuario : email;

    if (typeof login !== 'string' || !login.trim() ||
        typeof senha !== 'string' || !senha.trim()) {
      res.status(400).json({ erro: 'Informe o e-mail ou usuário e a senha.' });
      return;
    }

    const chave = login.trim().toLowerCase();
    const encontrado = usuarios.find((conta) => {
      const corresponde = conta.email === chave ||
        (email === undefined && conta.usuario === chave);
      return corresponde && conta.senha === senha;
    });

    if (!encontrado) {
      res.status(401).json({ erro: 'E-mail/usuário ou senha inválidos.' });
      return;
    }

    res.status(200).json(usuarioPublico(encontrado));
  });

  router.get('/usuarios', (_req, res) => {
    res.status(200).json(usuarios.map(usuarioPublico));
  });

  return router;
}
