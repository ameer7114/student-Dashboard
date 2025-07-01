CREATE DATABASE student_results_db;
USE student_results_db;
CREATE TABLE student_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  roll_number VARCHAR(20),
  subject VARCHAR(100),
  marks INT
);