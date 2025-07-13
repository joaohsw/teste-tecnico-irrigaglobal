const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',        
  user: 'seuusuario', // altere para o seu usuario do mySQL
  password: 'suasenha', // altere para a sua senha do mySQL       
  database: 'irrigation', // altere para o nome da sua db  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;