
-- @PSQL:
-- *** sudo service postgresql start
-- *** createdb socialnetwork
-- *** psql socialnetwork
-- *** psql -d socialnetwork -f server/sql/setup.sql


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


-- DROP TABLE IF EXISTS wall_messages;

-- CREATE TABLE wall_messages (
--       id SERIAL PRIMARY KEY,
--       author_id INT REFERENCES users(id) NOT NULL,
--       wall_id INT REFERENCES users(id) NOT NULL,
--       wall_message TEXT NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO wall_messages
--   (author_id, wall_id, wall_message) 
-- VALUES 
--   (1, 207, 'Hey everyone, nice to meet you...'),
--   (1, 207, 'Hello there!'),
--   (1, 207, 'I love this social network');

--   INSERT INTO wall_messages
--   (author_id, wall_id, wall_message) 
-- VALUES 
--   (1, 213, 'Hey everyone, nice to meet you...'),
--   (1, 213, 'Hello there!'),
--   (1, 213, 'I love this social network');

  
--   INSERT INTO wall_messages
--   (author_id, wall_id, wall_message) 
-- VALUES 
--   (213, 1, 'Hey everyone, nice to meet you...'),
--   (213, 1, 'Hello there!'),
--   (213, 1, 'I love this social network');

-- DROP TABLE IF EXISTS chat_messages;

-- CREATE TABLE chat_messages (
--       id SERIAL PRIMARY KEY,
--       user_id INT NOT NULL REFERENCES users(id) ,
--       message TEXT NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- INSERT INTO chat_messages
--   (user_id, message) 
-- VALUES 
--   (145, 'Hey everyone, nice to meet you...'),
--   (101, 'Hello there!'),
--   (106, 'I love this social network');


  SELECT * FROM users;
  SELECT * FROM reset_code;
  SELECT * FROM friendships;
  SELECT * FROM chat_messages;
  SELECT * FROM wall_messages;



