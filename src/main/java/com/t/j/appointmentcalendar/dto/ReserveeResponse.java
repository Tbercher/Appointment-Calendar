package com.t.j.appointmentcalendar.dto;

import com.t.j.appointmentcalendar.appointment.Reservee;

public record ReserveeResponse(
        Long id,
        String username,
        String email,
        Long appointmentId
) {

    public static ReserveeResponse fromEntity(Reservee reservee) {
        return new ReserveeResponse(
                reservee.getId(),
                reservee.getUsername(),
                reservee.getEmail(),

                reservee.getAppointment() != null ? reservee.getAppointment().getId() : null
        );
    }
}
