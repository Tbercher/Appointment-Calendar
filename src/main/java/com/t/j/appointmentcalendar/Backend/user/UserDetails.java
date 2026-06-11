package com.t.j.appointmentcalendar.Backend.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDetails {
    private Date birthYear;
    private String name;
    private String gender;

    @JsonProperty("User_Birthday")
    public Date getBirthYear() {
        return this.birthYear;
    }
    @JsonProperty("User_Birthday")
    public void setBirthYear(Date birthYear) {
        this.birthYear = birthYear;
    }
    @JsonProperty("User_Name")
    public String getName() {
        return this.name;
    }
    @JsonProperty("User_Name")
    public void setName(String newName) {
        this.name = newName;
    }
    @JsonProperty("User_Gender")
    public String getGender() {
        return this.gender;
    }
    @JsonProperty("User_Gender")
    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "UserDetails{" +
                "birthYear=" + birthYear +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
