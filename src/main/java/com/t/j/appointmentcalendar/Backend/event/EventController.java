package com.t.j.appointmentcalendar.Backend.event;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api/event")
public class EventController {

    private final EventServices eventServices;

    public EventController(EventServices eventServices) {
        this.eventServices = eventServices;
    }

    @GetMapping("/")
    public ResponseEntity<List<Event>> getEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(eventServices.getAllEvents());
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Event>> getUserEvents(@PathVariable String email) {
        return ResponseEntity.status(HttpStatus.OK).body(eventServices.getAllUserEvents(email));
    }

    @PostMapping("/PostEvent")
    public ResponseEntity<String> createEvent(@RequestBody EventRequest input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventServices.createUserEvent(input));
    }

//    @PutMapping("/updateEvent/{option}")
//    public ResponseEntity<Event> updateEvent(@PathVariable int option) {
//
//    }

    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(eventServices.deleteUserEvent(id));
    }
}
