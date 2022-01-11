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

// module.exports.updateUserAndPW = (firstName, lastName, email, password, id) => {
//     const q = `UPDATE users SET first = ($1), last = ($2), email = ($3), password = ($4)
//     WHERE id = ($5)`;
//     const params = [firstName, lastName, email, password, id];
//     return db.query(q, params);
// };

// module.exports.updateUser = (firstName, lastName, email, id) => {
//     const q = `UPDATE users SET first = ($1), last = ($2), email = ($3)
//     WHERE id = ($4)`;
//     const params = [firstName, lastName, email, id];
//     return db.query(q, params);
// };