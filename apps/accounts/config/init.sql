CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nick VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (nick, email, password) VALUES
    ('user1', 'user1@gmail.com', 'Pa$$word1'),
    ('user2', 'user2@gmail.com', 'Pa$$word2'),
    ('user3', 'user3@gmail.com', 'Pa$$word3');
