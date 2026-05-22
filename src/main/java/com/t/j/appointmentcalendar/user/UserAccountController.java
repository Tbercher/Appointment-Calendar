package com.t.j.appointmentcalendar.user;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vi/api/user")
public class UserAccountController {

    private final UserServices userServices;

    public UserAccountController(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping("/allUsers")
    public List<UserAccount> getUsers() {
        return userServices.getAllAccounts();
    }
}
