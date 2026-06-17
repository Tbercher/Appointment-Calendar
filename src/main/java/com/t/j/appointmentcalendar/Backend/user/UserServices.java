package com.t.j.appointmentcalendar.Backend.user;


import com.t.j.appointmentcalendar.Backend.event.EventRepository;
import com.t.j.appointmentcalendar.Backend.exception.UserDoesNotExist;
import com.t.j.appointmentcalendar.Backend.exception.UserNotFound;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// this class is where the logic will be
@Service
public class UserServices {

    private final UserAccountRepository userAccountRepository;
    private final EventRepository eventRepository;

    public UserServices(UserAccountRepository userAccountRepository, EventRepository eventRepository) {
        this.userAccountRepository = userAccountRepository;
        this.eventRepository = eventRepository;
    }

    // connects to getUsers in the controller
    public List<UserAccount> getAllAccounts() {
        return userAccountRepository.findAll();
    }

    // The logic to get a specific account
    public UserDTOResponse getSpefifiedUser(Long id) {
        UserAccount user = userAccountRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new UserNotFound(id));
        return new UserDTOResponse(user.getUsername(), user.getUserDetails(), user.getEmail(), eventRepository.findEventsByUserId(id));
    }

    public UserDTOResponse loginAsUser(UserLoginRequestDTO request) {
        UserAccount user = userAccountRepository.findUserAccountByEmail(request.email());
        if (user != null) {
            if(user.getPassword().equals(request.password())) {
                return new UserDTOResponse(user.getUsername(), user.getUserDetails(), user.getEmail(), eventRepository.findEventsByUserId(user.getUserId()));
            } else {
                return null;
            }
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
                    } else {
                        throw new UserDoesNotExist(username);
                    }
                }
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
            throw new UserNotFound(id);
        } else {
            userAccountRepository.deleteById(id);
            return "User successfully deleted";
        }
    }
}
