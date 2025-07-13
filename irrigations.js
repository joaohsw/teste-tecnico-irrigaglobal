const express = require('express');
const router = express.Router();
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM irrigations');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM irrigations WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Irrigation não encontrada.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.post('/', async (req, res) => {
  const { pivotId, applicationAmount, irrigationDate, userId } = req.body;
  const id = uuidv4();
  try {
    await db.query(
      'INSERT INTO irrigations (id, pivotId, applicationAmount, irrigationDate, userId) VALUES (?, ?, ?, ?, ?)',
      [id, pivotId, applicationAmount, irrigationDate, userId]
    );
    res.status(201).json({ id, pivotId, applicationAmount, irrigationDate, userId });
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.put('/:id', async (req, res) => {
  const { pivotId, applicationAmount, irrigationDate, userId } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE irrigations SET pivotId = ?, applicationAmount = ?, irrigationDate = ?, userId = ? WHERE id = ?',
      [pivotId, applicationAmount, irrigationDate, userId, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Irrigation não encontrada.' });
    res.json({ id: req.params.id, pivotId, applicationAmount, irrigationDate, userId });
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM irrigations WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Irrigation não encontrada.' });
    res.json({ message: 'Irrigation deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

module.exports = router;