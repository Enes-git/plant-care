const spicedPg = require("spiced-pg");
const db = spicedPg(
	process.env.DATABASE_URL ||
		"postgres:postgres:postgres@localhost:5432/plant-care "
);

module.exports.registerUser = (username, email, password_hash) => {
	const q = `
    INSERT INTO users (username, email, password_hash) 
    VALUES ($1, $2, $3)
    RETURNING id;`; //use this for cookies
	const params = [username, email, password_hash];
	return db.query(q, params);
};

module.exports.loginUser = (email) => {
	const q = `
    SELECT * FROM users WHERE email = $1`;
	const params = [email];
	return db.query(q, params);
};

module.exports.updatePassword = (email, password_hash) => {
	const q = `
    UPDATE users
    SET password_hash = $2
    WHERE email = $1
    `;
	const params = [email, password_hash];
	return db.query(q, params);
};

module.exports.insertCode = (email, code) => {
	const q = `
    INSERT INTO reset_codes (email, code)
    VALUES($1, $2) 
    ON CONFLICT (email) 
    DO UPDATE SET code = $2, created_at = CURRENT_TIMESTAMP
    RETURNING code;`;
	const params = [email, code];
	return db.query(q, params);
};

module.exports.checkCode = (email) => {
	const q = `
    SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    AND email = $1;
    `;
	const params = [email];
	return db.query(q, params);
};

module.exports.insertUpload = (user_id, plant_name, plant_type, file) => {
	url = "https://s3.amazonaws.com/spicedling/" + file;
	const q = `
    INSERT INTO plants (url, user_id, plant_name, plant_type)
    VALUES ( $1, $2 , $3, $4)
    RETURNING *;
    `;
	const params = [url, user_id, plant_name, plant_type];
	return db.query(q, params);
};

module.exports.getAllPlants = (user_id) => {
	const q = `
    SELECT *
    FROM plants WHERE user_id =$1;
    `;
	const params = [user_id];
	return db.query(q, params);
};
