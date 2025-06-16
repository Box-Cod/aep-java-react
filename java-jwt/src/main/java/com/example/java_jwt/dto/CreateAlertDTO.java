package com.example.java_jwt.dto;

import java.sql.Timestamp;

public record CreateAlertDTO(String title, String description, String location, Timestamp dateTime) {
}
