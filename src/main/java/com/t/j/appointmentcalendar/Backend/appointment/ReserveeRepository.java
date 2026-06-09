package com.t.j.appointmentcalendar.Backend.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReserveeRepository extends JpaRepository<Reservee, Long> {

    // Custom query to find all reservees for a specific appointment
    List<Reservee> findByAppointmentId(Long appointmentId);

    // Custom query to find all reservations made by a specific user
    List<Reservee> findByUsername(String username);
}
