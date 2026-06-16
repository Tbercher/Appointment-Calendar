package com.t.j.appointmentcalendar.Backend.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import org.aspectj.lang.annotation.After;

import java.time.LocalDateTime;

public record EventRequest(
        @NotBlank
        String eventName,
        @Past
        LocalDateTime start,
        @PastOrPresent
        LocalDateTime end,
        int appointmentPointer,
        String description,
        @NotNull
        int user,
        @NotNull
        boolean isRepeating
) {
}
