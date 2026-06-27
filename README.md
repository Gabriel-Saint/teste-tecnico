# Desafio — CRUD de Veículos

Aplicação de cadastro de veículos: uma API REST em Node/Express e um frontend em Angular que consome essa API.

O repositório tem dois projetos:

```
api/   backend em Node + Express (dados em arquivo JSON)
web/   frontend em Angular
```

Cada um tem seu próprio README com os detalhes.

## Rodando

Suba os dois em terminais separados.

**Backend**

```bash
cd api
npm install
npm run dev
```

Sobe em `http://localhost:3000`.

**Frontend**

```bash
cd web
npm install
npm start
```

Sobe em `http://localhost:4200` e consome a API acima.

## Stack

- **Backend:** Node, Express, armazenamento em arquivo JSON
- **Frontend:** Angular 16+, Angular Material
