import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorComponent } from './doctor.component';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;
  let mockApiService: any;
  let mockMeta: any;
  let mockTitle: any;

  beforeEach(async () => {
    mockApiService = {
      getDoctors: jasmine.createSpy('getDoctors').and.returnValue(of([{ id: '1', name: 'Dr. Smith' }])),
    };
    mockMeta = { updateTag: jasmine.createSpy('updateTag') };
    mockTitle = { setTitle: jasmine.createSpy('setTitle') };

    await TestBed.configureTestingModule({
      imports: [DoctorComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Meta, useValue: mockMeta },
        { provide: Title, useValue: mockTitle },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title and meta tags on construction', () => {
    expect(mockTitle.setTitle).toHaveBeenCalledWith('Doctors List');
    expect(mockMeta.updateTag).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'description' }));
    expect(mockMeta.updateTag).toHaveBeenCalledWith(jasmine.objectContaining({ property: 'og:title' }));
    expect(mockMeta.updateTag).toHaveBeenCalledWith(jasmine.objectContaining({ property: 'og:description' }));
  });

  it('should call getDoctors on ApiService', () => {
    expect(mockApiService.getDoctors).toHaveBeenCalled();
  });
});
