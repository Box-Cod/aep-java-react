package com.example.java_jwt.service;

import com.example.java_jwt.model.Alert;
import com.example.java_jwt.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    public List<Alert> findAll() {
        return alertRepository.findAll();
    }

    public Alert findById(Long id) {
        return validOptinal(alertRepository.findById(id));
    }

    public Alert create(Alert alert) {
        return alertRepository.save(alert);
    }

    public Alert update(Long id, Alert newAlert) {
        Alert alert = findById(id);
        alert.setTitle(newAlert.getTitle());
        alert.setDescription(newAlert.getDescription());
        alert.setLocation(newAlert.getLocation());
        alert.setDateTime(newAlert.getDateTime());

        return alertRepository.save(alert);
    }

    public void delete(Long id) {
        alertRepository.deleteById(id);
    }

    public void delete(Alert alert) {
        alertRepository.delete(alert);
    }

    private Alert validOptinal(Optional<Alert> opt) {
        if (opt.isEmpty()) throw new RuntimeException("Alerta não encontrado");
        return opt.get();
    }
}
