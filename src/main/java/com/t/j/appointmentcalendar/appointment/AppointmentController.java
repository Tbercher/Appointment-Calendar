package com.t.j.appointmentcalendar.appointment;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/vi/api/appointment")
public class AppointmentController {

    private final AppointmentServices appointmentServices;

    public AppointmentController(AppointmentServices appointmentServices){
        this.appointmentServices = appointmentServices;
    }

    // Gets all appointments
    @GetMapping("/allAppointments")
    public List<Appointment> getAppointments(){
        return appointmentServices.getAllAppointments();
    }

    @PostMapping("/addAppointment"){
        public
    }

    // Get reservee appointment
    @GetMapping("/")
}
