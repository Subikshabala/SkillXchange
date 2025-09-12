-- Users (login/signup only)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- User Profile (extra details)
CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id),
  location VARCHAR(150),
  description TEXT
);

-- Skills (master list of all skills)
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- User skills mapping (have/want)
CREATE TABLE IF NOT EXISTS user_skills (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  skill_id INTEGER REFERENCES skills(id),
  type VARCHAR(10) CHECK (type IN ('have', 'want'))
);

-- Matches (who can match with whom)
CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER REFERENCES users(id),
  user2_id INTEGER REFERENCES users(id),
  skill_id INTEGER REFERENCES skills(id)
);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100),
  url TEXT,
  description TEXT
);

-- Points
CREATE TABLE IF NOT EXISTS points (
  id SERIAL PRIMARY KEY,  
  user_id INTEGER REFERENCES users(id),
  points INTEGER DEFAULT 0,
  reason TEXT
);
