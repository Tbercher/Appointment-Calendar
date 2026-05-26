package com.t.j.appointmentcalendar.appointment;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AppointmentServices {

    private final AppointmentRepository appointmentRepository;

    // Constructor Injection
    public AppointmentServices(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment createAppointment(Appointment appointment) {
        // Business logic could go here (e.g., checking if the time slot is already taken) before saving
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> updateAppointment(Long id, Appointment appointmentDetails) {
        return appointmentRepository.findById(id).map(existingAppointment -> {
            existingAppointment.setAppointmentTitle(appointmentDetails.getAppointmentTitle());
            existingAppointment.setAppointmentDescription(appointmentDetails.getAppointmentDescription());
            existingAppointment.setStartTime(appointmentDetails.getStartTime());
            existingAppointment.setEndTime(appointmentDetails.getEndTime());
            existingAppointment.setNumOfSlots(appointmentDetails.getNumOfSlots());
            existingAppointment.setReservationStatus(appointmentDetails.isReservationStatus());
            existingAppointment.setReservees(appointmentDetails.getReservees());

            return appointmentRepository.save(existingAppointment);
        });
    }

    public boolean deleteAppointment(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
