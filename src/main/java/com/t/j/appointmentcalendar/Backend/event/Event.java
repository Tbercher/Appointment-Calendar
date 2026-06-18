package com.t.j.appointmentcalendar.Backend.event;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "An event must have a title")
    @Column(name = "event_name")
    private String eventName;
    @NotNull(message = "An event must have a start time")
    @Column(name = "event_start")
    private LocalDateTime startDate;
    @NotNull(message = "An event must have an ending")
    @Column(name = "event_end", nullable = true)
    private LocalDateTime endDate;
    @Column(name = "external_appointment", nullable = true)
    private int appointmentPointer;
    @Column(name = "description", nullable = true)
    private String eventDescription;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "repeatable")
    private boolean repeating;

    public Event(String eventName, LocalDateTime start, LocalDateTime end, int externalApp, String description, long id,  boolean repeating) {
        this.eventName = eventName;
        this.startDate = start;
        this.endDate = end;
        this.appointmentPointer = externalApp;
        this.eventDescription = description;
        this.userId = id;
        this.repeating = repeating;
    }

    public Event() {

    }

    public String getEventName() {
        return eventName;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public int getAppointmentPointer() {
        return appointmentPointer;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public long getUserId() {
        return userId;
    }

    public boolean isRepeating() {
        return repeating;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void setAppointmentPointer(int appointmentPointer) {
        this.appointmentPointer = appointmentPointer;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setRepeating(boolean repeating) {
        this.repeating = repeating;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", appointmentPointer=" + appointmentPointer +
                ", eventDescription='" + eventDescription + '\'' +
                ", repeating=" + repeating +
                '}';
    }
}
