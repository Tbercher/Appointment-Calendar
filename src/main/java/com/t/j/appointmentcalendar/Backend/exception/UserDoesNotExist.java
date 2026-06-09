package com.t.j.appointmentcalendar.Backend.exception;

// For when a username doesn't exits based on a username
public class UserDoesNotExist extends RuntimeException {
  public UserDoesNotExist(String username) {
    super("User with username " + username + " does not exist");
  }
}
