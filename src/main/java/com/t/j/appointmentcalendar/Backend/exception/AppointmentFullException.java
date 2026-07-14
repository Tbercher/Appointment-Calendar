package com.t.j.appointmentcalendar.Backend.exception;

public class AppointmentFullException extends RuntimeException {
    public AppointmentFullException(Long id) {
        super("Appointment " + id + " has no available slots remaining.");
    }
}