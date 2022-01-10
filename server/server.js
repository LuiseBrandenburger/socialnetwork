const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { registerUser } = require("./sql/db");
const { compare, hash } = require("./bc");
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

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);


/*************************** ROUTES ***************************/

app.get("/user/id.json", function (req, res) {
    // TODO: set up cookie middleware

    // res.json({
    //     userId: req.session.userId,
    // });

    // FIXME: DEMO - DELETE LATER !!!!!!!!!!!!!!!
    res.json({
        userId: undefined,
    });
});

app.post("/registration.json", (req, res) => {
    const data = req.body;
    const pw = data.password;
    console.log("req.body in registration.json request: ", req.body);

    if (data.first == "" || data.last == "" || data.email == "" || pw == "") {
        console.log("no data in input -> change state to error");
    } else {
        hash(pw)
            .then((hashedPw) => {
                registerUser(data.first, data.last, data.email, hashedPw)
                    .then(({ rows }) => {
                        req.session.userId = rows[0].id;
                        // TODO: render user Logged in
                        console.log("console.log req.session: ", req.session);
                    })
                    .catch((err) => {
                        console.log("error adding user: ", err);
                        console.log("change state to error");
                    });
            })
            .catch((err) => {
                console.log("err in hash", err);
            });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    // TODO:  render Loged Out Component
});



// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
