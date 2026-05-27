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

    public String addUserAccount(UserAccount userAccount) {
        Optional<UserAccount> takenUsersAndEmails = userAccountRepository.findUserAccountByUsernameOrEmail(userAccount.getUsername(), userAccount.getEmail());
        if(takenUsersAndEmails.isPresent()) {
            return "Username and or password is already taken";
        } else {
            userAccountRepository.save(userAccount);
            return "User " + userAccount.getUsername() + " successfully created";
        }
    }

    public String updateUserAccount(String username, int o, String input) {
        switch(o) {
            case 1: // Change the username
                Optional<UserAccount> takenUsernames = userAccountRepository.findUserAccountByUsername(input);
                if(takenUsernames.isPresent()) {
                    return "Cannot update username, " + input + " is already taken";
                } else {
                    Optional<UserAccount> accounts = userAccountRepository.findUserAccountByUsername(username);
                    if(accounts.isPresent()) {
                        UserAccount user = accounts.get();
                        user.setUsername(input);
                        userAccountRepository.save(user);
                        return "User " + username + "'s username changed to " + input;
                    }
                }
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                return "INVALID CHOICE";
        }
        return "";
    }

    public String deleteUserAccount(int id) {
        UserAccount userToBeDeleted = userAccountRepository.findById(id).get();
        if(userToBeDeleted == null) {
            return "User does not exits";
        } else {
            userAccountRepository.deleteById(id);
            return "User successfully deleted";
        }
    }
}
