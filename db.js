const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',        
  user: 'usuario', // altere para o seu usuario/senha do mySQL
  password: 'senha',       
  database: 'irrigation',  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;