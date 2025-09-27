// controllers/profileController.js
const pool = require('../config/db');

exports.saveProfile = async (req, res) => {
  try {
    const { full_name, email, skills, want_to_learn, state, city, about, avatar } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ error: "Full name and email are required" });
    }

    // ✅ Use the actual user ID from JWT
    const user_id = req.user?.id; 
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized, user ID missing" });
    }

  const query = `
  INSERT INTO user_profiles
  (user_id, full_name, email, skills, learn, country, state, city, description, avatar)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;
`;

const values = [
  user_id,
  full_name,
  email,
  skills || null,
  want_to_learn || null,
  "India",
  state || 'Tamil Nadu', 
  city || 'Chennai',  
  about || null,
  avatar || null
];



    const result = await pool.query(query, values);

    res.status(200).json({ message: "Profile saved successfully", profile: result.rows[0] });
  } catch (err) {
    console.error("DB error:", err); // 🔍 full DB error log
    res.status(500).json({ error: err.message });
  }
};
