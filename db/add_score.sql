INSERT INTO scores (user_id, score)
VALUES ($1, $2)
RETURNING scores*;