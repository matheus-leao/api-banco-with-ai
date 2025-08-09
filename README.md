# API Banco com Express

Esta API permite realizar operações de login, registro de usuários, consulta de usuários e transferência de valores, com regras básicas de negócio. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   ```
2. Instale as dependências:
   ```sh
   npm install express swagger-ui-express
   ```

## Estrutura de Diretórios

- `controller/` - Lógica dos endpoints
- `service/` - Regras de negócio
- `model/` - Dados em memória
- `app.js` - Configuração dos middlewares e rotas
- `server.js` - Inicialização do servidor
- `swagger.json` - Documentação da API

## Como executar

```sh
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register` - Registro de usuário
- `POST /login` - Login de usuário
- `GET /users` - Consulta de usuários
- `POST /transfer` - Realiza transferência
- `GET /transfers` - Consulta transferências

## Regras de Negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

Para testar a API com Supertest, importe o `app.js` em seus testes sem executar o método `listen()`.

---

API desenvolvida para fins de aprendizado de testes e automação.
