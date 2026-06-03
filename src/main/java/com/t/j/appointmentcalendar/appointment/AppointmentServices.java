package com.t.j.appointmentcalendar.appointment;

import com.t.j.appointmentcalendar.exception.AppointmentNotFoundException;
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

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));
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

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new AppointmentNotFoundException(id);
        }
        appointmentRepository.deleteById(id);
    }

}
