const express = require('express');
const router = express.Router();
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

// GET /pivots - listar todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pivots');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pivots.' });
  }
});

// GET /pivots/:id - buscar por id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pivots WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Pivot não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pivot.' });
  }
});

// POST /pivots - criar novo
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
    res.status(500).json({ error: 'Erro ao criar pivot.' });
  }
});

// PUT /pivots/:id - atualizar
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
    res.status(500).json({ error: 'Erro ao atualizar pivot.' });
  }
});

// DELETE /pivots/:id - deletar
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM pivots WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pivot não encontrado.' });
    res.json({ message: 'Pivot deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar pivot.' });
  }
});

module.exports = router;