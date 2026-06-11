package com.t.j.appointmentcalendar.Backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

// todo: Create dto's , add more validation , exception handling
//test

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //unique id
    @NotBlank
    private String username; //username / identifier. Should also be unique
    @NotBlank
    private String password; // used later for logging in
    @JdbcTypeCode(SqlTypes.JSON)
    private UserDetails userDetails; // used for storing information in json
    @Email
    private String email; // user's email

    // constructor
    public UserAccount(String username, String password, UserDetails userDetails, String email) {
        this.username = username;
        this.password = password;
        this.userDetails = userDetails;
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

    public UserDetails getUserDetails() {
        return userDetails;
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

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User: " + username;
    }
}
