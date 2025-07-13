# Teste Técnico IrrigaGlobal

Backend em Node.js + Express + MySQL para gerenciamento de pivôs de irrigação e aplicações de irrigação. Foram utilizadas ferramentas de IA para auxiliar no desenvolvimento. Não consegui cumprir com o 1o requisito (autenticação de usuários) sem depender exclusivamente do uso de IA, então optei por não completá-lo. 

## Pré-requisitos

- Node.js
- MySQL Server
- Git (para clonar o projeto)
- Postman, Insomnia ou outro cliente de API para testar os endpoints

## Configure o banco de dados MySQL

1. Acesse seu MySQL via terminal ou MySQL Workbench.
2. Crie o banco e as tabelas usando o script fornecido abaixo:

```sql
CREATE DATABASE IF NOT EXISTS irrigation_db;

USE irrigation_db;

CREATE TABLE IF NOT EXISTS pivots (
    id VARCHAR(36) PRIMARY KEY,
    description VARCHAR(255),
    flowRate FLOAT,
    minApplicationDepth FLOAT,
    userId VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS irrigations (
    id VARCHAR(36) PRIMARY KEY,
    pivotId VARCHAR(36),
    applicationAmount FLOAT,
    irrigationDate DATE,
    userId VARCHAR(255),
    FOREIGN KEY (pivotId) REFERENCES pivots(id)
);
```

## Configure a conexão com o banco

Abra o arquivo `src/db.js` e **edite o usuário, senha e nome do banco** conforme seus dados locais:

```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'SEU_USUARIO',      // <--- troque para seu usuário do MySQL
  password: 'SUA_SENHA',    // <--- troque para sua senha do MySQL
  database: 'irrigation_db',// <--- troque se usar outro nome de banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

## Execute o servidor

```bash
node src/server.js
```
## Teste a API

Use Postman, Insomnia ou outro cliente HTTP para testar as rotas.

> **Observação:**  
> O campo `userId` deve ser preenchido com **qualquer string aleatória**, visto que não consegui implementar a autenticação de usuários

### Criar um Pivot

**POST** `/pivots`

**Body (JSON):**
```json
{
  "description": "Pivot de teste",
  "flowRate": 20.5,
  "minApplicationDepth": 5.0,
  "userId": "usuario_teste"
}
```

---

### Listar todos os Pivots

**GET** `/pivots`

---

### Buscar um Pivot por ID

**GET** `/pivots/{id}`

Exemplo:
```
GET /pivots/5e8bdf6e-7e94-4f6b-8a1e-1b2c3d4e5f6a
```

---

### Atualizar um Pivot

**PUT** `/pivots/{id}`

**Body (JSON):**
```json
{
  "description": "Pivot atualizado",
  "flowRate": 25.0,
  "minApplicationDepth": 6.0,
  "userId": "usuario_novo"
}
```

---

### Remover um Pivot

**DELETE** `/pivots/{id}`

---

### Criar uma Irrigação

**POST** `/irrigations`

**Body (JSON):**
```json
{
  "pivotId": "ID_DO_PIVOT_EXISTENTE",
  "applicationAmount": 10.5,
  "irrigationDate": "2025-07-13",
  "userId": "abc123"
}
```
> **Atenção:**  
> Substitua `"ID_DO_PIVOT_EXISTENTE"` pelo valor real do campo `id` de algum pivot já cadastrado.

---

### Listar todas as Irrigações

**GET** `/irrigations`

---

### Buscar uma Irrigação por ID

**GET** `/irrigations/{id}`

Exemplo:
```
GET /irrigations/1a2b3c4d-5e6f-7a8b-9c0d-ef1234567890
```

---

### Atualizar uma Irrigação

**PUT** `/irrigations/{id}`

**Body (JSON):**
```json
{
  "pivotId": "ID_DO_PIVOT_EXISTENTE",
  "applicationAmount": 12.3,
  "irrigationDate": "2025-07-14",
  "userId": "novo_usuario"
}
```

---

### Remover uma Irrigação

**DELETE** `/irrigations/{id}`
