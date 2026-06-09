package com.t.j.appointmentcalendar.Backend.appointment;

import com.t.j.appointmentcalendar.Backend.dto.AppointmentRequest;
import com.t.j.appointmentcalendar.Backend.dto.AppointmentResponse;
import com.t.j.appointmentcalendar.Backend.exception.AppointmentNotFoundException;
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

}
