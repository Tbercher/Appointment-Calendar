package com.t.j.appointmentcalendar.appointment;

import com.t.j.appointmentcalendar.user.UserAccount;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;


import java.time.LocalDateTime;




@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String username;
    @NotBlank
    private LocalDateTime startTime; // beginning time for appointment time slot
    @NotBlank
    private LocalDateTime endTime; // end time for appointment time slot
    @NotBlank
    private String appointmentTitle; // title of appointment
    @NotBlank
    private String appointmentDescription; // description

    private boolean reservationStatus;

    private String reservee; // this would be the username or id of the individual that wants to reserve the time slot.

    // Constructor
    public Appointment(UserAccount user, LocalDateTime startTime, LocalDateTime endTime, String appointmentTitle, String appointmentDescription){
        username = user.getUsername();
        this.startTime = startTime;
        this.endTime = endTime;
        this.appointmentTitle = appointmentTitle;
        this.appointmentDescription = appointmentDescription;
    }

    // No args Constructor
    public Appointment(){

    }

    public LocalDateTime getStartTime(){return startTime;}

    public void setStartTime(LocalDateTime startTime){
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime(){
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime){
        this.endTime = endTime;
    }



    public String getAppointmentTitle() {
        return appointmentTitle;
    }

    public void setAppointmentTitle(String appointmentTitle) {
        this.appointmentTitle = appointmentTitle;
    }

    public String getAppointmentDescription(){
        return appointmentDescription;
    }

    public void setAppointmentDescription(String appointmentDescription){
        this.appointmentDescription = appointmentDescription;
    }

    public String getReservee() {
        return reservee;
    }

    public void setReservee(String reservee) {
        this.reservee = reservee;
    }

    public boolean getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(boolean reservationStatus) {
        this.reservationStatus = reservationStatus;
    }
}


