package com.t.j.appointmentcalendar.exception;

public class AppointmentNotFoundException extends RuntimeException {
    public AppointmentNotFoundException(Long id) {

        super("Task not found with id: " + id);
    }
}
