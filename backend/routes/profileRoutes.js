// routes/profileRoutes.js
const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// POST new profile (protected route)

router.post('/', authMiddleware, profileController.saveProfile);

module.exports = router;
    