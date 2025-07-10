const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Route 1: Insert new skill for a user
router.post('/', async (req, res) => {
  const { user_id, skill_name, type } = req.body;

  if (!user_id || !skill_name || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO user_skills_detail (user_id, skill_name, type) VALUES ($1, $2, $3) RETURNING *',
      [user_id, skill_name, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Route 2: Get all skills for a user
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM user_skills_detail WHERE user_id = $1',
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;
