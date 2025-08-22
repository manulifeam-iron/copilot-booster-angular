package com.manulife.gwam.repository;

import com.manulife.gwam.entity.Doctor;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class DoctorRepositoryTest {
    
    // Constants for test data
    private static final String DOCTOR_NAME = "Dr. Smith";
    private static final String DOCTOR_SPECIALTY = "Cardiology";
    private static final String DOCTOR_EMAIL = "dr.smith@example.com";
    private static final String DOCTOR_TELEPHONE = "123-456-7890";
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    private Doctor testDoctor;
    
    @Before
    public void setUp() {
        // Arrange - Create test entities
        testDoctor = createTestDoctor();
        
        // Persist test data
        entityManager.persistAndFlush(testDoctor);
    }
    
    @After
    public void tearDown() {
        // Clean up test data
        entityManager.clear();
    }
    
    @Test
    public void shouldReturnDoctorWhenIdIsValid() {
        // Arrange
        Long doctorId = testDoctor.getId();
        
        // Act
        Optional<Doctor> result = doctorRepository.findById(doctorId);
        
        // Assert
        assertTrue("Doctor should be found", result.isPresent());
        assertEquals("Doctor ID should match", doctorId, result.get().getId());
        assertEquals("Doctor name should match", DOCTOR_NAME, result.get().getName());
    }
    
    @Test
    public void shouldReturnEmptyOptionalWhenIdIsInvalid() {
        // Arrange
        Long invalidId = -1L;
        
        // Act
        Optional<Doctor> result = doctorRepository.findById(invalidId);
        
        // Assert
        assertFalse("No doctor should be found for invalid ID", result.isPresent());
    }
    
    @Test
    public void shouldReturnDoctorWhenNameExists() {
        // Arrange
        String doctorName = DOCTOR_NAME;
        
        // Act
        Optional<Doctor> result = doctorRepository.findByName(doctorName);
        
        // Assert
        assertTrue("Doctor should be found by name", result.isPresent());
        assertEquals("Doctor name should match", doctorName, result.get().getName());
    }
    
    @Test
    public void shouldReturnEmptyOptionalWhenNameDoesNotExist() {
        // Arrange
        String nonExistentName = "Dr. NonExistent";
        
        // Act
        Optional<Doctor> result = doctorRepository.findByName(nonExistentName);
        
        // Assert
        assertFalse("No doctor should be found for non-existent name", result.isPresent());
    }
    
    @Test
    public void shouldReturnDoctorsWhenSpecialtyExists() {
        // Arrange
        String specialty = DOCTOR_SPECIALTY;
        
        // Act
        List<Doctor> result = doctorRepository.findBySpecialty(specialty);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return one doctor", 1, result.size());
        assertEquals("Specialty should match", specialty, result.get(0).getSpecialty());
    }
    
    @Test
    public void shouldReturnEmptyListWhenSpecialtyDoesNotExist() {
        // Arrange
        String nonExistentSpecialty = "NonExistentSpecialty";
        
        // Act
        List<Doctor> result = doctorRepository.findBySpecialty(nonExistentSpecialty);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty", result.isEmpty());
    }
    
    @Test
    public void shouldSaveDoctorWhenDataIsValid() {
        // Arrange
        Doctor newDoctor = createTestDoctor();
        newDoctor.setName("Dr. New Doctor");
        newDoctor.setEmail("dr.new@example.com");
        
        // Act
        Doctor result = doctorRepository.save(newDoctor);
        
        // Assert
        assertNotNull("Saved doctor should not be null", result);
        assertNotNull("Saved doctor should have ID", result.getId());
        assertEquals("Name should match", "Dr. New Doctor", result.getName());
        assertEquals("Email should match", "dr.new@example.com", result.getEmail());
    }
    
    @Test
    public void shouldUpdateDoctorWhenChangesAreMade() {
        // Arrange
        String updatedName = "Dr. Updated Name";
        testDoctor.setName(updatedName);
        
        // Act
        Doctor result = doctorRepository.save(testDoctor);
        
        // Assert
        assertNotNull("Updated doctor should not be null", result);
        assertEquals("Name should be updated", updatedName, result.getName());
        assertEquals("ID should remain the same", testDoctor.getId(), result.getId());
    }
    
    @Test
    public void shouldDeleteDoctorWhenIdIsValid() {
        // Arrange
        Long doctorId = testDoctor.getId();
        assertTrue("Doctor should exist before deletion", 
            doctorRepository.existsById(doctorId));
        
        // Act
        doctorRepository.deleteById(doctorId);
        
        // Assert
        assertFalse("Doctor should not exist after deletion", 
            doctorRepository.existsById(doctorId));
    }
    
    // Helper method for creating test data
    private Doctor createTestDoctor() {
        Doctor doctor = new Doctor();
        doctor.setName(DOCTOR_NAME);
        doctor.setSpecialty(DOCTOR_SPECIALTY);
        doctor.setEmail(DOCTOR_EMAIL);
        doctor.setTelephone(DOCTOR_TELEPHONE);
        return doctor;
    }
}
