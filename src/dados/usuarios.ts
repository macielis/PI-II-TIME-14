/*
  Arquivo: usuarios.ts
  Autor: Gabriel Lara Jurgensen
  Descrição: perfis e contas fictícias mantidas em memória
  Esforço: -
 */

export type Perfil = 'Administrador' | 'Líder de Projeto' | 'Membro da Equipe';

export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  email: string;
  senha: string;
  perfil: Perfil;
}

// Contas ficticias
export const usuarios: readonly Usuario[] = [
  {
    id: 1,
    nome: 'Ana Beatriz Souza',
    usuario: 'ana.souza',
    email: 'ana.souza@exemplo.com',
    senha: 'Admin123!',
    perfil: 'Administrador',
  },
  {
    id: 2,
    nome: 'Rafael Menezes',
    usuario: 'rafael.menezes',
    email: 'rafael.menezes@exemplo.com',
    senha: 'Lider123!',
    perfil: 'Líder de Projeto',
  },
  {
    id: 3,
    nome: 'Beatriz Fernandes',
    usuario: 'beatriz.fernandes',
    email: 'beatriz.fernandes@exemplo.com',
    senha: 'Membro123!',
    perfil: 'Membro da Equipe',
  },
  {
    id: 4,
    nome: 'Diego Rocha Martins',
    usuario: 'diego.martins',
    email: 'diego.martins@exemplo.com',
    senha: 'Membro123!',
    perfil: 'Membro da Equipe',
  },
];
