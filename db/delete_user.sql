DELETE FROM scores
WHERE user_id = $1;

DELETE FROM users
WHERE id = $1;