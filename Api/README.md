# API de Veículos

CRUD de veículos feito com Node e Express. Os dados ficam num arquivo JSON, então não precisa subir banco pra funcionar.

## Rodando

Precisa do Node 18+.

```bash
npm install
npm run dev
```

Sobe em `http://localhost:3000`. A porta pode ser trocada no `.env`.

Pra rodar sem o watch (modo "produção"):

```bash
npm start
```

## Endpoints

Base: `/api/veiculos`

| Método | Rota   | O que faz            |
|--------|--------|----------------------|
| GET    | `/`    | lista todos          |
| GET    | `/:id` | busca um pelo id     |
| POST   | `/`    | cria                 |
| PUT    | `/:id` | atualiza             |
| DELETE | `/:id` | remove               |

### Veículo

```json
{
  "id": "485cd274-fbc0-4897-aad6-ae3d12786572",
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2022
}
```

O `id` é um UUID gerado no servidor, não precisa mandar.

### Criando

```bash
curl -X POST http://localhost:3000/api/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"ABC-1234","chassi":"9BWZZZ377VT004251","renavam":"12345678901","modelo":"Civic","marca":"Honda","ano":2022}'
```

No POST todos os campos são obrigatórios. Se faltar algo vem um 400 com a lista:

```json
{
  "erros": [
    "O campo \"chassi\" é obrigatório.",
    "O campo \"ano\" é obrigatório."
  ]
}
```

No PUT dá pra mandar só o que mudou.

## Estrutura

```
src/
  database/   leitura/escrita do db.json
  models/     acesso aos dados
  controllers/lógica das rotas
  routes/     definição das rotas
  utils/      validação
server.js
```

## Observações

- O armazenamento em JSON é simples de propósito, pra dar conta do escopo sem dependência de banco. Não foi pensado pra concorrência pesada.
- Sem auth — é um CRUD direto.
```
