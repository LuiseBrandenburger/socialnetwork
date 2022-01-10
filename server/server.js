const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { registerUser } = require("./sql/db");
const { hash } = require("./bc");
const cookieSession = require("cookie-session");
let secret =
    process.env.COOKIE_SECRET || require("./secret.json").COOKIE_SECRET;

/*************************** MIDDLEWARE ***************************/

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.json());
/*************************** ROUTES ***************************/

app.get("/user/id.json", function (req, res) {
    // TODO: set up cookie middleware

    if (req.session.userId) {
        res.json({
            userId: req.session.userId,
        });
    } else {
        res.json({
            userId: undefined,
        });
    }
});

app.post("/register.json", (req, res) => {
    console.log("req.body in registration.json request: ", req.body);

    const data = req.body;
    const pw = data.password;

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
    // }
});

app.get("/logout", (req, res) => {
    req.session = null;
    // TODO:  render Loged Out Component
    res.json({ loggedIn: false });
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
