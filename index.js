const express = require("express");
const app = express();
exports.app = app;
const cookieSession = require("cookie-session");
const db = require("./db_petition");
const csrf = require("csurf");
const authRoutes = require("./auth_routes");
const {
	requireLoggedInUser,
	requireNoSignature,
	requireSignature,
} = require("./middleware");

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

app.use(function (req, res, next) {
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use(requireLoggedInUser);

app.get("/profile", (req, res) => {
	res.json({ profile: true, csrfToken: req.csrfToken() });
});

app.get("/logout", (req, res) => {
	req.session.userId = null;
	res.redirect("login", { csrfToken: req.csrfToken() });
});

app.post("/profile", (req, res) => {
	console.log("req.session.userId: ", req.session.userId);

	let { age, city, website } = req.body;
	if (age === "") {
		age = 0;
	}
	if (website.startsWith("http://") || website.startsWith("https://")) {
		db.addProfile(req.session.userId, age, city, website).then(
			res.redirect("/signature")
		);
	} else {
		website = "https://" + website;
		db.addProfile(req.session.userId, age, city, website).then(
			res.redirect("/signature")
		);
	}
});

app.get("/edit", requireLoggedInUser, (req, res) => {
	db.getProfile(req.session.userId).then(function (dbReponse) {
		let { rows } = dbReponse;
		res.json({
			edit: true,
			name: rows[0].name,
			surname: rows[0].surname,
			email: rows[0].email,
			age: rows[0].age,
			city: rows[0].city,
			website: rows[0].website,
			csrfToken: req.csrfToken(),
		});
	});
});

app.post("/edit", (req, res) => {
	const { name, surname, email, password, age, city, website } = req.body;
	//if password has been changed
	if (password !== "") {
		db.updateProfile(req.session.userId, age, city, website).then(
			function () {
				db.updateUserAndPassword = (req.session.userId,
				name,
				surname,
				email,
				password).then(function () {
					document.cookie = "userId=; expires=0;";
					res.get("/login", requireLoggedOutUser, (req, res) => {
						res.json({ edit: true, csrfToken: req.csrfToken() });
					});
				});
			}
		);
	} else {
		db.updateProfile(req.session.userId, age, city, website).then(
			function () {
				db.updateUser(req.session.userId, name, surname, email).then(
					function () {
						res.redirect("signed");
					}
				);
			}
		);
	}
});

if (require.main == module) {
	app.listen(process.env.PORT || 8080, () =>
		console.log("Plant-care website on PORT8080...")
	);
}
