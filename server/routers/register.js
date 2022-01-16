const express = require("express");
const register = express.Router();

const {
    registerUser,
} = require("../sql/db");
const { hash } = require("../bc");
// const helpers = require("./utils/helpers");


/*************************** ROUTES ***************************/



register.post("/register.json", (req, res) => {
    console.log("req.body in registration.json request: ", req.body);

    const data = req.body;
    const pw = data.password;
    // const url = "default.png";

    // if (data.first == "" || data.last == "" || data.email == "" || pw == "") {
    //     console.log("no data in input -> change state to error");
    //     res.json({ success: false });
    // } else {
    hash(pw)
        .then((hashedPw) => {
            registerUser(data.first, data.last, data.email, hashedPw)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    console.log("console.log req.session: ", req.session);
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error adding user: ", err);
                    console.log("change state to error");
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in hash", err);
            res.json({ error: true });
        });
});

/*************************** EXPORT ***************************/

module.exports = register;
