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
      dob: '1970-01-01'
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
      dob: '1970-01-01'
    };
    // @ts-ignore
    (window as any).fetch.and.returnValue(Promise.resolve({
      json: () => Promise.resolve(mockDoctor)
    }));

    const result = await service.getDoctorById('1');
    expect(result).toEqual(mockDoctor);
    expect((window as any).fetch).toHaveBeenCalledWith(
      `${url}/doctors/1`,
      jasmine.objectContaining({
        headers: jasmine.any(Object)
      })
    );
  });
});
