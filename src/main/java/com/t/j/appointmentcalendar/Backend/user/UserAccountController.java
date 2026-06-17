package com.t.j.appointmentcalendar.Backend.user;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vi/api/user")
@CrossOrigin(origins = "http://localhost:5173")
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
    public ResponseEntity<UserDTOResponse> getUser(@PathVariable int id) {
        UserDTOResponse foundAcc = userServices.getSpefifiedUser((long) id);
        return ResponseEntity.status(HttpStatus.FOUND).body(foundAcc);
    }

    // To get a user base on email and the correct password
    @PostMapping("/login")
    public ResponseEntity<UserDTOResponse> loginUser(@RequestBody UserLoginRequestDTO request) {
        System.out.println("Login endpoint hit");
        UserDTOResponse user = userServices.loginAsUser(request);
        return ResponseEntity.ok(user);
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
