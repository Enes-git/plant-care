exports.requireLoggedInUser = (req, res, next) => {
	if (!req.session.userId) {
		// this means the user is NOT logged in
		return res.redirect(302, "/register");
	}
	next();
};

// logged-in users should be redirected away from those register and login
exports.requireLoggedOutUser = (req, res, next) => {
	if (req.session.userId) {
		// goes to signature to sign
		return res.send(302, "/signature");
	}
	next();
};
