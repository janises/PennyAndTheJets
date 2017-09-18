SELECT users.username as player, scores.score as score 
FROM users
JOIN scores
ON scores.user_id = users.id
ORDER BY scores.score DESC
LIMIT 10;