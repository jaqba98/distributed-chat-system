CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (email, password) VALUES
    ('user1@gmai.com', 'password1'),
    ('user2@gmai.com', 'password2'),
    ('user3@gmai.com', 'password3');
