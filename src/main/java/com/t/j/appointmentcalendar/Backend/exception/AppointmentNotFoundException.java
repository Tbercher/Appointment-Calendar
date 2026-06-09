package com.t.j.appointmentcalendar.Backend.exception;

public class AppointmentNotFoundException extends RuntimeException {
    public AppointmentNotFoundException(Long id) {

        super("Task not found with id: " + id);
    }
}
