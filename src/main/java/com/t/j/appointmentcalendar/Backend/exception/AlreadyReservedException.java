package com.t.j.appointmentcalendar.Backend.exception;

public class AlreadyReservedException extends RuntimeException {
    public AlreadyReservedException(String username, Long appointmentId) {
        super("User " + username + " has already reserved a slot in appointment " + appointmentId + ".");
    }
}