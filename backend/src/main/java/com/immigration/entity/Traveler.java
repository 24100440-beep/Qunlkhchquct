package com.immigration.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "travelers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Traveler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "passport_number", unique = true, nullable = false, length = 50)
    @NotBlank(message = "Passport number is required")
    private String passportNumber;

    @Column(name = "full_name", nullable = false)
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Column(name = "date_of_birth", nullable = false)
    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Column(name = "nationality", nullable = false, length = 100)
    @NotBlank(message = "Nationality is required")
    private String nationality;

    @Column(name = "entry_date", nullable = false)
    @NotNull(message = "Entry date is required")
    private LocalDate entryDate;

    @Column(name = "entry_port", nullable = false)
    @NotBlank(message = "Entry port is required")
    private String entryPort;

    @Column(name = "entry_location", nullable = false)
    @NotBlank(message = "Entry location is required")
    private String entryLocation;

    @Column(name = "entry_reason", nullable = false, length = 100)
    @NotBlank(message = "Entry reason is required")
    private String entryReason;

    @Column(name = "max_stay_days", nullable = false)
    @Min(value = 1, message = "Max stay days must be at least 1")
    private Integer maxStayDays;

    @Column(name = "max_stay_date", nullable = false)
    private LocalDate maxStayDate;

    @Column(name = "exit_date")
    private LocalDate exitDate;

    @Column(name = "exit_location")
    private String exitLocation;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    public void calculateMaxStayDate() {
        if (entryDate != null && maxStayDays != null) {
            this.maxStayDate = entryDate.plusDays(maxStayDays);
        }
    }
}
