package com.manulife.gwam.repository;

import com.manulife.gwam.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByDoctorId(Long doctorId);
    
    List<Appointment> findByPatientId(Long patientId);
    
    List<Appointment> findByScheduledTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.scheduledTime >= :startTime")
    List<Appointment> findUpcomingAppointmentsByDoctor(@Param("doctorId") Long doctorId, @Param("startTime") LocalDateTime startTime);
    
    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId AND a.scheduledTime >= :startTime")
    List<Appointment> findUpcomingAppointmentsByPatient(@Param("patientId") Long patientId, @Param("startTime") LocalDateTime startTime);
    
    boolean existsByDoctorIdAndScheduledTime(Long doctorId, LocalDateTime scheduledTime);
    
    boolean existsByPatientIdAndScheduledTime(Long patientId, LocalDateTime scheduledTime);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.id = :doctorId AND DATE(a.scheduledTime) = DATE(:date)")
    Long countAppointmentsByDoctorAndDate(@Param("doctorId") Long doctorId, @Param("date") LocalDateTime date);
    
    void deleteByDoctorId(Long doctorId);
    
    void deleteByPatientId(Long patientId);
}
