package com.immigration.service;

import com.immigration.dto.StatisticsDTO;
import com.immigration.dto.TravelerDTO;
import com.immigration.entity.Traveler;

import java.time.LocalDate;
import java.util.List;

public interface TravelerService {
    List<Traveler> getAllTravelers();
    List<Traveler> searchTravelers(String name, LocalDate entryDate);
    Traveler getTravelerById(Long id);
    Traveler createTraveler(TravelerDTO dto);
    Traveler updateTraveler(Long id, TravelerDTO dto);
    void deleteTraveler(Long id);
    StatisticsDTO getStatistics();
}
