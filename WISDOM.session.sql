CREATE TABLE UserAccount(
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(13) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(64),
    address_id INT,
    is_staff BOOLEAN NOT NULL,
    is_admin BOOLEAN
);
CREATE TABLE AddressDetails(
    id SERIAL PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    house_number VARCHAR(5) NOT NULL,
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES UserAccount(id)
);
CREATE TABLE Course(
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(50),
    start_date DATE,
    end_date DATE,
    max_students INT,
    min_students INT,
    price FLOAT,
    teacher_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES UserAccount(id)
);
CREATE TABLE Enrollments(
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES UserAccount(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);