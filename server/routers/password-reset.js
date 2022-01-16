const express = require("express");
const passwordReset = express.Router();

const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../ses");

const {
    getUserByEmail,
    addResetPwCode,
    getResetPwCode,
    updateUserPw,
} = require("../sql/db");
const { hash } = require("../bc");


/*************************** ROUTES ***************************/



passwordReset.post("/password/reset/start", (req, res) => {
    const data = req.body;
    getUserByEmail(data.email)
        .then(({ rows }) => {
            if (rows[0].email) {
                // TODO: put Email in Cookies
                const randomString = cryptoRandomString({ length: 10 });
                return addResetPwCode(rows[0].email, randomString);
            } else {
                res.json({ success: false });
            }
        })
        .then(({ rows }) => {
            const emailSubject = "Reset Password";
            const emailBody = `here is your code to reset your Password: ${rows[0].code}`;
            sendEmail(
                emailSubject,
                emailBody,
                "flashy.toucan@spicedling.email"
            );
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error finding user: ", err);
            res.json({ success: false });
        });
});

passwordReset.post("/password/reset/verify", (req, res) => {
    console.log("req.body in /password/reset/verify request: ", req.body);

    const data = req.body;
    const pw = data.password;

    getResetPwCode(data.code)
        .then(({ rows }) => {
            console.log("rows: ", rows[0]);
            if (rows[0].code === data.code) {
                // TODO: checke ob emails in cookies
                console.log("the code is okay");
                return hash(pw);
            } else {
                res.json({ success: false });
            }
        })
        .then((hashedPw) => {
            return updateUserPw(hashedPw, data.email);
        })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in /password/reset/verify: ", err);
            res.json({ success: false });
        });
});


/*************************** EXPORT ***************************/

module.exports = passwordReset;
