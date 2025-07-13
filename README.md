# Teste Técnico IrrigaGlobal

Backend em Node.js + Express + MySQL para gerenciamento de pivôs de irrigação e aplicações de irrigação. Foram utilizadas ferramentas de IA para auxiliar no desenvolvimento. Não consegui cumprir com o 1o requisito sem depender exclusivamente do uso de IA, então optei por não completá-lo. 

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
