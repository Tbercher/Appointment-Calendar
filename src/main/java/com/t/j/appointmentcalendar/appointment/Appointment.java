package com.t.j.appointmentcalendar.appointment;

import com.t.j.appointmentcalendar.user.UserAccount;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter // Generates all getters and setters
@Setter
@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;

    @NotNull(message = "Time and date must not be null")
    private LocalDateTime startTime; // beginning time for appointment time slot

    @NotNull(message = "Time and date must not be null")
    private LocalDateTime endTime; // end time for appointment time slot

    @NotBlank
    private String appointmentTitle; // title of appointment

    @NotBlank
    private String appointmentDescription; // description

    @NotNull
    private int numOfSlots; // Records number of slots used for an appointment

    private boolean reservationStatus;

    private List<String> reservees = new ArrayList<>(); // Arraylist that holds all reservees usernames


    // Constructor
    public Appointment(String username, LocalDateTime startTime, LocalDateTime endTime, String appointmentTitle, String appointmentDescription, int numOfSlots) {
        this.username = username;
        this.startTime = startTime;
        this.endTime = endTime;
        this.appointmentTitle = appointmentTitle;
        this.appointmentDescription = appointmentDescription;
        this.numOfSlots = numOfSlots;
    }

    // No args Constructor
    public Appointment() {

    }


}

