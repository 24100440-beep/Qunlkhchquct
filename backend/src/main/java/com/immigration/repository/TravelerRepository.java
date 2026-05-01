package com.immigration.repository;

import com.immigration.entity.Traveler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TravelerRepository extends JpaRepository<Traveler, Long> {

    Optional<Traveler> findByPassportNumber(String passportNumber);

    boolean existsByPassportNumber(String passportNumber);

    @Query("SELECT t FROM Traveler t WHERE " +
           "(:name IS NULL OR LOWER(t.fullName) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
           "LOWER(t.passportNumber) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:entryDate IS NULL OR t.entryDate = :entryDate)")
    List<Traveler> searchTravelers(@Param("name") String name,
                                   @Param("entryDate") LocalDate entryDate);

    @Query("SELECT t FROM Traveler t WHERE t.exitDate IS NULL")
    List<Traveler> findActiveTravelers();

    @Query("SELECT t FROM Traveler t WHERE t.exitDate IS NOT NULL")
    List<Traveler> findExitedTravelers();

    @Query("SELECT t FROM Traveler t WHERE t.exitDate IS NULL AND t.maxStayDate < :currentDate")
    List<Traveler> findOverstayTravelers(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT COUNT(t) FROM Traveler t WHERE t.exitDate IS NULL")
    long countActiveTravelers();

    @Query("SELECT COUNT(t) FROM Traveler t WHERE t.exitDate IS NOT NULL")
    long countExitedTravelers();

    @Query("SELECT COUNT(t) FROM Traveler t WHERE t.exitDate IS NULL AND t.maxStayDate < :currentDate")
    long countOverstayTravelers(@Param("currentDate") LocalDate currentDate);
}
