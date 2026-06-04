package com.t.j.appointmentcalendar.dto;

import com.t.j.appointmentcalendar.appointment.Appointment;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        String username,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String appointmentTitle,
        String appointmentDescription,
        int numOfSlots,
        boolean reservationStatus
) {
    // Static factory method to easily map from Entity to DTO
    public static AppointmentResponse fromEntity(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getUsername(),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getAppointmentTitle(),
                appointment.getAppointmentDescription(),
                appointment.getNumOfSlots(),
                appointment.isReservationStatus()
        );
    }
}
