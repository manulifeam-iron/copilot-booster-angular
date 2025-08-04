import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorDetailComponent } from './doctor-detail.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { of, BehaviorSubject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

describe('DoctorDetailComponent', () => {
  let component: DoctorDetailComponent;
  let fixture: ComponentFixture<DoctorDetailComponent>;
  let mockApiService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockMeta: any;
  let mockTitle: any;
  let paramMapSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    mockApiService = {
      getDoctorById: jasmine.createSpy('getDoctorById').and.returnValue(of({ id: '1', name: 'Dr. Smith' })),
    };

    paramMapSubject = new BehaviorSubject(convertToParamMap({ id: '1' }));
    mockActivatedRoute = {
      paramMap: paramMapSubject.asObservable(),
      snapshot: {
        paramMap: convertToParamMap({ id: '1' }),
      },
    };

    mockRouter = {};
    mockMeta = { updateTag: jasmine.createSpy('updateTag') };
    mockTitle = { setTitle: jasmine.createSpy('setTitle') };

    await TestBed.configureTestingModule({
      imports: [DoctorDetailComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Meta, useValue: mockMeta },
        { provide: Title, useValue: mockTitle },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title and meta tags on construction', () => {
    expect(mockTitle.setTitle).toHaveBeenCalledWith('Doctor Details');
    expect(mockMeta.updateTag).toHaveBeenCalled();
  });

  it('should set doctorId from route params on init', () => {
    expect(component.doctorId()).toBe('1');
  });

  it('should call getDoctorById with the correct id', () => {
    expect(mockApiService.getDoctorById).toHaveBeenCalledWith('1');
  });
});