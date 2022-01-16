const express = require("express");
const auth = express.Router();

const { compare } = require("../bc");
const { getUserForLogin } = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("Hello from auth");


auth.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

auth.post("/login.json", (req, res) => {
    console.log("req.body in login.json request: ", req.body);

    const data = req.body;
    const pw = data.password;

    // if (req.session.userId) {
    //     console.log("user already has a session Id");
    // } else {
    //     console.log("user doesnt have a session id");
    // }

    getUserForLogin(data.email)
        .then(({ rows }) => {
            compare(pw, rows[0].password)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        console.log("console.log req.session: ", req.session);
                        res.json({ success: true });
                    } else {
                        console.log("Error in Match");
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("password error", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error finding user: ", err);
            res.json({ success: false });
        });
});


auth.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

/*************************** EXPORT ***************************/

module.exports = auth;