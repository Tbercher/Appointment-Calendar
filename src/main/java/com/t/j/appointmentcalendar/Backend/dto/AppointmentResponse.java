package com.t.j.appointmentcalendar.Backend.dto;

import com.t.j.appointmentcalendar.Backend.appointment.Appointment;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        String username,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String appointmentTitle,
        String appointmentDescription,
        int numOfSlots,
        int availableSlots,
        boolean reservationStatus
) {
    // Static factory method to easily map from Entity to DTO
    public static AppointmentResponse fromEntity(Appointment appointment) {
        int reservedCount = appointment.getReservees() == null ? 0 : appointment.getReservees().size();
        int availableSlots = appointment.getNumOfSlots() - reservedCount;

        return new AppointmentResponse(
                appointment.getId(),
                appointment.getUsername(),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getAppointmentTitle(),
                appointment.getAppointmentDescription(),
                appointment.getNumOfSlots(),
                availableSlots,
                appointment.isReservationStatus()
        );
    }
}