const spicedPg = require("spiced-pg");

const database = "socialnetwork";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.getUser = () => {
    const q = `SELECT * FROM users`;
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

module.exports.addResetPwCode = (email, code) => {
    const q = `INSERT INTO reset_code (email, code)
                VALUES ($1, $2)
                RETURNING code`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getResetPwCode = () => {
    const q = `SELECT * FROM reset_code
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`;
    return db.query(q);
};

module.exports.updateUserPw = (password, email) => {
    const q = `UPDATE users SET password = ($1)
    WHERE email = ($2)`;
    const params = [password, email];
    return db.query(q, params);
};

