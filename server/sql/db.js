const spicedPg = require("spiced-pg");

const database = "socialnetwork";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.getUser = () => {
    const q = `SELECT id, first, last, email, url FROM users`;
    return db.query(q);
};

module.exports.registerUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;

    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUserByEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserById = (id) => {
    const q = `SELECT id, first, last, email, url FROM users WHERE id = ($1)`;
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