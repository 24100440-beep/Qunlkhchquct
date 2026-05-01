package com.immigration.controller;

import com.immigration.dto.ApiResponse;
import com.immigration.dto.StatisticsDTO;
import com.immigration.dto.TravelerDTO;
import com.immigration.entity.Traveler;
import com.immigration.service.TravelerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/travelers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TravelerController {

    private final TravelerService travelerService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTravelers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {

        List<Traveler> travelers;

        if (name != null || entryDate != null) {
            travelers = travelerService.searchTravelers(name, entryDate);
        } else {
            travelers = travelerService.getAllTravelers();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", travelers);
        response.put("total", travelers.size());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Traveler>> getTravelerById(@PathVariable Long id) {
        Traveler traveler = travelerService.getTravelerById(id);
        return ResponseEntity.ok(ApiResponse.success(traveler));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Traveler>> createTraveler(@Valid @RequestBody TravelerDTO dto) {
        Traveler traveler = travelerService.createTraveler(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(traveler, "Thêm du khách thành công"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Traveler>> updateTraveler(
            @PathVariable Long id,
            @Valid @RequestBody TravelerDTO dto) {
        Traveler traveler = travelerService.updateTraveler(id, dto);
        return ResponseEntity.ok(ApiResponse.success(traveler, "Cập nhật thành công"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteTraveler(@PathVariable Long id) {
        travelerService.deleteTraveler(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa du khách thành công"));
    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<StatisticsDTO>> getStatistics() {
        StatisticsDTO statistics = travelerService.getStatistics();
        return ResponseEntity.ok(ApiResponse.success(statistics));
    }
}
