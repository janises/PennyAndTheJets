SELECT score
FROM scores 
WHERE user_id = $1
ORDER BY score DESC
LIMIT 5;