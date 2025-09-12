// routes/pointsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

// Add points
router.post('/', async (req, res) => {
  const { user_id, points, reason } = req.body;

  if (!user_id || !points) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO points (user_id, points, reason) VALUES ($1, $2, $3) RETURNING *',
      [user_id, points, reason]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get user points total
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT COALESCE(SUM(points), 0) as total_points FROM points WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;
