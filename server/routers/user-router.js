const express = require("express");
const user = express.Router();

const {
    getUserById,
    updateProfileImage,
    updateUserBio,
    getUserBySearch,
    getResentlyAddedUsers,
} = require("../sql/db");

const s3 = require("../s3");
const { uploader } = require("../upload");

/*************************** ROUTES ***************************/

user.post("/upload", uploader.single("file"), s3.upload, (req, res) => {

    if (req.file) {
        const fileName = req.file.filename;
        const urlToSaveInDB = `https://s3.amazonaws.com/spicedling/${fileName}`;

        updateProfileImage(urlToSaveInDB, req.session.userId)
            .then(({ rows }) => {
                console.log("image successfully saved in db");
                res.json(rows);
            })
            .catch((err) => {
                console.log("error adding img to db", err);
                res.sendStatus(500);
            });
    } else {
        res.json({ success: false });
    }
});

user.post("/bio.json", (req, res) => {
    const data = req.body;

    updateUserBio(data.bioDraft, req.session.userId)
        .then(({ rows }) => {
            console.log("bio successfully saved in db");
            res.json(rows);
        })
        .catch((err) => {
            console.log("error adding bio to db", err);
            res.sendStatus(500);
        });
});

user.get("/api/find-profile/:id", function (req, res) {

    if (req.params.id == req.session.userId) {
        res.json({
            redirectToProfile: true,
        });
    } else {
        getUserById(req.params.id).then(({ rows }) => {
            res.json({
                data: rows[0],
            });
        });
    }
});

user.get("/user", function (req, res) {
    getUserById(req.session.userId).then(({ rows }) => {
        res.json({
            data: rows[0],
        });
    });
});

user.get("/find-user/:search", function (req, res) {

    getUserBySearch(req.params.search).then(({ rows }) => {
        res.json({
            data: rows,
        });
    });
});

user.get("/find-recently-added-users", function (req, res) {
    getResentlyAddedUsers().then(({ rows }) => {
        res.json({
            data: rows,
        });
    });
});

/*************************** EXPORT ***************************/

module.exports = user;
