const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const {
    registerUser,
    getUserByEmail,
    addResetPwCode,
    getResetPwCode,
    updateUserPw,
} = require("./sql/db");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");

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

// ************************* RESET PASSWORD ROUTS ******************************

app.post("/password/reset/start", (req, res) => {
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


app.post("/password/reset/verify", (req, res) => {
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
        .then(({ rows }) => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in /password/reset/verify: ", err);
            res.json({ success: false });
        });
});


app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
