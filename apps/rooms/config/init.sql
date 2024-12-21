CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO rooms (name) VALUES
    ('room1'),
    ('room2'),
    ('room3')
