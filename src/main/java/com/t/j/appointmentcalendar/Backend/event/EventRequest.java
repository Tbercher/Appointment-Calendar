package com.t.j.appointmentcalendar.Backend.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import org.aspectj.lang.annotation.After;

import java.time.LocalDateTime;

public record EventRequest(
        @NotBlank
        String eventName,
        @FutureOrPresent
        LocalDateTime start,
        @Future
        LocalDateTime end,
        int appointmentPointer,
        String description,
        @NotBlank
        String user,
        @NotNull
        @JsonProperty("isRepeating")
        boolean isRepeating
) {
}
