package com.t.j.appointmentcalendar.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record AppointmentRequest(

        @NotBlank
        String username,

        @NotNull(message = "Time and date must not be null")
        LocalDateTime startTime,

        @NotNull(message = "Time and date must not be null")
        LocalDateTime endTime,

        @NotBlank(message = "There must be a title")
        String appointmentTitle,

        @NotBlank(message = "Description is mandatory")
        String appointmentDescription,

        @NotNull
        @Min(value = 1, message = "There must be at least 1 slot initially available.")
        Integer numOfSlots,

        boolean reservationStatus
) {}
