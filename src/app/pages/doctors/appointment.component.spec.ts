import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppointmentComponent } from './appointment.component';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../../type';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;
  let mockApiService: any;
  let mockMeta: any;
  let mockTitle: any;

  const mockDoctors = [
    { id: '1', name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Johnson', specialty: 'Neurology' }
  ];

  const mockPatients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ];

  const mockAppointments: Appointment[] = [
    { 
      id: '1', 
      doctor: 'Dr. Smith', 
      patient: 'John Doe', 
      scheduledTime: '2025-08-23T10:00:00', 
      notes: 'Annual Checkup',
      _links: {
        self: { href: 'http://localhost:8080/appointments/1' },
        appointment: { href: 'http://localhost:8080/appointments/1' },
        patient: { href: 'http://localhost:8080/appointments/1/patient' },
        doctor: { href: 'http://localhost:8080/appointments/1/doctor' }
      }
    },
    { 
      id: '2', 
      doctor: 'Dr. Johnson', 
      patient: 'Jane Smith', 
      scheduledTime: '2025-08-24T14:30:00', 
      notes: 'Follow-up appointment',
      _links: {
        self: { href: 'http://localhost:8080/appointments/2' },
        appointment: { href: 'http://localhost:8080/appointments/2' },
        patient: { href: 'http://localhost:8080/appointments/2/patient' },
        doctor: { href: 'http://localhost:8080/appointments/2/doctor' }
      }
    },
    { 
      id: '3', 
      doctor: 'Dr. Brown', 
      patient: 'Bob Wilson', 
      scheduledTime: '2025-08-25T09:15:00', 
      notes: 'Consultation for back pain',
      _links: {
        self: { href: 'http://localhost:8080/appointments/3' },
        appointment: { href: 'http://localhost:8080/appointments/3' },
        patient: { href: 'http://localhost:8080/appointments/3/patient' },
        doctor: { href: 'http://localhost:8080/appointments/3/doctor' }
      }
    }
  ];
  beforeEach(async () => {
    mockApiService = {
      getAppointments: jasmine.createSpy('getAppointments').and.returnValue(Promise.resolve(mockAppointments)),
      getDoctors: jasmine.createSpy('getDoctors').and.returnValue(Promise.resolve(mockDoctors)),
      getPatients: jasmine.createSpy('getPatients').and.returnValue(Promise.resolve(mockPatients)),
      createAppointment: jasmine.createSpy('createAppointment').and.returnValue(Promise.resolve({ id: '4' }))
    };

    mockMeta = { updateTag: jasmine.createSpy('updateTag') };
    mockTitle = { setTitle: jasmine.createSpy('setTitle') };

    await TestBed.configureTestingModule({
      imports: [AppointmentComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Meta, useValue: mockMeta },
        { provide: Title, useValue: mockTitle },
        DatePipe
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title and meta tags on construction', () => {
    expect(mockTitle.setTitle).toHaveBeenCalledWith('Appointments');
    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Appointments List'
    });
    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Appointments'
    });
    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Appointments List'
    });
  });

  it('should call getAppointments on init', () => {
    fixture.detectChanges();
    expect(mockApiService.getAppointments).toHaveBeenCalled();
  });
  it('should display loading spinner while appointments are loading', () => {
    // Mock the isLoading computed signal to return true
    spyOnProperty(component, 'isLoading', 'get').and.returnValue(true);
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.loading-spinner');
    expect(loadingElement).toBeTruthy();
  });

  it('should display appointments table when data is loaded', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Wait for async operations

    const tableElement = fixture.nativeElement.querySelector('.table');
    expect(tableElement).toBeTruthy();
    
    const headerCells = fixture.nativeElement.querySelectorAll('th');
    expect(headerCells.length).toBe(4);
    expect(headerCells[0].textContent.trim()).toBe('Doctor');
    expect(headerCells[1].textContent.trim()).toBe('Patient');
    expect(headerCells[2].textContent.trim()).toBe('Date & Time');
    expect(headerCells[3].textContent.trim()).toBe('Notes');
  }));

  it('should display all appointment details correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Wait for async operations
    fixture.detectChanges(); // Update the view

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);

    // Check first appointment
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent.trim()).toBe('Dr. Smith');
    expect(firstRowCells[1].textContent.trim()).toBe('John Doe');
    expect(firstRowCells[2].textContent.trim()).toContain('August 23, 2025');
    expect(firstRowCells[3].textContent.trim()).toBe('Annual Checkup');

    // Check second appointment
    const secondRowCells = rows[1].querySelectorAll('td');
    expect(secondRowCells[0].textContent.trim()).toBe('Dr. Johnson');
    expect(secondRowCells[1].textContent.trim()).toBe('Jane Smith');
    expect(secondRowCells[2].textContent.trim()).toContain('August 24, 2025');
    expect(secondRowCells[3].textContent.trim()).toBe('Follow-up appointment');

    // Check third appointment
    const thirdRowCells = rows[2].querySelectorAll('td');
    expect(thirdRowCells[0].textContent.trim()).toBe('Dr. Brown');
    expect(thirdRowCells[1].textContent.trim()).toBe('Bob Wilson');
    expect(thirdRowCells[2].textContent.trim()).toContain('August 25, 2025');
    expect(thirdRowCells[3].textContent.trim()).toBe('Consultation for back pain');
  }));

  it('should format appointment date and time correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const firstRowCells = fixture.nativeElement.querySelectorAll('tbody tr')[0].querySelectorAll('td');
    const dateTimeText = firstRowCells[2].textContent.trim();
    
    // Should format as "MMMM dd, yyyy h:mm a" (e.g., "August 23, 2025 10:00 AM")
    expect(dateTimeText).toContain('August 23, 2025');
    expect(dateTimeText).toContain('10:00 AM');
  }));

  it('should display complete appointment notes', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    
    // Verify all notes are displayed completely
    expect(rows[0].querySelectorAll('td')[3].textContent.trim()).toBe('Annual Checkup');
    expect(rows[1].querySelectorAll('td')[3].textContent.trim()).toBe('Follow-up appointment');
    expect(rows[2].querySelectorAll('td')[3].textContent.trim()).toBe('Consultation for back pain');
  }));

  it('should handle empty appointments list', fakeAsync(() => {
    // Reset mock to return empty array
    mockApiService.getAppointments.and.returnValue(Promise.resolve([]));
    
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
    
    // Table should still be present but with no data rows
    const tableElement = fixture.nativeElement.querySelector('.table');
    expect(tableElement).toBeTruthy();
  }));

  it('should display footer component', () => {
    fixture.detectChanges();
    
    const footerElement = fixture.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });

  it('should have proper table styling classes', () => {
    fixture.detectChanges();
    
    const tableElement = fixture.nativeElement.querySelector('.table');
    expect(tableElement.classList.contains('table-zebra')).toBeTruthy();
    expect(tableElement.classList.contains('w-full')).toBeTruthy();
  });

  it('should track appointments by id', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    
    // Angular should use the id for tracking (this ensures proper re-rendering)
    // We can verify the appointments are properly tracked by checking they all render
    expect(rows[0]).toBeTruthy();
    expect(rows[1]).toBeTruthy();
    expect(rows[2]).toBeTruthy();
  }));

  // Modal functionality tests
  it('should display Create Appointment button', () => {
    fixture.detectChanges();
    
    const createButton = fixture.nativeElement.querySelector('button');
    expect(createButton).toBeTruthy();
    expect(createButton.textContent.trim()).toBe('+ Create Appointment');
  });

  it('should open modal when Create Appointment button is clicked', () => {
    fixture.detectChanges();
    
    const createButton = fixture.nativeElement.querySelector('button');
    createButton.click();
    fixture.detectChanges();
    
    expect(component.isModalOpen()).toBeTruthy();
    
    const modal = fixture.nativeElement.querySelector('.modal-open');
    expect(modal).toBeTruthy();
  });

  it('should close modal when Cancel button is clicked', () => {
    component.openModal();
    fixture.detectChanges();
    
    const cancelButton = fixture.nativeElement.querySelector('.btn-ghost');
    cancelButton.click();
    fixture.detectChanges();
    
    expect(component.isModalOpen()).toBeFalsy();
  });

  it('should have form validation for required fields', () => {
    component.openModal();
    fixture.detectChanges();
    
    expect(component.appointmentForm.get('doctorId')?.hasError('required')).toBeTruthy();
    expect(component.appointmentForm.get('patientId')?.hasError('required')).toBeTruthy();
    expect(component.appointmentForm.get('scheduledTime')?.hasError('required')).toBeTruthy();
    expect(component.appointmentForm.get('notes')?.hasError('required')).toBeTruthy();
  });

  it('should populate doctor dropdown from API', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    
    component.openModal();
    fixture.detectChanges();
    
    const doctorSelect = fixture.nativeElement.querySelector('select[formControlName="doctorId"]');
    const options = doctorSelect.querySelectorAll('option');
    
    expect(options.length).toBe(3); // 1 placeholder + 2 doctors
    expect(options[1].textContent.trim()).toBe('Dr. Smith - Cardiology');
    expect(options[2].textContent.trim()).toBe('Dr. Johnson - Neurology');
  }));

  it('should populate patient dropdown from API', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    
    component.openModal();
    fixture.detectChanges();
    
    const patientSelect = fixture.nativeElement.querySelector('select[formControlName="patientId"]');
    const options = patientSelect.querySelectorAll('option');
    
    expect(options.length).toBe(3); // 1 placeholder + 2 patients
    expect(options[1].textContent.trim()).toBe('John Doe');
    expect(options[2].textContent.trim()).toBe('Jane Smith');
  }));

  it('should call createAppointment API when form is submitted', fakeAsync(() => {
    component.openModal();
    fixture.detectChanges();
    
    // Fill out the form
    component.appointmentForm.patchValue({
      doctorId: '1',
      patientId: '1',
      scheduledTime: '2025-08-26T10:00',
      notes: 'Test appointment'
    });
    
    component.onSubmit();
    tick();
    
    expect(mockApiService.createAppointment).toHaveBeenCalledWith({
      doctorId: '1',
      patientId: '1',
      scheduledTime: '2025-08-26T10:00',
      notes: 'Test appointment'
    });
  }));

  it('should close modal and refresh appointments after successful creation', fakeAsync(() => {
    component.openModal();
    fixture.detectChanges();
    
    component.appointmentForm.patchValue({
      doctorId: '1',
      patientId: '1',
      scheduledTime: '2025-08-26T10:00',
      notes: 'Test appointment'
    });
    
    spyOn(component.appointments, 'reload');
    
    component.onSubmit();
    tick();
    
    expect(component.isModalOpen()).toBeFalsy();
    expect(component.appointments.reload).toHaveBeenCalled();
  }));

  it('should disable submit button when form is invalid', () => {
    component.openModal();
    fixture.detectChanges();
    
    const submitButton = fixture.nativeElement.querySelector('.btn-primary');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.openModal();
    fixture.detectChanges();
    
    component.appointmentForm.patchValue({
      doctorId: '1',
      patientId: '1',
      scheduledTime: '2025-08-26T10:00',
      notes: 'Test appointment'
    });
    fixture.detectChanges();
    
    const submitButton = fixture.nativeElement.querySelector('.btn-primary');
    expect(submitButton.disabled).toBeFalsy();
  });
});
