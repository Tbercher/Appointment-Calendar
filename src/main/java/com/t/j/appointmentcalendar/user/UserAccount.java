package com.t.j.appointmentcalendar.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //unique id
    @NotBlank
    private String username; //username / identifier. Should also be unique
    @NotBlank
    private String password; // used later for logging in
    @NotNull(message = "pin cannot be null")
    private int pin; // unique pin for adding to appointments
    @Email
    private String email; // user's email

// constructor
    public UserAccount(String username, String password, int pin, String email) {
        this.username = username;
        this.password = password;
        this.pin = pin;
        this.email = email;
    }// no args constructor
    public UserAccount() {

    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public int getPin() {
        return pin;
    }

    public String getEmail() {
        return email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User: " + username + " \nPin: " + pin;
    }
}
