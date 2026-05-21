package com.t.j.appointmentcalendar.appointment;

import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/appointments")

public class AppointmentController {

    // Temporary in memory appointment list
    private List<Appointment> appointments = new ArrayList<>();
    private Long nextId = 1L;

    @GetMapping
    public List<Appointment> getAllAppointments(){
        return appointments;
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment){
        appointment.setId(nextId++);
        appointment.setStartTime(LocalTime.now());
        appointment.setEndTime(LocalTime.now().plusHours(2)); // adds two hours acts as a placeholder for an appointment time slot
        appointments.add(appointment);

        return appointment;
    }
}
