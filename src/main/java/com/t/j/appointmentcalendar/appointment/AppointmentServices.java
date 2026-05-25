package com.t.j.appointmentcalendar.appointment;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServices {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServices(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments(){
        return appointmentRepository.findAll();
    }

    public Appointment getSpecificAppointment(int id){
        Optional<Appointment> appointmentTest = appointmentRepository.findById(id);
        if(appointmentTest.isPresent()){
            return appointmentTest.get();
        }
        else{
            return null;
        }
    }

    public String updateAppointment() {
        return"";
    }

    public String deleteAppointment() {
        return "";
    }

}
