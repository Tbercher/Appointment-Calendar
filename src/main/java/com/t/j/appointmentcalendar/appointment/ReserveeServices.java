package com.t.j.appointmentcalendar.appointment;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReserveeServices {

    private final ReserveeRepository reserveeRepository;

    // Constructor Injection
    public ReserveeServices(ReserveeRepository reserveeRepository) {
        this.reserveeRepository = reserveeRepository;
    }

    public List<Reservee> getAllReservees() {
        return reserveeRepository.findAll();
    }

    public Optional<Reservee> getReserveeById(Long id) {
        return reserveeRepository.findById(id);
    }

    public List<Reservee> getReserveesByAppointmentId(Long appointmentId) {
        return reserveeRepository.findByAppointmentId(appointmentId);
    }

    public Reservee createReservee(Reservee reservee) {
        // Business logic (e.g., checking if the appointment is full) goes here
        return reserveeRepository.save(reservee);
    }

    public Optional<Reservee> updateReservee(Long id, Reservee reserveeDetails) {
        return reserveeRepository.findById(id).map(existingReservee -> {
            existingReservee.setUsername(reserveeDetails.getUsername());
            existingReservee.setEmail(reserveeDetails.getEmail());
            existingReservee.setAppointment(reserveeDetails.getAppointment());

            return reserveeRepository.save(existingReservee);
        });
    }

    public boolean deleteReservee(Long id) {
        if (reserveeRepository.existsById(id)) {
            reserveeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
