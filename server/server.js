const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { registerUser, getUserByEmail } = require("./sql/db");
const { hash, compare } = require("./bc");
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
    res.json({
        userId: req.session.userId,
    });
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


app.post("/login.json", (req, res) => {
    console.log("req.body in login.json request: ", req.body);

    const data = req.body;
    const pw = data.password;

    if (req.session.userId) {
        console.log("user already has a session Id");
    } else {
        console.log("user doesnt have a session id");
    }

    getUserByEmail(data.email)
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

app.get("/logout", (req, res) => {
    req.session = null;
    // TODO:  render Loged Out Component
    res.redirect("/");
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
