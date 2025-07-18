const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS import
const app = express();

dotenv.config();
app.use(cors()); //  CORS middleware used
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
