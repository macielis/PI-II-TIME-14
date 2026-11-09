# Testes

Na raiz do projeto, rode `npm.cmd ci` na primeira vez e depois `npm.cmd run dev`.

**Thunder Client** — use Body → JSON no POST.

- `POST http://localhost:3000/login` com `{"email":"ana.souza@exemplo.com","senha":"Admin123!"}` → **200**, perfil Administrador.
- Troque a senha por `Incorreta123!` → **401**. Apague o campo `senha` → **400**.
- `GET http://localhost:3000/usuarios` → **200**, sem senha ou hash.

**Tela** — abra `http://localhost:3000/login.html`. Entre com `rafael.menezes` e `Lider123!` para ver o perfil. Repita com `Incorreta123!` para ver o erro na página.
