package com.t.j.appointmentcalendar.Backend.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findEventsByUserId(Long id);

    List<Event> findEventsByStartDate(LocalDateTime start);
}
