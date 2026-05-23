package com.t.j.appointmentcalendar.user;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vi/api/user")
public class UserAccountController {

    private final UserServices userServices;

    public UserAccountController(UserServices userServices) {
        this.userServices = userServices;
    }

    // To get all accounts
    @GetMapping("/allUsers")
    public List<UserAccount> getUsers() {
        return userServices.getAllAccounts();
    }

    // To get a specific user account
    @GetMapping("/{id}")
    public UserAccount getUser(@PathVariable int id) {
        return userServices.getSpefifiedUser(id);
    }
    // To add a user
    @PostMapping("/addUser")
    public String addUser() {
        return userServices.addUserAccount();
    }

    // To update a users information
    @PutMapping("/update/{id}/option={o}")
    public String updateUser(@PathVariable int id, @PathVariable int o) {
        return userServices.updateUserAccount(id, o);
    }

    // To delete a specific user
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id) {
        return userServices.deleteUserAccount(id);
    }
}
