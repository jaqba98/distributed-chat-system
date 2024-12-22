CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO rooms (name, password) VALUES
    ('room1', '123456'),
    ('room2', '123456'),
    ('room3', '123456')
