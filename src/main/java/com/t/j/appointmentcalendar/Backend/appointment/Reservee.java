package com.t.j.appointmentcalendar.Backend.appointment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Reservee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username cannot be blank")
    private String username;

    // Optional: Add other reservee details here (e.g., email, phone number)
    private String email;

    // Many Reservees can belong to one Appointment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    @JsonIgnore // Prevents infinite recursion when serializing to JSON
    private Appointment appointment;

    // No-args constructor required by JPA
    public Reservee() {
    }

    // Constructor
    public Reservee(String username, String email, Appointment appointment) {
        this.username = username;
        this.email = email;
        this.appointment = appointment;
    }
}