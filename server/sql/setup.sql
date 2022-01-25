-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     first VARCHAR(255) NOT NULL,
--     last VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     url VARCHAR(255),
--     bio VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );



-- DROP TABLE IF EXISTS reset_code;

-- CREATE TABLE reset_code (
--     email VARCHAR(255) NOT NULL,
--     code VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );



-- DROP TABLE IF EXISTS friendships;

-- CREATE TABLE friendships( 
-- id SERIAL PRIMARY KEY, 
-- sender_id INT REFERENCES users(id) NOT NULL,
-- recipient_id INT REFERENCES users(id) NOT NULL,
-- accepted BOOLEAN DEFAULT false);



-- DROP TABLE IF EXISTS chat_messages;

-- CREATE TABLE chat_messages (
--       id SERIAL PRIMARY KEY,
--       user_id INT NOT NULL REFERENCES users(id) ,
--       message TEXT NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

INSERT INTO chat_messages
  (user_id, message) 
VALUES 
  (145, 'Hey everyone, nice to meet you...'),
  (101, 'Hello there!'),
  (106, 'I love this social network');


  -- SELECT * FROM users;
  -- SELECT * FROM reset_code;
  -- SELECT * FROM friendships;
  SELECT * FROM chat_messages;



