package com.t.j.appointmentcalendar.appointment;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/vi/api/appointment")
public class AppointmentController {

    private final AppointmentServices appointmentServices;

    public AppointmentController(AppointmentServices appointmentServices) {
        this.appointmentServices = appointmentServices;
    }

    // Gets all appointments
    @GetMapping("/allAppointments")
    public List<Appointment> getAppointments() {
        return appointmentServices.getAllAppointments();
    }

    // gets specific appointment whether that be reservee or the creators
    @PostMapping("/{id}")
    public Appointment getAppointment(@PathVariable int id) {
        return appointmentServices.getSpecificAppointment(id);
    }


    // to update an appointment and what it entails
    @PutMapping("/update/{id}/option={o}")
    public String updateAppointment(@PathVariable int id, @PathVariable int o) {
        return appointmentServices.updateAppointment(id, o);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAppointment(@PathVariable int id){
        return appointmentServices.deleteAppointment();
    }
}

