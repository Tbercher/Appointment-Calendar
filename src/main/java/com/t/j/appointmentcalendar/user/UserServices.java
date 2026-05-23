package com.t.j.appointmentcalendar.user;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

// this class is where the logic will be
@Service
public class UserServices {

    private final UserAccountRepository userAccountRepository;

    public UserServices(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    // connects to getUsers in the controller
    public List<UserAccount> getAllAccounts() {
        return userAccountRepository.findAll();
    }

    // The logic to get a specific account
    public UserAccount getSpefifiedUser(int id) {
        Optional<UserAccount> userTest = userAccountRepository.findById(id);
        if(userTest.isPresent()) {
            return userTest.get();
        } else {
            return null;
        }
    }

    public String addUserAccount() {
        return "";
    }

    public String updateUserAccount(int id, int o) {
        return "";
    }

    public String deleteUserAccount(int id) {
        return "";
    }
}
