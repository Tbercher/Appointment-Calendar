package com.t.j.appointmentcalendar.appointment;


import com.t.j.appointmentcalendar.exception.AppointmentNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/v1/api/appointment")
public class AppointmentController {

    private final AppointmentServices appointmentServices;

    // Injecting service layer
    public AppointmentController(AppointmentServices appointmentServices) {
        this.appointmentServices = appointmentServices;
    }


    // All @GetMapping

    // Gets all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return new ResponseEntity<>(appointmentServices.getAllAppointments(), HttpStatus.OK);
    }

    // gets specific appointment whether that be reservee or the creators
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentServices.getAppointmentById(id);
    }


    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentServices.createAppointment(appointment);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @Valid @RequestBody Appointment appointmentDetails) {

        // Attempt to update, and throw the exception immediately if the Optional is empty
        Appointment updatedAppointment = appointmentServices.updateAppointment(id, appointmentDetails)
                .orElseThrow(() -> new AppointmentNotFoundException(id));

        // If we reach this line, the appointment was successfully updated
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentServices.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

}

