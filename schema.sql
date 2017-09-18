-- Table for user info

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    image TEXT,
    auth_id TEXT NOT NULL
);

INSERT INTO users (username, email, auth_id) VALUES ('Buffy', 'bsummers@scoobygang.com', 1);
INSERT INTO users (username, email, auth_id) VALUES ('Willow', 'wrosenberg@scoobygang.com', 2);
INSERT INTO users (username, email, auth_id) VALUES ('Xander', 'scoobyguy@scoobygang.com', 3);
INSERT INTO users (username, email, auth_id) VALUES ('Xena', 'warriorprincess@aol.com', 4);
INSERT INTO users (username, email, auth_id) VALUES ('River', 'spoilers@university.edu', 5);
INSERT INTO users (username, email, auth_id) VALUES ('Khaleesi', 'motherofdragons@targaryen.net', 6);
INSERT INTO users (username, email, auth_id) VALUES ('The Doctor', 'twohearts@gallifrey.net', 7);
INSERT INTO users (username, email, auth_id) VALUES ('Leia', 'generalorgana@alliance.gov', 8);

--Table for scores

CREATE TABLE scores 
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    score INTEGER NOT NULL
);

INSERT INTO scores (user_id, score) VALUES (1, 1870);
INSERT INTO scores (user_id, score) VALUES (2, 3096);
INSERT INTO scores (user_id, score) VALUES (3, 57);
INSERT INTO scores (user_id, score) VALUES (4, 2347);
INSERT INTO scores (user_id, score) VALUES (5, 4820);
INSERT INTO scores (user_id, score) VALUES (6, 2030);
INSERT INTO scores (user_id, score) VALUES (7, 1);
INSERT INTO scores (user_id, score) VALUES (8, 4021);
INSERT INTO scores (user_id, score) VALUES (4, 8920);
INSERT INTO scores (user_id, score) VALUES (1, 7905);

--Table for users and scores

CREATE TABLE users_scores
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    score_id INTEGER REFERENCES scores
);