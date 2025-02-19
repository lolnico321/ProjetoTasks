
# API de Tarefas (Task API)

Esta é uma API REST desenvolvida com Node.js, Express, PostgreSQL e Knex.js para gerenciar tarefas. Permite realizar operações CRUD (Criar, Ler, Atualizar e Excluir) em tarefas, incluindo validação simples de campos.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript.
- **Express.js** - Framework.
- **Knex.js** - Query builder para facilitar as interações com o banco de dados.
- **PostgreSQL** - Banco de dados.
- **CORS** - Permite que a API seja acessada por diferentes origens.
- **REST Client (VS Code)** - Para facilitar o teste das rotas.

## Requisitos

- Node.js instalado em sua máquina.
- PostgreSQL instalado e configurado (ou outro banco de dados como SQLite).

## Como Rodar o Projeto

### 1. **Clone o repositório**

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/task-api.git
cd task-api
```

### 2. **Instale as dependências**

Instale as dependências do projeto com o npm:

```bash
npm install
```

### 3. **Configure o banco de dados**

Edite o arquivo `knexfile.js` para configurar a conexão com o banco de dados.

```javascript
module.exports = {
  client: 'pg',  
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',  
    database: 'db_tasks', 
  },
  migrations: {
    directory: './db/migrations',
  },
};
```

### 4. **Crie o banco de dados e as tabelas**

Se você ainda não tiver criado o banco de dados `db_tasks`, crie-o no PostgreSQL:

```bash
psql -U postgres
CREATE DATABASE db_tasks;
```

Rode as migrações para criar a tabela `tasks`:

```bash
npx knex migrate:latest
```

### 5. **Inicie o servidor**

Agora, você pode iniciar o servidor com o seguinte comando:

```bash
node server.js
```

O servidor estará rodando na porta **3000**.

### 6. **Testando a API**

Você pode testar a API diretamente usando a extensão **REST Client** no Visual Studio Code através do arquivo ".rest".

### Endpoints Disponíveis

#### 1. **Criar uma nova tarefa**
- **URL**: `POST /tasks`
- **Descrição**: Cria uma nova tarefa.
- **Corpo da requisição**:
    ```json
    {
      "title": "Nova Tarefa",
      "description": "Descrição da tarefa",
      "status": "pending"
    }
    ```

#### 2. **Listar todas as tarefas**
- **URL**: `GET /tasks`
- **Descrição**: Retorna todas as tarefas cadastradas.

#### 3. **Buscar uma tarefa específica**
- **URL**: `GET /tasks/:id`
- **Descrição**: Retorna uma tarefa específica pelo ID.
- **Exemplo de URL**: `/tasks/1`

#### 4. **Atualizar uma tarefa**
- **URL**: `PUT /tasks/:id`
- **Descrição**: Atualiza os dados de uma tarefa.
- **Corpo da requisição**:
    ```json
    {
      "title": "Tarefa Atualizada",
      "description": "Descrição atualizada",
      "status": "in-progress"
    }
    ```
- **Exemplo de URL**: `/tasks/1`

#### 5. **Remover uma tarefa**
- **URL**: `DELETE /tasks/:id`
- **Descrição**: Remove uma tarefa específica pelo ID.
- **Exemplo de URL**: `/tasks/1`

## Testes de API com REST Client (VS Code)

Para testar as rotas atráves do arquivo ".rest" execute os seguintes comandos:

```rest
### Testando a criação de uma nova tarefa
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "status": "pending"
}

### Testando a listagem de todas as tarefas
GET http://localhost:3000/tasks

### Testando a busca por uma tarefa específica
GET http://localhost:3000/tasks/1

### Testando a atualização de uma tarefa
PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
  "title": "Tarefa Atualizada",
  "description": "Descrição atualizada",
  "status": "in-progress"
}

### Testando a remoção de uma tarefa
DELETE http://localhost:3000/tasks/1
```

Clique sobre cada requisição no VS Code e execute para testar os endpoints.




