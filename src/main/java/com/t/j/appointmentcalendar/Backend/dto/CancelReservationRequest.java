package com.t.j.appointmentcalendar.Backend.dto;

import jakarta.validation.constraints.NotBlank;

public record CancelReservationRequest(
        @NotBlank(message = "Username cannot be blank")
        String username
) {}