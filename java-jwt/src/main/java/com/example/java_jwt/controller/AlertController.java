package com.example.java_jwt.controller;

import com.example.java_jwt.model.Alert;
import com.example.java_jwt.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/alert")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @GetMapping
    public ResponseEntity<List<Alert>> findAll() {
        return new ResponseEntity<>(alertService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> findById(@PathVariable Long id) {
        return new ResponseEntity<>(alertService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<URI> create(@RequestBody Alert alert) {
            alertService.create(alert);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(alert.getId()).toUri();
            return new ResponseEntity<>(uri,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Alert newAlert) {
        return ResponseEntity.ok(alertService.update(id, newAlert));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        alertService.delete(id);
        return (ResponseEntity<?>) ResponseEntity.ok();
    }
}
