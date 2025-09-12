// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Save or Update Profile
router.post('/', async (req, res) => {
  const { user_id, location, description } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    const check = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [user_id]
    );

    if (check.rows.length > 0) {
      // Update existing
      const result = await pool.query(
        'UPDATE user_profiles SET location = $1, description = $2 WHERE user_id = $3 RETURNING *',
        [location, description, user_id]
      );
      res.json(result.rows[0]);
    } else {
      // Insert new
      const result = await pool.query(
        'INSERT INTO user_profiles (user_id, location, description) VALUES ($1, $2, $3) RETURNING *',
        [user_id, location, description]
      );
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get profile
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;
