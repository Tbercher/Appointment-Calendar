-- ============================================================
-- 1. Drop Existing Tables (Run in this order to avoid FK errors)
-- ============================================================
DROP TABLE IF EXISTS reservee;
DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- ============================================================
-- 2. Schema Creation
-- ============================================================

-- Based on UserAccount.java
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    user_details JSON -- Mapped from @JdbcTypeCode(SqlTypes.JSON)
);

-- Based on Event.java
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP,
    external_appointment INT,
    description TEXT,
    user_id BIGINT,
    repeatable BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Based on Appointment.java
CREATE TABLE appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL, -- Owner/Creator of the appointment
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    appointment_title VARCHAR(255) NOT NULL,
    appointment_description TEXT NOT NULL,
    num_of_slots INT NOT NULL,
    reservation_status BOOLEAN NOT NULL DEFAULT FALSE
);

-- Based on Reservee.java
CREATE TABLE reservee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    appointment_id BIGINT,
    FOREIGN KEY (appointment_id) REFERENCES appointment(id) ON DELETE CASCADE
);


-- ============================================================
-- 3. Sample Data Insertion
-- ============================================================

-- Insert Users
-- Note: Passwords should be hashed (e.g., BCrypt) in a real app, using plain text for testing.
INSERT INTO users (username, password, email, user_details) VALUES
('alice_admin', 'password123', 'alice@example.com', '{"role": "ADMIN", "preferences": {"theme": "dark"}}'),
('admin', 'password', 'admin@email.com', '{"role": "ADMIN", "preferences": {"theme": "dark"}}'),
('bob_user', 'securepass', 'bob@example.com', '{"role": "USER", "preferences": {"theme": "light"}}'),
('charlie_user', 'testpass', 'charlie@example.com', '{"role": "USER", "preferences": {}}');

-- Insert Events
INSERT INTO events (event_name, event_start, event_end, external_appointment, description, user_id, repeatable) VALUES
('Weekly Team Meeting', '2026-07-01 09:00:00', '2026-07-01 10:00:00', NULL, 'Sync up on project status', 1, TRUE),
('Doctor Appointment', '2026-07-02 14:00:00', '2026-07-02 15:00:00', 1, 'Annual checkup', 2, FALSE),
('Project Deadline', '2026-07-15 17:00:00', '2026-07-15 17:00:00', NULL, 'Submit final code', 1, FALSE);

-- Insert Appointments (Available slots created by a user)
INSERT INTO appointment (username, start_time, end_time, appointment_title, appointment_description, num_of_slots, reservation_status) VALUES
('alice_admin', '2026-07-05 10:00:00', '2026-07-05 12:00:00', 'Office Hours', 'Open for student questions', 4, TRUE),
('alice_admin', '2026-07-10 13:00:00', '2026-07-10 14:00:00', '1-on-1 Reviews', 'Performance reviews for Q2', 1, FALSE),
('bob_user', '2026-07-12 15:00:00', '2026-07-12 16:30:00', 'Study Group', 'Preparing for finals', 5, TRUE);

-- Insert Reservees (People who have booked the appointment slots)
INSERT INTO reservee (username, email, appointment_id) VALUES
('bob_user', 'bob@example.com', 1), -- Bob booked Alice's Office Hours
('charlie_user', 'charlie@example.com', 1), -- Charlie also booked Alice's Office Hours
('alice_admin', 'alice@example.com', 3); -- Alice booked Bob's study group