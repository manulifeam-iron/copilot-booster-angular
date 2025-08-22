import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Doctor, Patient } from '../../type';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  const url = environment.apiUrl;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
    // @ts-ignore
    (window as any).fetch = jasmine.createSpy();
  });

  afterEach(() => {
    // @ts-ignore
    (window as any).fetch = undefined;
  });

  it('should fetch patients', async () => {
    const mockPatients: Patient[] = [{ id: '1', name: 'John Doe' }];
    // @ts-ignore
    (window as any).fetch.and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ _embedded: { patients: mockPatients } })
    }));

    const result = await service.getPatients();
    expect(result).toEqual(mockPatients);
    expect((window as any).fetch).toHaveBeenCalledWith(
      `${url}/patients`,
      jasmine.objectContaining({
        headers: jasmine.any(Object)
      })
    );
  });

  it('should fetch doctors', async () => {
    const mockDoctors: Doctor[] = [{
      id: '1',
      name: 'Dr. Smith',
      specialty: 'Cardiology',
      address: {
        street: '123 Main St',
        city: 'Metropolis',
        province: 'ON',
        postalCode: 'A1A1A1'
      },
      dob: '1970-01-01',
      telephone: '123-456-7890',
      email: 'dr.smith@example.com'
    }];
    // @ts-ignore
    (window as any).fetch.and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ _embedded: { doctors: mockDoctors } })
    }));

    const result = await service.getDoctors();
    expect(result).toEqual(mockDoctors);
    expect((window as any).fetch).toHaveBeenCalledWith(
      `${url}/doctors`,
      jasmine.objectContaining({
        headers: jasmine.any(Object)
      })
    );
  });

  it('should fetch doctor by id', async () => {
    const mockDoctor: Doctor = {
      id: '1',
      name: 'Dr. Smith',
      specialty: 'Cardiology',
      address: {
        street: '123 Main St',
        city: 'Metropolis',
        province: 'ON',
        postalCode: 'A1A1A1'
      },
      dob: '1970-01-01',
      telephone: '123-456-7890',
      email: 'dr.smith@example.com'
    };
    // @ts-ignore
    (window as any).fetch.and.returnValue(Promise.resolve({
      json: () => Promise.resolve(mockDoctor)
    }));    const result = await service.getDoctorById('1');
    expect(result).toEqual(mockDoctor);
    expect((window as any).fetch).toHaveBeenCalledWith(
      `${url}/doctors/1`,
      jasmine.objectContaining({
        headers: jasmine.any(Object)
      })
    );
  });  it('should fetch appointments', async () => {
    const mockAppointmentsResponse = {
      _embedded: {
        appointments: [
          {
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
            scheduledTime: '2025-08-24T10:00:00',
            notes: 'Follow-up',
            _links: {
              self: { href: 'http://localhost:8080/appointments/2' },
              appointment: { href: 'http://localhost:8080/appointments/2' },
              patient: { href: 'http://localhost:8080/appointments/2/patient' },
              doctor: { href: 'http://localhost:8080/appointments/2/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-25T10:00:00',
            notes: 'Consultation',
            _links: {
              self: { href: 'http://localhost:8080/appointments/3' },
              appointment: { href: 'http://localhost:8080/appointments/3' },
              patient: { href: 'http://localhost:8080/appointments/3/patient' },
              doctor: { href: 'http://localhost:8080/appointments/3/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-26T10:00:00',
            notes: 'Lab Results',
            _links: {
              self: { href: 'http://localhost:8080/appointments/4' },
              appointment: { href: 'http://localhost:8080/appointments/4' },
              patient: { href: 'http://localhost:8080/appointments/4/patient' },
              doctor: { href: 'http://localhost:8080/appointments/4/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-27T10:00:00',
            notes: 'Vaccination',
            _links: {
              self: { href: 'http://localhost:8080/appointments/5' },
              appointment: { href: 'http://localhost:8080/appointments/5' },
              patient: { href: 'http://localhost:8080/appointments/5/patient' },
              doctor: { href: 'http://localhost:8080/appointments/5/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-28T10:00:00',
            notes: 'Prescription Renewal',
            _links: {
              self: { href: 'http://localhost:8080/appointments/6' },
              appointment: { href: 'http://localhost:8080/appointments/6' },
              patient: { href: 'http://localhost:8080/appointments/6/patient' },
              doctor: { href: 'http://localhost:8080/appointments/6/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-29T10:00:00',
            notes: 'Specialist Referral',
            _links: {
              self: { href: 'http://localhost:8080/appointments/7' },
              appointment: { href: 'http://localhost:8080/appointments/7' },
              patient: { href: 'http://localhost:8080/appointments/7/patient' },
              doctor: { href: 'http://localhost:8080/appointments/7/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-30T10:00:00',
            notes: 'Skin Rash',
            _links: {
              self: { href: 'http://localhost:8080/appointments/8' },
              appointment: { href: 'http://localhost:8080/appointments/8' },
              patient: { href: 'http://localhost:8080/appointments/8/patient' },
              doctor: { href: 'http://localhost:8080/appointments/8/doctor' }
            }
          },
          {
            scheduledTime: '2025-08-31T10:00:00',
            notes: 'Back Pain',
            _links: {
              self: { href: 'http://localhost:8080/appointments/9' },
              appointment: { href: 'http://localhost:8080/appointments/9' },
              patient: { href: 'http://localhost:8080/appointments/9/patient' },
              doctor: { href: 'http://localhost:8080/appointments/9/doctor' }
            }
          },
          {
            scheduledTime: '2025-09-01T10:00:00',
            notes: 'Headache',
            _links: {
              self: { href: 'http://localhost:8080/appointments/10' },
              appointment: { href: 'http://localhost:8080/appointments/10' },
              patient: { href: 'http://localhost:8080/appointments/10/patient' },
              doctor: { href: 'http://localhost:8080/appointments/10/doctor' }
            }
          }
        ]
      },
      _links: {
        self: { href: 'http://localhost:8080/appointments?page=0&size=20' },
        profile: { href: 'http://localhost:8080/profile/appointments' }
      },
      page: {
        size: 20,
        totalElements: 10,
        totalPages: 1,
        number: 0
      }
    };

    const mockDoctor = { name: 'Dr. Smith' };
    const mockPatient = { name: 'John Doe' };

    // @ts-ignore
    (window as any).fetch.and.callFake((fetchUrl: string) => {
      if (fetchUrl.includes('/appointments') && !fetchUrl.includes('/patient') && !fetchUrl.includes('/doctor')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockAppointmentsResponse)
        });
      } else if (fetchUrl.includes('/doctor')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockDoctor)
        });
      } else if (fetchUrl.includes('/patient')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPatient)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });    const result = await service.getAppointments();
    expect(result.length).toBe(10);
    expect(result[0].scheduledTime).toBe('2025-08-23T10:00:00');
    expect(result[0].notes).toBe('Annual Checkup');
    expect(result[0].doctor).toBe('Dr. Smith');
    expect(result[0].patient).toBe('John Doe');
    expect(result[0].id).toBe('1');
    expect(result[1].scheduledTime).toBe('2025-08-24T10:00:00');
    expect(result[1].notes).toBe('Follow-up');
    expect(result[2].scheduledTime).toBe('2025-08-25T10:00:00');
    expect(result[2].notes).toBe('Consultation');
    expect(result[3].scheduledTime).toBe('2025-08-26T10:00:00');
    expect(result[3].notes).toBe('Lab Results');
    expect(result[9].scheduledTime).toBe('2025-09-01T10:00:00');
    expect(result[9].notes).toBe('Headache');
  });
});
