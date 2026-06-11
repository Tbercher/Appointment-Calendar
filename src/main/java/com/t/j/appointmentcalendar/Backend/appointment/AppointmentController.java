package com.t.j.appointmentcalendar.Backend.appointment;


import com.t.j.appointmentcalendar.Backend.exception.AppointmentNotFoundException;
import com.t.j.appointmentcalendar.Backend.dto.AppointmentRequest;
import com.t.j.appointmentcalendar.Backend.dto.AppointmentResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/api/appointment")
public class AppointmentController {

    private final AppointmentServices appointmentServices;

    public AppointmentController(AppointmentServices appointmentServices) {
        this.appointmentServices = appointmentServices;
    }

    // 1. GET ALL
    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        List<AppointmentResponse> responses = appointmentServices.getAllAppointments();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // 2. GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(@PathVariable Long id) {
        AppointmentResponse response = appointmentServices.getAppointmentById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 3. CREATE (POST)
    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(@Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse savedAppointment = appointmentServices.createAppointment(request);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }

    // 4. UPDATE (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> updateAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse updatedAppointment = appointmentServices.updateAppointment(id, request)
                .orElseThrow(() -> new AppointmentNotFoundException(id));
        return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
    }

    // 5. DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentServices.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
