package com.example.java_jwt.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Table(name = "alert")
@Entity(name = "Alert")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String location;

    private Timestamp dateTime;

    private String description;
}
