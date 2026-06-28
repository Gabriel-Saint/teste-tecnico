# Frontend — Veículos

Interface em Angular pra gerenciar veículos (listar, cadastrar, editar e excluir). Consome a API REST que está em [`../api`](../api).

## Rodando

Precisa do Node 18+ e da API rodando em `http://localhost:3000`.

```bash
npm install
npm start
```

Abre em `http://localhost:4200`.

A URL da API fica em `src/environments/environment.development.ts` (`apiUrl`). Se sua API estiver em outra porta, é só trocar lá.

## O que tem

- **Listagem** consumindo a API via `HttpClient` + `async pipe`, com estados de **carregando**, **erro** (com "tentar novamente") e **vazio**.
- **Cadastro e edição** no mesmo formulário (reaproveitado conforme a rota).
- **Reactive Forms** tipados com validação de placa, chassi, renavam e ano.
- **Exclusão** com diálogo de confirmação reutilizável.
- **Feedback** de sucesso e erro via snackbar.
- **Responsivo**: tabela no desktop, cards no mobile.
- **Angular Material** com tema customizado (Material 3).

## Stack

- Angular 21 (standalone, signals, control flow `@if`/`@for`)
- Angular Material
- RxJS

## Estrutura

Organizada por feature (padrão do style guide do Angular — sem pastas por tipo como `services/` ou `components/`):

```
src/app/
  veiculos/
    veiculo.ts            # model (interface Veiculo)
    veiculo-service.ts    # consumo da API
    veiculo-lista/        # tela de listagem
    veiculo-form/         # tela de cadastro/edição
  shared/
    confirmacao-dialog/   # diálogo de confirmação reutilizável
  app.routes.ts           # rotas (lazy loading)
  app.config.ts           # providers (router, http)
```

## Rotas

| Rota | Tela |
|------|------|
| `/veiculos` | listagem |
| `/veiculos/novo` | cadastro |
| `/veiculos/:id/editar` | edição |

## Acessibilidade

Componentes do Angular Material (acessíveis por padrão), `aria-label` nos botões de ícone, labels nos campos do formulário e `lang="pt-BR"`.

## Scripts

```bash
npm start     # ambiente de desenvolvimento
npm run build # build de produção
npm test      # testes unitários (Vitest)
```
