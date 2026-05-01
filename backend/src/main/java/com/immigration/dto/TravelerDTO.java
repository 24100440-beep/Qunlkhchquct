package com.immigration.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelerDTO {

    @NotBlank(message = "Passport number is required")
    private String passportNumber;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Nationality is required")
    private String nationality;

    @NotNull(message = "Entry date is required")
    private LocalDate entryDate;

    @NotBlank(message = "Entry port is required")
    private String entryPort;

    @NotBlank(message = "Entry location is required")
    private String entryLocation;

    @NotBlank(message = "Entry reason is required")
    private String entryReason;

    @NotNull(message = "Max stay days is required")
    @Min(value = 1, message = "Max stay days must be at least 1")
    private Integer maxStayDays;

    private LocalDate exitDate;

    private String exitLocation;
}
