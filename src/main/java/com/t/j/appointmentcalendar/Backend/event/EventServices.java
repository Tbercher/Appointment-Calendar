package com.t.j.appointmentcalendar.Backend.event;

import com.t.j.appointmentcalendar.Backend.user.UserAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventServices {

    private final EventRepository eventRepository;
    private final UserAccountRepository userAccountRepository;

    public EventServices(EventRepository eventRepository, UserAccountRepository userAccountRepository) {
        this.eventRepository = eventRepository;
        this.userAccountRepository = userAccountRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getAllUserEvents(String email) {
        List<Event> events = eventRepository.findEventsByUserId(userAccountRepository.findUserAccountByEmail(email).getUserId());
        if(events.isEmpty()) {
            return List.of();
        }
        return events;
    }

    public String createUserEvent(EventRequest request) {
        if(request.description() == null || request.description().isEmpty()) {
            String defaultDecs = "No description added";
            Long id = userAccountRepository.findUserAccountByEmail(request.user()).getUserId();
            System.out.println(id);
            eventRepository.save(new Event(request.eventName(), request.start(), request.end(), request.appointmentPointer(), defaultDecs, id, request.isRepeating()));
            return "Event " + request.eventName() + " has been successfully saved";
        }
        Long id = userAccountRepository.findUserAccountByEmail(request.user()).getUserId();
        eventRepository.save(new Event(request.eventName(), request.start(), request.end(), request.appointmentPointer(), request.description(), id, request.isRepeating()));
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
