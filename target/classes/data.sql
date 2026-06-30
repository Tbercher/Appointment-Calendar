-- ============================================================
-- Sample Data Insertion (Safe for application restarts)
-- Note: Table creation is handled by Hibernate (ddl-auto=update)
-- ============================================================

-- Insert Users
-- Explicit IDs are used here so INSERT IGNORE knows what to check for duplicates
INSERT IGNORE INTO users (id, username, password, email, user_details) VALUES
(1, 'alice_admin', 'password123', 'alice@example.com', '{"role": "ADMIN", "preferences": {"theme": "dark"}}'),
(2, 'bob_user', 'securepass', 'bob@example.com', '{"role": "USER", "preferences": {"theme": "light"}}'),
(3, 'charlie_user', 'testpass', 'charlie@example.com', '{"role": "USER", "preferences": {}}'),
(4, 'admin', 'password', 'admin@email.com', '{"role": "ADMIN", "preferences": {"theme": "dark"}}');

-- Insert Events
INSERT IGNORE INTO events (id, event_name, event_start, event_end, external_appointment, description, user_id, repeatable) VALUES
(1, 'Weekly Team Meeting', '2026-07-01 09:00:00', '2026-07-01 10:00:00', NULL, 'Sync up on project status', 1, TRUE),
(2, 'Doctor Appointment', '2026-07-02 14:00:00', '2026-07-02 15:00:00', 1, 'Annual checkup', 2, FALSE),
(3, 'Project Deadline', '2026-07-15 17:00:00', '2026-07-15 17:00:00', NULL, 'Submit final code', 1, FALSE);

-- Insert Appointments (Available slots created by a user)
INSERT IGNORE INTO appointment (id, username, start_time, end_time, appointment_title, appointment_description, num_of_slots, reservation_status) VALUES
(1, 'alice_admin', '2026-07-05 10:00:00', '2026-07-05 12:00:00', 'Office Hours', 'Open for student questions', 4, TRUE),
(2, 'alice_admin', '2026-07-10 13:00:00', '2026-07-10 14:00:00', '1-on-1 Reviews', 'Performance reviews for Q2', 1, FALSE),
(3, 'bob_user', '2026-07-12 15:00:00', '2026-07-12 16:30:00', 'Study Group', 'Preparing for finals', 5, TRUE);

-- Insert Reservees (People who have booked the appointment slots)
INSERT IGNORE INTO reservee (id, username, email, appointment_id) VALUES
(1, 'bob_user', 'bob@example.com', 1), -- Bob booked Alice's Office Hours
(2, 'charlie_user', 'charlie@example.com', 1), -- Charlie also booked Alice's Office Hours
(3, 'alice_admin', 'alice@example.com', 3); -- Alice booked Bob's study group