-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS reset_code;
 
-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     first VARCHAR(255) NOT NULL,
--     last VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- CREATE TABLE reset_code (
--     email VARCHAR(255) NOT NULL,
--     code VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

  SELECT * FROM users;
  SELECT * FROM reset_code;