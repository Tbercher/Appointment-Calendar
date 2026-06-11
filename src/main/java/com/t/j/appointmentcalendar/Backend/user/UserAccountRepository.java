package com.t.j.appointmentcalendar.Backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {

    Optional<UserAccount> findUserAccountByUsernameOrEmail(String username, String email);

    Optional<UserAccount> findUserAccountByUsername(String username);



}
