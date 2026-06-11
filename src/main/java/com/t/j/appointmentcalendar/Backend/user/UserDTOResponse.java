package com.t.j.appointmentcalendar.Backend.user;

// When logging in, in the future we will return this, since the password and id aren't needed for the response.
public record UserDTOResponse(
        String username,
        UserDetails userDetails,
        String email
) {
}
