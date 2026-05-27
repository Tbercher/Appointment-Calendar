package com.t.j.appointmentcalendar.user;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<UserAccount> getUser(@PathVariable int id) {
        UserAccount foundAcc = userServices.getSpefifiedUser(id);
        return ResponseEntity.status(HttpStatus.FOUND).body(foundAcc);
    }
    // To add a user
    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody UserAccount userAccount) {
        String confirmation = userServices.addUserAccount(userAccount);
        return ResponseEntity.status(HttpStatus.CREATED).body(confirmation);

    }

    // To update a users information
    @PutMapping("/update/{oldUser}/option={o}/{input}")
    public ResponseEntity<String> updateUser(@PathVariable String oldUser, @PathVariable int o, @PathVariable String input) {
        String confirmation = userServices.updateUserAccount(oldUser, o, input);
        return ResponseEntity.status(HttpStatus.OK).body(confirmation);
    }

    // To delete a specific user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(userServices.deleteUserAccount(id));
    }
}
