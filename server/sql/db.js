const spicedPg = require("spiced-pg");

const database = "socialnetwork";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.registerUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;

    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUserForLogin = (email) => {
    const q = `SELECT email, password, id FROM users WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};


module.exports.getUserByEmail = (email) => {
    const q = `SELECT id, first, last, email, url, bio FROM users WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserById = (id) => {
    const q = `SELECT id, first, last, email, url, bio FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};


// FIXME: Email Unique - and upsert insted of insert

module.exports.addResetPwCode = (email, code) => {
    const q = `INSERT INTO reset_code (email, code)
                VALUES ($1, $2)
                RETURNING code`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getResetPwCode = (code) => {
    const q = `SELECT * FROM reset_code WHERE code = ($1)
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    `;
    const params = [code];
    return db.query(q, params);
};

module.exports.updateUserPw = (password, email) => {
    const q = `UPDATE users SET password = ($1)
    WHERE email = ($2)`;
    const params = [password, email];
    return db.query(q, params);
};

module.exports.updateProfileImage = (url, id) => {
    const q = `UPDATE users SET url = ($1)
    WHERE id = ($2)
    RETURNING url`;

    const params = [url, id];
    return db.query(q, params);
};

module.exports.updateUserBio = (bio, id) => {
    const q = `UPDATE users SET bio = ($1)
    WHERE id = ($2)
    RETURNING bio`;

    const params = [bio, id];
    return db.query(q, params);
};

module.exports.getUserBySearch = (search) => {
    const q = `SELECT id, first, last, email, url, bio FROM users WHERE first ILIKE ($1)
    ORDER by id DESC`;
    const params = [search + '%'];
    return db.query(q, params);
};

module.exports.getResentlyAddedUsers = () => {
    const q = `SELECT id, first, last, email, url, bio FROM users 
    ORDER by created_at DESC
    LIMIT 3`;
    return db.query(q);
};

// TODO: check the query
module.exports.getFriendship = (propsId, sessionId) => {
    const q = `SELECT recipient_id, sender_id, accepted FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [propsId, sessionId];
    return db.query(q, params);
};

module.exports.postFriendship = (sessionId, propsId) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2)
    RETURNING accepted, recipient_id`;

    const params = [sessionId, propsId];
    return db.query(q, params);
};

module.exports.deleteFriendship = (sessionId, propsId) => {
    const q = `DELETE FROM friendships WHERE sender_id = ($1) AND recipient_id = ($2)
    OR (recipient_id = $1 AND sender_id = $2)`;
    const params = [sessionId, propsId];
    return db.query(q, params);
};

module.exports.acceptFriendship = (sessionId, propsId) => {
    const q = `UPDATE friendships SET accepted = true 
    WHERE (recipient_id = $2 AND sender_id = $1) 
    OR (recipient_id = $1 AND sender_id = $2)
    RETURNING accepted, recipient_id`;

    const params = [sessionId, propsId];
    return db.query(q, params);
};

module.exports.getAllFriendshipsById = (sessionId) => {
    const q = `
    SELECT users.id, first, last, url, email, accepted, sender_id AS senderId
    FROM friendships
    JOIN users ON (accepted = FALSE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = FALSE AND sender_id = $1 AND recipient_id = users.id) OR
                (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id)
    `;

    const params = [sessionId];
    return db.query(q, params);
};


module.exports.getLastTenChatMessages = () => {
    const q = `
    SELECT users.id, first, last, url, message, chat_messages.created_at, chat_messages.id AS messageid
    FROM chat_messages
    JOIN users ON users.id = chat_messages.user_id
    ORDER by created_at DESC
    LIMIT 10
    `;

    return db.query(q);
};


module.exports.addUserMessage = (message, userId) => {
    const q = `INSERT INTO chat_messages (message, user_id)
    VALUES ($1, $2)
    RETURNING message, created_at, id`;

    const params = [message, userId];
    return db.query(q, params);
};

module.exports.getUserChatById = (id) => {
    const q = `SELECT id, first, last, url FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};


module.exports.getLastTenWallMessages = (id) => {
    const q = `
    SELECT users.id, first, last, url, wall_message AS wallmessage, wall_messages.created_at, wall_messages.id AS wallmessageid
    FROM wall_messages
    JOIN users ON users.id = wall_messages.author_id
    WHERE (wall_id = $1)
    ORDER by created_at DESC
    LIMIT 10
    `;

    const params = [id];
    return db.query(q, params);
};

module.exports.addWallMessage = (message, wallId, authorId) => {
    const q = `INSERT INTO wall_messages (wall_message, wall_id, author_id)
    VALUES ($1, $2, $3)
    RETURNING wall_message, created_at, id, wall_id, author_id`;

    const params = [message, wallId, authorId];
    return db.query(q, params);
};
