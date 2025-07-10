const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);
