--README if setting up db for first time 
-- sudo service postgresql start
-- createdb plant-care 
-- cd into the parent dir of this file
-- psql -d plant-care -f users.sql

-- DROP TABLE IF EXISTS plants; 
DROP TABLE IF EXISTS reset_codes ; 
DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE CHECK (username <> ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE REFERENCES users (email),
    code VARCHAR NOT NULL CHECK (code <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE plants (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users (id),
--     plant_name VARCHAR NOT NULL CHECK (title <> ''),
--     plant_type VARCHAR DEFAULT 'not listed',
--     plant_pic VARCHAR,
--     last_watered VARCHAR,
--     next_water VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );