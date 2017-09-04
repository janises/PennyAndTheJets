-- Table for user info

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(40),
    image TEXT,
    auth_id TEXT
);

INSERT INTO users (username, email, password) VALUES ('buffy', 'bsummers@scoobygang.com', 'angel<3');
INSERT INTO users (username, email, password) VALUES ('willow', 'wrosenberg@scoobygang.com', 'tara<3');
INSERT INTO users (username, email, password) VALUES ('xander', 'scoobyguy@scoobygang.com', 'burgersandfries');

--Table for scores

CREATE TABLE scores 
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    score INTEGER
);

INSERT INTO scores (user_id, score) VALUES (1, 1870);
INSERT INTO scores (user_id, score) VALUES (2, 929);
INSERT INTO scores (user_id, score) VALUES (3, 57);

--Table for users and scores

CREATE TABLE users_scores
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    score_id INTEGER REFERENCES scores
);