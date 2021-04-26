const express = require("express");
const app = express();
exports.app = app;
const cookieSession = require("cookie-session");
const db = require("./db_petition");
const csrf = require("csurf");
const authRoutes = require("./auth_routes");
const { requireLoggedInUser } = require("./middleware");

app.use(express.static("./public"));

app.use((req, res, next) => {
	console.log(`MIDDLEWARE LOG : ${req.method} to ${req.url} route`);
	next();
});

let secret;
if (process.env.SECRET) {
	secret = process.env.SECRET;
} else {
	secret = require("./secret.json").secret;
}
app.use(express.static("public"));

app.use(
	cookieSession({
		secret: secret,
		maxAge: 1000 * 60 * 60 * 24 * 14, //two weeks
	})
);
app.use(express.urlencoded({ extended: false }));

app.use(csrf());
app.use(authRoutes.router);

if (require.main == module) {
	app.listen(process.env.PORT || 8080, () =>
		console.log("Plant-care website on PORT8080...")
	);
}
