package com.t.j.appointmentcalendar.Backend.exception;

public class ReservationNotFoundException extends RuntimeException {
    public ReservationNotFoundException(String username, Long appointmentId) {
        super("User " + username + " does not have a reservation on appointment " + appointmentId + ".");
    }
}