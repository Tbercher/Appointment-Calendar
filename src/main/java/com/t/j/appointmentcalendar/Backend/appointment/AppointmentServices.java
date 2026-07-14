package com.t.j.appointmentcalendar.Backend.appointment;

import com.t.j.appointmentcalendar.Backend.dto.AppointmentRequest;
import com.t.j.appointmentcalendar.Backend.dto.AppointmentResponse;
import com.t.j.appointmentcalendar.Backend.exception.AppointmentNotFoundException;
import com.t.j.appointmentcalendar.Backend.exception.AppointmentFullException;
import com.t.j.appointmentcalendar.Backend.exception.AlreadyReservedException;
import com.t.j.appointmentcalendar.Backend.exception.ReservationNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentServices {

    private final AppointmentRepository appointmentRepository;

    // Constructor Injection
    public AppointmentServices(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> rawAppointments = appointmentRepository.findAll();
        return rawAppointments.stream()
                .map(AppointmentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public AppointmentResponse getAppointmentById(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));

        return AppointmentResponse.fromEntity(appointment);
    }

    public AppointmentResponse createAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment(
                request.username(),
                request.startTime(),
                request.endTime(),
                request.appointmentTitle(),
                request.appointmentDescription(),
                request.numOfSlots()
        );
        appointment.setReservationStatus(request.reservationStatus());

        Appointment savedAppointment = appointmentRepository.save(appointment);

        // MUST map to DTO before returning
        return AppointmentResponse.fromEntity(savedAppointment);
    }

    public Optional<AppointmentResponse> updateAppointment(Long id, AppointmentRequest request) {
        return appointmentRepository.findById(id).map(existingAppointment -> {
            existingAppointment.setAppointmentTitle(request.appointmentTitle());
            existingAppointment.setAppointmentDescription(request.appointmentDescription());
            existingAppointment.setStartTime(request.startTime());
            existingAppointment.setEndTime(request.endTime());
            existingAppointment.setNumOfSlots(request.numOfSlots());
            existingAppointment.setReservationStatus(request.reservationStatus());

            Appointment saved = appointmentRepository.save(existingAppointment);

            // MUST map to DTO before returning
            return AppointmentResponse.fromEntity(saved);
        });
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new AppointmentNotFoundException(id);
        }
        appointmentRepository.deleteById(id);
    }

    // 6. RESERVE A SLOT
    public AppointmentResponse reserveSlot(Long id, String username, String email) {
        // Pessimistic lock: blocks concurrent reservations against this same
        // appointment until this transaction commits, so two requests can't
        // both slip in on the last remaining slot.
        Appointment appointment = appointmentRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));

        boolean alreadyReserved = appointment.getReservees().stream()
                .anyMatch(r -> r.getUsername().equalsIgnoreCase(username));
        if (alreadyReserved) {
            throw new AlreadyReservedException(username, id);
        }

        if (appointment.getReservees().size() >= appointment.getNumOfSlots()) {
            throw new AppointmentFullException(id);
        }

        Reservee reservee = new Reservee(username, email, appointment);
        appointment.addReservee(reservee);

        Appointment saved = appointmentRepository.save(appointment);
        return AppointmentResponse.fromEntity(saved);
    }
    public AppointmentResponse cancelReservation(Long id, String username) {
        Appointment appointment = appointmentRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));

        Reservee match = appointment.getReservees().stream()
                .filter(r -> r.getUsername().equalsIgnoreCase(username))
                .findFirst()
                .orElseThrow(() -> new ReservationNotFoundException(username, id));

        appointment.removeReservee(match);

        Appointment saved = appointmentRepository.save(appointment);
        return AppointmentResponse.fromEntity(saved);
    }

}