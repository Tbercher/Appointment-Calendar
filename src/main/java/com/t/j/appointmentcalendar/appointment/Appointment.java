package com.t.j.appointmentcalendar.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Appointment {
    private Long id; //Unique user specific identifiers
    private String title; // user appointment name/title example: how to make a grilled cheese lessons
    private LocalTime startTime; // time will be in military time HH:MM
    private LocalTime endTime; // the two times represent the range in which a user can post their "availability" range
    private Boolean taken; // indicates if appointment is taken



}
