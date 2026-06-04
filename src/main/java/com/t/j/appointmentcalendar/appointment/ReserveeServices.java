package com.t.j.appointmentcalendar.appointment;

import com.t.j.appointmentcalendar.dto.ReserveeRequest;
import com.t.j.appointmentcalendar.dto.ReserveeResponse;
import com.t.j.appointmentcalendar.exception.AppointmentNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReserveeServices {

    private final ReserveeRepository reserveeRepository;
    // We must inject the AppointmentRepository to fetch the entity when creating a reservation
    private final AppointmentRepository appointmentRepository;

    // Constructor Injection
    public ReserveeServices(ReserveeRepository reserveeRepository, AppointmentRepository appointmentRepository) {
        this.reserveeRepository = reserveeRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<ReserveeResponse> getAllReservees() {
        return reserveeRepository.findAll()
                .stream()
                .map(ReserveeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<ReserveeResponse> getReserveeById(Long id) {
        return reserveeRepository.findById(id)
                .map(ReserveeResponse::fromEntity);
    }

    public List<ReserveeResponse> getReserveesByAppointmentId(Long appointmentId) {
        return reserveeRepository.findByAppointmentId(appointmentId)
                .stream()
                .map(ReserveeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public ReserveeResponse createReservee(ReserveeRequest request) {

        Appointment appointment = appointmentRepository.findById(request.appointmentId())
                .orElseThrow(() -> new AppointmentNotFoundException(request.appointmentId()));


        Reservee reservee = new Reservee(
                request.username(),
                request.email(),
                appointment
        );


        Reservee savedReservee = reserveeRepository.save(reservee);


        return ReserveeResponse.fromEntity(savedReservee);
    }

    public Optional<ReserveeResponse> updateReservee(Long id, ReserveeRequest request) {
        return reserveeRepository.findById(id).map(existingReservee -> {


            Appointment appointment = appointmentRepository.findById(request.appointmentId())
                    .orElseThrow(() -> new AppointmentNotFoundException(request.appointmentId()));


            existingReservee.setUsername(request.username());
            existingReservee.setEmail(request.email());
            existingReservee.setAppointment(appointment);

            // Save and map
            Reservee savedReservee = reserveeRepository.save(existingReservee);
            return ReserveeResponse.fromEntity(savedReservee);
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
