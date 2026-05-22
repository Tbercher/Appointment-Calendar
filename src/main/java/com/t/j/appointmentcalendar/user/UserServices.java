package com.t.j.appointmentcalendar.user;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
public class UserServices {

    private final UserAccountRepository userAccountRepository;

    public UserServices(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public List<UserAccount> getAllAccounts() {
        return userAccountRepository.findAll();
    }
}
