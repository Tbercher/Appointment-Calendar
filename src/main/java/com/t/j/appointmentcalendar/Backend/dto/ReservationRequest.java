package com.t.j.appointmentcalendar.Backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ReservationRequest(
        @NotBlank(message = "Username cannot be blank")
        String username,

        String email
) {}