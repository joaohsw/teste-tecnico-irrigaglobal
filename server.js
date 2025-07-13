const app = require('./app');

const PORT = 3000; // ou outra porta que preferir

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});