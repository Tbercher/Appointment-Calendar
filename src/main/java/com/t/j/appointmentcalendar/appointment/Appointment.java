package com.t.j.appointmentcalendar.appointment;


import jakarta.persistence.*;

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

    @NotNull(message = "Time and date must not be null") // Utilize @Future
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

    // create dots
    // exceptions
    // data validation
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservee> reservees = new ArrayList<>();


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

    // Utility methods to keep both sides of the relationship in sync
    public void addReservee(Reservee reservee) {
        reservees.add(reservee);
        reservee.setAppointment(this);
    }

    public void removeReservee(Reservee reservee) {
        reservees.remove(reservee);
        reservee.setAppointment(null);
    }


}

