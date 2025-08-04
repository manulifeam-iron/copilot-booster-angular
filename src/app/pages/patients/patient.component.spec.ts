import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientComponent } from './patient.component';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  let mockApiService: any;
  let mockMeta: any;
  let mockTitle: any;

  beforeEach(async () => {
    mockApiService = {
      getPatients: jasmine.createSpy('getPatients').and.returnValue(of([{ id: '1', name: 'John Doe' }])),
    };
    mockMeta = { updateTag: jasmine.createSpy('updateTag') };
    mockTitle = { setTitle: jasmine.createSpy('setTitle') };

    await TestBed.configureTestingModule({
      imports: [PatientComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Meta, useValue: mockMeta },
        { provide: Title, useValue: mockTitle },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title and meta tags on construction', () => {
    expect(mockTitle.setTitle).toHaveBeenCalledWith('Patients List');
    expect(mockMeta.updateTag).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'description' }));
    expect(mockMeta.updateTag).toHaveBeenCalledWith(jasmine.objectContaining({ property: 'og:title' }));
    expect(mockMeta.updateTag).toHaveBeenCalledWith(jasmine.objectContaining({ property: 'og:description' }));
  });

  it('should call getPatients on ApiService', () => {
    expect(mockApiService.getPatients).toHaveBeenCalled();
  });
});
