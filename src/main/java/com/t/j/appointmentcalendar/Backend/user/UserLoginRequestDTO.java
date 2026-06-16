package com.t.j.appointmentcalendar.Backend.user;

import jakarta.validation.constraints.NotBlank;

public record UserLoginRequestDTO(
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
