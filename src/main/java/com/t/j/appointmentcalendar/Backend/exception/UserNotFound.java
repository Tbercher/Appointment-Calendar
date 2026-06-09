package com.t.j.appointmentcalendar.Backend.exception;

// When a user does not exist on a specific id (will probably delete later)
public class UserNotFound extends RuntimeException {
    public UserNotFound(long id) {
        super("User with username " + id + " not found");
    }
}
