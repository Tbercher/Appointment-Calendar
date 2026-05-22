package com.t.j.appointmentcalendar.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {


}
