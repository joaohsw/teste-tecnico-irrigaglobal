const express = require('express');
const router = express.Router();
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pivots');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pivots WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Pivot não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.post('/', async (req, res) => {
  const { description, flowRate, minApplicationDepth, userId } = req.body;
  const id = uuidv4();
  try {
    await db.query(
      'INSERT INTO pivots (id, description, flowRate, minApplicationDepth, userId) VALUES (?, ?, ?, ?, ?)',
      [id, description, flowRate, minApplicationDepth, userId]
    );
    res.status(201).json({ id, description, flowRate, minApplicationDepth, userId });
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.put('/:id', async (req, res) => {
  const { description, flowRate, minApplicationDepth, userId } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE pivots SET description = ?, flowRate = ?, minApplicationDepth = ?, userId = ? WHERE id = ?',
      [description, flowRate, minApplicationDepth, userId, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pivot não encontrado.' });
    res.json({ id: req.params.id, description, flowRate, minApplicationDepth, userId });
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM pivots WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pivot não encontrado.' });
    res.json({ message: 'Pivot deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
});

module.exports = router;
