package com.t.j.appointmentcalendar.Backend.dto;

import com.t.j.appointmentcalendar.Backend.appointment.Appointment;

import java.time.LocalDateTime;
import java.util.List;

public record AppointmentResponse(
        Long id,
        String username,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String appointmentTitle,
        String appointmentDescription,
        int numOfSlots,
        int availableSlots,
        boolean reservationStatus,
        List<String> reservedUsernames
) {
    public static AppointmentResponse fromEntity(Appointment appointment) {
        List<String> reservedUsernames = appointment.getReservees() == null
                ? List.of()
                : appointment.getReservees().stream()
                .map(com.t.j.appointmentcalendar.Backend.appointment.Reservee::getUsername)
                .toList();

        int availableSlots = appointment.getNumOfSlots() - reservedUsernames.size();

        return new AppointmentResponse(
                appointment.getId(),
                appointment.getUsername(),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getAppointmentTitle(),
                appointment.getAppointmentDescription(),
                appointment.getNumOfSlots(),
                availableSlots,
                appointment.isReservationStatus(),
                reservedUsernames
        );
    }
}