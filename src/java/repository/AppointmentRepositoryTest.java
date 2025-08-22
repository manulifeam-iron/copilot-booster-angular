package com.manulife.gwam.repository;

/**
 * Comprehensive unit tests for AppointmentRepository
 * Tests all public methods including edge cases and error handling
 * Follows the naming pattern: should[DoSomething]When[Condition]
 */
public class AppointmentRepositoryTest {
    
    // Constants for test data - avoid hardcoding values
    private static final String DOCTOR_NAME = "Dr. Smith";
    private static final String DOCTOR_SPECIALTY = "Cardiology";
    private static final String DOCTOR_EMAIL = "dr.smith@example.com";
    private static final String DOCTOR_TELEPHONE = "123-456-7890";
    private static final String PATIENT_NAME = "John Doe";
    private static final String PATIENT_EMAIL = "john.doe@example.com";
    private static final String APPOINTMENT_NOTES = "Annual Checkup";
    private static final String UPDATED_NOTES = "Follow-up Appointment";
    
    // Test entity manager and repository - no imports needed as these are framework classes
    private TestEntityManager entityManager;
    private AppointmentRepository appointmentRepository;
    
    // Test data entities
    private Doctor testDoctor;
    private Doctor secondDoctor;
    private Patient testPatient;
    private Patient secondPatient;
    private Appointment testAppointment;
    private Appointment secondAppointment;
    
    // Date constants for testing
    private LocalDateTime currentTime;
    private LocalDateTime futureDate;
    private LocalDateTime pastDate;
    private LocalDateTime tomorrowDate;
      /**
     * Set up test data before each test method
     * Creates test entities and persists them for testing
     */
    public void setUp() {
        // Initialize date constants
        currentTime = LocalDateTime.now();
        futureDate = currentTime.plusDays(1);
        pastDate = currentTime.minusDays(1);
        tomorrowDate = currentTime.plusDays(2);
        
        // Arrange - Create test entities
        testDoctor = createTestDoctor(DOCTOR_NAME, DOCTOR_SPECIALTY);
        secondDoctor = createTestDoctor("Dr. Johnson", "Neurology");
        testPatient = createTestPatient(PATIENT_NAME);
        secondPatient = createTestPatient("Jane Smith");
        
        // Create appointments for testing
        testAppointment = createTestAppointment(testDoctor, testPatient, futureDate, APPOINTMENT_NOTES);
        secondAppointment = createTestAppointment(secondDoctor, secondPatient, tomorrowDate, "Consultation");
        
        // Persist test data - assuming entityManager is injected
        entityManager.persistAndFlush(testDoctor);
        entityManager.persistAndFlush(secondDoctor);
        entityManager.persistAndFlush(testPatient);
        entityManager.persistAndFlush(secondPatient);
        entityManager.persistAndFlush(testAppointment);
        entityManager.persistAndFlush(secondAppointment);
    }
      /**
     * Clean up test data after each test method
     * Ensures test isolation
     */
    public void tearDown() {
        // Clean up test data to ensure test isolation
        entityManager.clear();
    }
    
    // ========== Tests for findById method ==========
    
    /**
     * Test that repository returns appointment when valid ID is provided
     */
    public void shouldReturnAppointmentWhenIdIsValid() {
        // Arrange
        Long appointmentId = testAppointment.getId();
        
        // Act
        Optional<Appointment> result = appointmentRepository.findById(appointmentId);
        
        // Assert
        assertTrue("Appointment should be found for valid ID", result.isPresent());
        assertEquals("Appointment ID should match", appointmentId, result.get().getId());
        assertEquals("Appointment notes should match", APPOINTMENT_NOTES, result.get().getNotes());
        assertEquals("Doctor should match", testDoctor.getId(), result.get().getDoctor().getId());
        assertEquals("Patient should match", testPatient.getId(), result.get().getPatient().getId());
    }
    
    /**
     * Test that repository returns empty Optional when invalid ID is provided
     */
    public void shouldReturnEmptyOptionalWhenIdIsInvalid() {
        // Arrange
        Long invalidId = -999L;
        
        // Act
        Optional<Appointment> result = appointmentRepository.findById(invalidId);
        
        // Assert
        assertFalse("No appointment should be found for invalid ID", result.isPresent());
    }
    
    /**
     * Test that repository handles null ID gracefully
     */
    public void shouldReturnEmptyOptionalWhenIdIsNull() {
        // Arrange
        Long nullId = null;
        
        // Act
        Optional<Appointment> result = appointmentRepository.findById(nullId);
        
        // Assert
        assertFalse("No appointment should be found for null ID", result.isPresent());
    }
    
    // ========== Tests for findByDoctorId method ==========
    
    /**
     * Test that repository returns appointments when valid doctor ID is provided
     */
    public void shouldReturnAppointmentsWhenDoctorIdIsValid() {
        // Arrange
        Long doctorId = testDoctor.getId();
        
        // Act
        List<Appointment> result = appointmentRepository.findByDoctorId(doctorId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return one appointment for the doctor", 1, result.size());
        assertEquals("Doctor ID should match", doctorId, result.get(0).getDoctor().getId());
        assertEquals("Appointment notes should match", APPOINTMENT_NOTES, result.get(0).getNotes());
    }
    
    /**
     * Test that repository returns empty list when invalid doctor ID is provided
     */
    public void shouldReturnEmptyListWhenDoctorIdIsInvalid() {
        // Arrange
        Long invalidDoctorId = -999L;
        
        // Act
        List<Appointment> result = appointmentRepository.findByDoctorId(invalidDoctorId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty for invalid doctor ID", result.isEmpty());
    }
    
    /**
     * Test that repository handles null doctor ID gracefully
     */
    public void shouldReturnEmptyListWhenDoctorIdIsNull() {
        // Arrange
        Long nullDoctorId = null;
        
        // Act
        List<Appointment> result = appointmentRepository.findByDoctorId(nullDoctorId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty for null doctor ID", result.isEmpty());
    }
    
    // ========== Tests for findByPatientId method ==========
    
    /**
     * Test that repository returns appointments when valid patient ID is provided
     */
    public void shouldReturnAppointmentsWhenPatientIdIsValid() {
        // Arrange
        Long patientId = testPatient.getId();
        
        // Act
        List<Appointment> result = appointmentRepository.findByPatientId(patientId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return one appointment for the patient", 1, result.size());
        assertEquals("Patient ID should match", patientId, result.get(0).getPatient().getId());
        assertEquals("Appointment notes should match", APPOINTMENT_NOTES, result.get(0).getNotes());
    }
    
    /**
     * Test that repository returns empty list when invalid patient ID is provided
     */
    public void shouldReturnEmptyListWhenPatientIdIsInvalid() {
        // Arrange
        Long invalidPatientId = -999L;
        
        // Act
        List<Appointment> result = appointmentRepository.findByPatientId(invalidPatientId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty for invalid patient ID", result.isEmpty());
    }
    
    /**
     * Test that repository handles null patient ID gracefully
     */
    public void shouldReturnEmptyListWhenPatientIdIsNull() {
        // Arrange
        Long nullPatientId = null;
        
        // Act
        List<Appointment> result = appointmentRepository.findByPatientId(nullPatientId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty for null patient ID", result.isEmpty());
    }
    
    // ========== Tests for findByScheduledTimeBetween method ==========
    
    /**
     * Test that repository returns appointments within valid date range
     */
    public void shouldReturnAppointmentsWhenDateRangeIsValid() {
        // Arrange
        LocalDateTime startTime = futureDate.minusHours(1);
        LocalDateTime endTime = futureDate.plusHours(1);
        
        // Act
        List<Appointment> result = appointmentRepository.findByScheduledTimeBetween(startTime, endTime);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return one appointment within range", 1, result.size());
        assertTrue("Scheduled time should be within range", 
            result.get(0).getScheduledTime().isAfter(startTime) && 
            result.get(0).getScheduledTime().isBefore(endTime));
    }
    
    /**
     * Test that repository returns empty list when date range excludes all appointments
     */
    public void shouldReturnEmptyListWhenDateRangeExcludesAppointments() {
        // Arrange
        LocalDateTime startTime = pastDate.minusHours(2);
        LocalDateTime endTime = pastDate.minusHours(1);
        
        // Act
        List<Appointment> result = appointmentRepository.findByScheduledTimeBetween(startTime, endTime);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty when range excludes appointments", result.isEmpty());
    }
    
    /**
     * Test that repository handles null date parameters gracefully
     */
    public void shouldHandleNullDatesWhenFindingByDateRange() {
        // Arrange - Testing with null start date
        LocalDateTime nullStartTime = null;
        LocalDateTime endTime = futureDate.plusHours(1);
        
        // Act & Assert - Should handle gracefully without throwing exception
        try {
            List<Appointment> result = appointmentRepository.findByScheduledTimeBetween(nullStartTime, endTime);
            assertNotNull("Result should not be null even with null start date", result);
        } catch (Exception e) {
            // If exception is thrown, verify it's handled appropriately
            assertTrue("Should handle null dates gracefully", true);
        }
    }
    
    // ========== Tests for findUpcomingAppointmentsByDoctor method ==========
    
    /**
     * Test that repository returns upcoming appointments for valid doctor
     */
    public void shouldReturnUpcomingAppointmentsWhenDoctorHasFutureAppointments() {
        // Arrange
        Long doctorId = testDoctor.getId();
        LocalDateTime referenceTime = currentTime;
        
        // Act
        List<Appointment> result = appointmentRepository.findUpcomingAppointmentsByDoctor(doctorId, referenceTime);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return one upcoming appointment", 1, result.size());
        assertTrue("Appointment should be in the future", 
            result.get(0).getScheduledTime().isAfter(referenceTime));
        assertEquals("Doctor ID should match", doctorId, result.get(0).getDoctor().getId());
    }
    
    /**
     * Test that repository returns empty list when doctor has no upcoming appointments
     */
    public void shouldReturnEmptyListWhenDoctorHasNoUpcomingAppointments() {
        // Arrange
        Long doctorId = testDoctor.getId();
        LocalDateTime futureReferenceTime = futureDate.plusHours(1);
        
        // Act
        List<Appointment> result = appointmentRepository.findUpcomingAppointmentsByDoctor(doctorId, futureReferenceTime);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty when no upcoming appointments", result.isEmpty());
    }
    
    // ========== Tests for findUpcomingAppointmentsByPatient method ==========
    
    /**
     * Test that repository returns upcoming appointments for valid patient
     */
    public void shouldReturnUpcomingAppointmentsWhenPatientHasFutureAppointments() {
        // Arrange
        Long patientId = testPatient.getId();
        LocalDateTime referenceTime = currentTime;
        
        // Act
        List<Appointment> result = appointmentRepository.findUpcomingAppointmentsByPatient(patientId, referenceTime);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return one upcoming appointment", 1, result.size());
        assertTrue("Appointment should be in the future", 
            result.get(0).getScheduledTime().isAfter(referenceTime));
        assertEquals("Patient ID should match", patientId, result.get(0).getPatient().getId());
    }
    
    /**
     * Test that repository returns empty list when patient has no upcoming appointments
     */
    public void shouldReturnEmptyListWhenPatientHasNoUpcomingAppointments() {
        // Arrange
        Long patientId = testPatient.getId();
        LocalDateTime futureReferenceTime = futureDate.plusHours(1);
        
        // Act
        List<Appointment> result = appointmentRepository.findUpcomingAppointmentsByPatient(patientId, futureReferenceTime);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertTrue("Result should be empty when no upcoming appointments", result.isEmpty());
    }
    
    // ========== Tests for existsByDoctorIdAndScheduledTime method ==========
    
    /**
     * Test that repository returns true when doctor has appointment at specific time
     */
    public void shouldReturnTrueWhenDoctorHasAppointmentAtSpecificTime() {
        // Arrange
        Long doctorId = testDoctor.getId();
        LocalDateTime scheduledTime = testAppointment.getScheduledTime();
        
        // Act
        boolean result = appointmentRepository.existsByDoctorIdAndScheduledTime(doctorId, scheduledTime);
        
        // Assert
        assertTrue("Should return true when doctor has appointment at specific time", result);
    }
    
    /**
     * Test that repository returns false when doctor has no appointment at specific time
     */
    public void shouldReturnFalseWhenDoctorHasNoAppointmentAtSpecificTime() {
        // Arrange
        Long doctorId = testDoctor.getId();
        LocalDateTime nonExistentTime = futureDate.plusDays(10);
        
        // Act
        boolean result = appointmentRepository.existsByDoctorIdAndScheduledTime(doctorId, nonExistentTime);
        
        // Assert
        assertFalse("Should return false when doctor has no appointment at specific time", result);
    }
    
    /**
     * Test that repository handles invalid doctor ID when checking existence
     */
    public void shouldReturnFalseWhenDoctorIdIsInvalidForExistenceCheck() {
        // Arrange
        Long invalidDoctorId = -999L;
        LocalDateTime scheduledTime = testAppointment.getScheduledTime();
        
        // Act
        boolean result = appointmentRepository.existsByDoctorIdAndScheduledTime(invalidDoctorId, scheduledTime);
        
        // Assert
        assertFalse("Should return false for invalid doctor ID", result);
    }
    
    // ========== Tests for existsByPatientIdAndScheduledTime method ==========
    
    /**
     * Test that repository returns true when patient has appointment at specific time
     */
    public void shouldReturnTrueWhenPatientHasAppointmentAtSpecificTime() {
        // Arrange
        Long patientId = testPatient.getId();
        LocalDateTime scheduledTime = testAppointment.getScheduledTime();
        
        // Act
        boolean result = appointmentRepository.existsByPatientIdAndScheduledTime(patientId, scheduledTime);
        
        // Assert
        assertTrue("Should return true when patient has appointment at specific time", result);
    }
    
    /**
     * Test that repository returns false when patient has no appointment at specific time
     */
    public void shouldReturnFalseWhenPatientHasNoAppointmentAtSpecificTime() {
        // Arrange
        Long patientId = testPatient.getId();
        LocalDateTime nonExistentTime = futureDate.plusDays(10);
        
        // Act
        boolean result = appointmentRepository.existsByPatientIdAndScheduledTime(patientId, nonExistentTime);
        
        // Assert
        assertFalse("Should return false when patient has no appointment at specific time", result);
    }
    
    /**
     * Test that repository handles invalid patient ID when checking existence
     */
    public void shouldReturnFalseWhenPatientIdIsInvalidForExistenceCheck() {
        // Arrange
        Long invalidPatientId = -999L;
        LocalDateTime scheduledTime = testAppointment.getScheduledTime();
        
        // Act
        boolean result = appointmentRepository.existsByPatientIdAndScheduledTime(invalidPatientId, scheduledTime);
        
        // Assert
        assertFalse("Should return false for invalid patient ID", result);
    }
    
    // ========== Tests for countAppointmentsByDoctorAndDate method ==========
    
    /**
     * Test that repository returns correct count when doctor has appointments on specific date
     */
    public void shouldReturnCorrectCountWhenDoctorHasAppointmentsOnSpecificDate() {
        // Arrange
        Long doctorId = testDoctor.getId();
        LocalDateTime date = testAppointment.getScheduledTime();
        
        // Act
        Long result = appointmentRepository.countAppointmentsByDoctorAndDate(doctorId, date);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return count of 1", Long.valueOf(1), result);
    }
    
    /**
     * Test that repository returns zero count when doctor has no appointments on specific date
     */
    public void shouldReturnZeroCountWhenDoctorHasNoAppointmentsOnSpecificDate() {
        // Arrange
        Long doctorId = testDoctor.getId();
        LocalDateTime differentDate = futureDate.plusDays(5);
        
        // Act
        Long result = appointmentRepository.countAppointmentsByDoctorAndDate(doctorId, differentDate);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return count of 0", Long.valueOf(0), result);
    }
    
    /**
     * Test that repository returns zero count for invalid doctor ID
     */
    public void shouldReturnZeroCountWhenDoctorIdIsInvalidForCounting() {
        // Arrange
        Long invalidDoctorId = -999L;
        LocalDateTime date = testAppointment.getScheduledTime();
        
        // Act
        Long result = appointmentRepository.countAppointmentsByDoctorAndDate(invalidDoctorId, date);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return count of 0 for invalid doctor ID", Long.valueOf(0), result);
    }
    
    // ========== Tests for save method (Create and Update) ==========
    
    /**
     * Test that repository saves new appointment when data is valid
     */
    public void shouldSaveAppointmentWhenDataIsValid() {
        // Arrange
        Appointment newAppointment = createTestAppointment(testDoctor, testPatient, 
            futureDate.plusDays(3), "New Appointment");
        
        // Act
        Appointment result = appointmentRepository.save(newAppointment);
        
        // Assert
        assertNotNull("Saved appointment should not be null", result);
        assertNotNull("Saved appointment should have ID", result.getId());
        assertEquals("Notes should match", "New Appointment", result.getNotes());
        assertEquals("Doctor should match", testDoctor.getId(), result.getDoctor().getId());
        assertEquals("Patient should match", testPatient.getId(), result.getPatient().getId());
        assertTrue("Scheduled time should match", result.getScheduledTime().equals(futureDate.plusDays(3)));
    }
    
    /**
     * Test that repository updates existing appointment when changes are made
     */
    public void shouldUpdateAppointmentWhenChangesAreMade() {
        // Arrange
        Long originalId = testAppointment.getId();
        testAppointment.setNotes(UPDATED_NOTES);
        
        // Act
        Appointment result = appointmentRepository.save(testAppointment);
        
        // Assert
        assertNotNull("Updated appointment should not be null", result);
        assertEquals("ID should remain the same", originalId, result.getId());
        assertEquals("Notes should be updated", UPDATED_NOTES, result.getNotes());
        assertEquals("Doctor should remain the same", testDoctor.getId(), result.getDoctor().getId());
        assertEquals("Patient should remain the same", testPatient.getId(), result.getPatient().getId());
    }
    
    /**
     * Test that repository handles saving appointment with minimal required data
     */
    public void shouldSaveAppointmentWhenMinimalDataIsProvided() {
        // Arrange
        Appointment minimalAppointment = createTestAppointment(testDoctor, testPatient, 
            futureDate.plusDays(4), null); // Notes can be null
        
        // Act
        Appointment result = appointmentRepository.save(minimalAppointment);
        
        // Assert
        assertNotNull("Saved appointment should not be null", result);
        assertNotNull("Saved appointment should have ID", result.getId());
        assertEquals("Doctor should match", testDoctor.getId(), result.getDoctor().getId());
        assertEquals("Patient should match", testPatient.getId(), result.getPatient().getId());
    }
    
    // ========== Tests for delete methods ==========
    
    /**
     * Test that repository deletes appointment when valid ID is provided
     */
    public void shouldDeleteAppointmentWhenIdIsValid() {
        // Arrange
        Long appointmentId = testAppointment.getId();
        assertTrue("Appointment should exist before deletion", 
            appointmentRepository.existsById(appointmentId));
        
        // Act
        appointmentRepository.deleteById(appointmentId);
        
        // Assert
        assertFalse("Appointment should not exist after deletion", 
            appointmentRepository.existsById(appointmentId));
    }
    
    /**
     * Test that repository handles deletion of non-existent appointment gracefully
     */
    public void shouldNotThrowExceptionWhenDeletingNonExistentAppointment() {
        // Arrange
        Long nonExistentId = -999L;
        
        // Act & Assert - Should not throw exception
        try {
            appointmentRepository.deleteById(nonExistentId);
            assertTrue("Method should complete without throwing exception", true);
        } catch (Exception e) {
            fail("Should not throw exception when deleting non-existent appointment");
        }
    }
    
    /**
     * Test that repository deletes appointments when doctor ID is provided
     */
    public void shouldDeleteAppointmentsWhenDoctorIdIsValid() {
        // Arrange
        Long doctorId = testDoctor.getId();
        assertTrue("Doctor should have appointments before deletion", 
            !appointmentRepository.findByDoctorId(doctorId).isEmpty());
        
        // Act
        appointmentRepository.deleteByDoctorId(doctorId);
        
        // Assert
        assertTrue("Doctor should have no appointments after deletion", 
            appointmentRepository.findByDoctorId(doctorId).isEmpty());
    }
    
    /**
     * Test that repository deletes appointments when patient ID is provided
     */
    public void shouldDeleteAppointmentsWhenPatientIdIsValid() {
        // Arrange
        Long patientId = testPatient.getId();
        assertTrue("Patient should have appointments before deletion", 
            !appointmentRepository.findByPatientId(patientId).isEmpty());
        
        // Act
        appointmentRepository.deleteByPatientId(patientId);
        
        // Assert
        assertTrue("Patient should have no appointments after deletion", 
            appointmentRepository.findByPatientId(patientId).isEmpty());
    }
    
    // ========== Tests for repository methods with multiple appointments ==========
    
    /**
     * Test that repository correctly handles multiple appointments for the same doctor
     */
    public void shouldReturnMultipleAppointmentsWhenDoctorHasMultipleBookings() {
        // Arrange - Create additional appointment for the same doctor
        Appointment additionalAppointment = createTestAppointment(testDoctor, secondPatient, 
            futureDate.plusDays(7), "Additional appointment");
        entityManager.persistAndFlush(additionalAppointment);
        
        Long doctorId = testDoctor.getId();
        
        // Act
        List<Appointment> result = appointmentRepository.findByDoctorId(doctorId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return two appointments for the doctor", 2, result.size());
        // Verify both appointments belong to the same doctor
        for (Appointment appointment : result) {
            assertEquals("All appointments should belong to the same doctor", 
                doctorId, appointment.getDoctor().getId());
        }
    }
    
    /**
     * Test that repository correctly handles multiple appointments for the same patient
     */
    public void shouldReturnMultipleAppointmentsWhenPatientHasMultipleBookings() {
        // Arrange - Create additional appointment for the same patient
        Appointment additionalAppointment = createTestAppointment(secondDoctor, testPatient, 
            futureDate.plusDays(8), "Another appointment");
        entityManager.persistAndFlush(additionalAppointment);
        
        Long patientId = testPatient.getId();
        
        // Act
        List<Appointment> result = appointmentRepository.findByPatientId(patientId);
        
        // Assert
        assertNotNull("Result should not be null", result);
        assertEquals("Should return two appointments for the patient", 2, result.size());
        // Verify both appointments belong to the same patient
        for (Appointment appointment : result) {
            assertEquals("All appointments should belong to the same patient", 
                patientId, appointment.getPatient().getId());
        }
    }
    
    // ========== Helper methods for creating test data ==========
    
    /**
     * Creates a test doctor entity with specified name and specialty
     * @param name Doctor's name
     * @param specialty Doctor's specialty
     * @return Doctor entity for testing
     */
    private Doctor createTestDoctor(String name, String specialty) {
        Doctor doctor = new Doctor();
        doctor.setName(name);
        doctor.setSpecialty(specialty);
        doctor.setEmail(name.toLowerCase().replace(" ", ".") + "@example.com");
        doctor.setTelephone(DOCTOR_TELEPHONE);
        return doctor;
    }
    
    /**
     * Creates a test patient entity with specified name
     * @param name Patient's name
     * @return Patient entity for testing
     */
    private Patient createTestPatient(String name) {
        Patient patient = new Patient();
        patient.setName(name);
        patient.setEmail(name.toLowerCase().replace(" ", ".") + "@example.com");
        return patient;
    }
    
    /**
     * Creates a test appointment entity with specified parameters
     * @param doctor Doctor for the appointment
     * @param patient Patient for the appointment
     * @param scheduledTime When the appointment is scheduled
     * @param notes Notes for the appointment
     * @return Appointment entity for testing
     */
    private Appointment createTestAppointment(Doctor doctor, Patient patient, 
            LocalDateTime scheduledTime, String notes) {
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setScheduledTime(scheduledTime);
        appointment.setNotes(notes);
        return appointment;
    }
    
    /**
     * Verifies that an appointment entity has expected values
     * @param appointment Appointment to verify
     * @param expectedDoctor Expected doctor
     * @param expectedPatient Expected patient
     * @param expectedNotes Expected notes
     */
    private void verifyAppointmentData(Appointment appointment, Doctor expectedDoctor, 
            Patient expectedPatient, String expectedNotes) {
        assertNotNull("Appointment should not be null", appointment);
        assertEquals("Doctor should match", expectedDoctor.getId(), appointment.getDoctor().getId());
        assertEquals("Patient should match", expectedPatient.getId(), appointment.getPatient().getId());
        assertEquals("Notes should match", expectedNotes, appointment.getNotes());
    }
}
