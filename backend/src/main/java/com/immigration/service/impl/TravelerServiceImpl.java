package com.immigration.service.impl;

import com.immigration.dto.StatisticsDTO;
import com.immigration.dto.TravelerDTO;
import com.immigration.entity.Traveler;
import com.immigration.exception.DuplicateResourceException;
import com.immigration.exception.ResourceNotFoundException;
import com.immigration.repository.TravelerRepository;
import com.immigration.service.TravelerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TravelerServiceImpl implements TravelerService {

    private final TravelerRepository travelerRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Traveler> getAllTravelers() {
        return travelerRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Traveler> searchTravelers(String name, LocalDate entryDate) {
        return travelerRepository.searchTravelers(name, entryDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Traveler getTravelerById(Long id) {
        return travelerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Traveler not found with id: " + id));
    }

    @Override
    public Traveler createTraveler(TravelerDTO dto) {
        // Check if passport number already exists
        if (travelerRepository.existsByPassportNumber(dto.getPassportNumber())) {
            throw new DuplicateResourceException("Passport number already exists: " + dto.getPassportNumber());
        }

        Traveler traveler = new Traveler();
        mapDtoToEntity(dto, traveler);

        return travelerRepository.save(traveler);
    }

    @Override
    public Traveler updateTraveler(Long id, TravelerDTO dto) {
        Traveler traveler = getTravelerById(id);

        // Check if passport number is being changed and if new one already exists
        if (!traveler.getPassportNumber().equals(dto.getPassportNumber())) {
            if (travelerRepository.existsByPassportNumber(dto.getPassportNumber())) {
                throw new DuplicateResourceException("Passport number already exists: " + dto.getPassportNumber());
            }
        }

        mapDtoToEntity(dto, traveler);

        return travelerRepository.save(traveler);
    }

    @Override
    public void deleteTraveler(Long id) {
        Traveler traveler = getTravelerById(id);
        travelerRepository.delete(traveler);
    }

    @Override
    @Transactional(readOnly = true)
    public StatisticsDTO getStatistics() {
        LocalDate today = LocalDate.now();

        long total = travelerRepository.count();
        long active = travelerRepository.countActiveTravelers();
        long exited = travelerRepository.countExitedTravelers();
        long overstay = travelerRepository.countOverstayTravelers(today);

        // Critical: overstay more than 7 days
        LocalDate criticalDate = today.minusDays(7);
        long critical = travelerRepository.findOverstayTravelers(criticalDate).size();

        return new StatisticsDTO(total, active, exited, overstay, critical);
    }

    private void mapDtoToEntity(TravelerDTO dto, Traveler entity) {
        entity.setPassportNumber(dto.getPassportNumber());
        entity.setFullName(dto.getFullName());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setNationality(dto.getNationality());
        entity.setEntryDate(dto.getEntryDate());
        entity.setEntryPort(dto.getEntryPort());
        entity.setEntryLocation(dto.getEntryLocation());
        entity.setEntryReason(dto.getEntryReason());
        entity.setMaxStayDays(dto.getMaxStayDays());
        entity.setExitDate(dto.getExitDate());
        entity.setExitLocation(dto.getExitLocation());

        // MaxStayDate will be calculated automatically by @PrePersist/@PreUpdate
    }
}
