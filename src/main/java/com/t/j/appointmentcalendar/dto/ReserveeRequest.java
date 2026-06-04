package com.t.j.appointmentcalendar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReserveeRequest(

        @NotBlank(message = "Username cannot be blank")
        String username,

        @Email(message = "Please provide a valid email address")
        String email,

        @NotNull(message = "Appointment ID is required to make a reservation")
        Long appointmentId
) {}
