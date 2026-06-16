package com.t.j.appointmentcalendar.Backend.event;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventServices {

    private final EventRepository eventRepository;

    public EventServices(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getAllUserEvents(Long id) {
        List<Event> events = eventRepository.findEventsByUserId(id);
        if(events.isEmpty()) {
            return List.of();
        }
        return events;
    }

    public String createUserEvent(EventRequest request) {
        if(request.description() == null || request.description().isEmpty()) {
            String defaultDecs = "No description added";
            eventRepository.save(new Event(request.eventName(), request.start(), request.end(), request.appointmentPointer(), defaultDecs, request.user(), request.isRepeating()));
            return "Event " + request.eventName() + " has been successfully saved";
        }
        eventRepository.save(new Event(request.eventName(), request.start(), request.end(), request.appointmentPointer(), request.description(), request.user(), request.isRepeating()));
        return "Event " + request.eventName() + " has been successfully saved";
    }

    public String updateUserEvent(int option) {

        return "";
    }

    public String deleteUserEvent(Long id) {
        Event chosenEvent = eventRepository.getReferenceById(id);
        if(chosenEvent == null) {
            return "No event exists";
        } else {
            eventRepository.deleteById(id);
            return "Event deleted successfully";
        }
    }
}
