import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DoctorComponent } from './pages/doctors/doctor.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { PatientComponent } from './pages/patients/patient.component';
import { AppointmentComponent } from './pages/doctors/appointment.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  {
    path: 'doctors',
    title: `Doctors List`,
    component: DoctorComponent,
  },
  {
    path: 'doctors/:id',
    title: 'Doctor Details',
    component: DoctorDetailComponent,
  },
  {
    path: 'patients',
    title: 'Patient List',
    component: PatientComponent,
  },
  {
    path: 'appointments',
    title: 'Appointments',
    component: AppointmentComponent,
  },
];
